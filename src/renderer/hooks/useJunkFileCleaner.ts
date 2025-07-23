import { useState, useCallback } from "react";
import { formatBytes } from "../../../src/utils/formatters";
import type { JunkFile } from "../types"; // Import JunkFile
import { debounce } from "lodash-es";

type Status = "idle" | "analyzing" | "analyzed" | "cleaning" | "cleaned";

interface CleaningProgress {
  current: number;
  total: number;
  currentFile: string;
  bytesProcessed: number;
  totalBytes: number;
}

interface AnalysisResult {
  files: JunkFile[];
  totalSize: number;
  categories: {
    temp: JunkFile[];
    cache: JunkFile[];
    logs: JunkFile[];
    downloads: JunkFile[];
    other: JunkFile[];
  };
  recommendations: string[];
}
const useJunkFileCleaner = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [recoverableSpace, setRecoverableSpace] = useState(0);
  const [junkFiles, setJunkFiles] = useState<JunkFile[]>([]);
  const [progress, setProgress] = useState<string | CleaningProgress>("");
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null,
  );
  const [cleaningStats, setCleaningStats] = useState<{
    filesDeleted: number;
    bytesFreed: number;
    timeElapsed: number;
  } | null>(null);

  // Debounced progress updates to prevent UI flooding
  const debouncedProgressUpdate = useCallback(
    debounce((progressData: string | CleaningProgress) => {
      setProgress(progressData);
    }, 100),
    [],
  );

  const categorizeFiles = useCallback(
    (files: JunkFile[]): AnalysisResult["categories"] => {
      const categories = {
        temp: [] as JunkFile[],
        cache: [] as JunkFile[],
        logs: [] as JunkFile[],
        downloads: [] as JunkFile[],
        other: [] as JunkFile[],
      };

      files.forEach((file) => {
        const path = file.path.toLowerCase();
        if (path.includes("temp") || path.includes("tmp")) {
          categories.temp.push(file);
        } else if (path.includes("cache")) {
          categories.cache.push(file);
        } else if (path.includes("log") || file.name.endsWith(".log")) {
          categories.logs.push(file);
        } else if (path.includes("download")) {
          categories.downloads.push(file);
        } else {
          categories.other.push(file);
        }
      });

      return categories;
    },
    [],
  );

  const generateRecommendations = useCallback(
    (categories: AnalysisResult["categories"]): string[] => {
      const recommendations: string[] = [];

      if (categories.temp.length > 50) {
        recommendations.push(
          "Large number of temporary files detected. Regular cleanup recommended.",
        );
      }

      if (categories.cache.length > 0) {
        const cacheSize = categories.cache.reduce(
          (sum, file) => sum + file.size,
          0,
        );
        if (cacheSize > 100 * 1024 * 1024) {
          // 100MB
          recommendations.push(
            "Cache files are taking up significant space. Safe to clean.",
          );
        }
      }

      if (categories.logs.length > 20) {
        recommendations.push(
          "Multiple log files found. Consider keeping recent logs only.",
        );
      }

      if (categories.downloads.length > 0) {
        recommendations.push(
          "Files in Downloads folder detected. Review before cleaning.",
        );
      }

      return recommendations;
    },
    [],
  );
  const analyze = useCallback(async () => {
    const startTime = Date.now();
    setStatus("analyzing");
    debouncedProgressUpdate("Initializing scan...");
    setError(null);
    setAnalysisResult(null);

    try {
      if (!window.electronAPI) {
        throw new Error("Electron API not available");
      }

      debouncedProgressUpdate("Scanning system directories...");
      const response = await window.electronAPI.cleaner.analyzeJunkFiles();

      if (response.error) {
        throw new Error(response.error);
      }

      debouncedProgressUpdate("Categorizing files...");
      const categories = categorizeFiles(response.files);
      const recommendations = generateRecommendations(categories);

      const result: AnalysisResult = {
        files: response.files,
        totalSize: response.totalSize,
        categories,
        recommendations,
      };

      setRecoverableSpace(response.totalSize);
      setJunkFiles(response.files);
      setAnalysisResult(result);
      setStatus("analyzed");

      const analysisTime = Date.now() - startTime;
      debouncedProgressUpdate(
        `Analysis completed in ${(analysisTime / 1000).toFixed(1)}s`,
      );

      // Log analysis performance
      if (window.electronAPI.logPerformance) {
        window.electronAPI.logPerformance({
          timestamp: new Date().toISOString(),
          cpu: 0, // Would need to get actual CPU usage
          mem: 0, // Would need to get actual memory usage
          diskUsage: 0,
          totalDisk: 0,
          netRx: 0,
          netTx: 0,
          responseTime: analysisTime,
        });
      }

      setTimeout(() => setProgress(""), 2000);
      return result;
    } catch (err: unknown) {
      console.error("Analysis failed:", err);
      setError(
        err instanceof Error ? err.message : "Failed to analyze junk files.",
      );
      setStatus("idle"); // Reset on error
      debouncedProgressUpdate("");
      throw err; // Re-throw to allow caller to handle
    }
  }, [categorizeFiles, generateRecommendations, debouncedProgressUpdate]);

  const clean = useCallback(
    async (filesToDelete: string[]) => {
      const startTime = Date.now();
      setStatus("cleaning");
      setCleaningStats(null);
      setError(null);

      const totalFiles = filesToDelete.length;
      const totalBytes = junkFiles
        .filter((f) => filesToDelete.includes(f.path))
        .reduce((sum, f) => sum + f.size, 0);

      try {
        if (!window.electronAPI) {
          throw new Error("Electron API not available");
        }

        let deletedCount = 0;
        let bytesFreed = 0;
        const failedFiles: string[] = [];

        // Process files in batches for better performance
        const batchSize = 10;
        for (let i = 0; i < filesToDelete.length; i += batchSize) {
          const batch = filesToDelete.slice(i, i + batchSize);

          try {
            const progressData: CleaningProgress = {
              current: Math.min(i + batchSize, totalFiles),
              total: totalFiles,
              currentFile: batch[0] || "",
              bytesProcessed: bytesFreed,
              totalBytes,
            };

            debouncedProgressUpdate(progressData);

            const result =
              await window.electronAPI.cleaner.executeCleaning(batch);

            if (result.success) {
              deletedCount += batch.length;
              // Calculate bytes freed for this batch
              const batchBytes = junkFiles
                .filter((f) => batch.includes(f.path))
                .reduce((sum, f) => sum + f.size, 0);
              bytesFreed += batchBytes;
            } else {
              failedFiles.push(...batch);
            }

            // Small delay between batches to prevent overwhelming the system
            await new Promise((resolve) => setTimeout(resolve, 50));
          } catch (err) {
            failedFiles.push(...batch);
          }
        }

        const timeElapsed = Date.now() - startTime;
        setCleaningStats({
          filesDeleted: deletedCount,
          bytesFreed,
          timeElapsed,
        });

        if (deletedCount === filesToDelete.length) {
          setStatus("cleaned");
          setRecoverableSpace(bytesFreed);
          setJunkFiles([]);
          debouncedProgressUpdate(
            `Successfully cleaned ${deletedCount} files in ${(timeElapsed / 1000).toFixed(1)}s`,
          );
        } else if (deletedCount > 0) {
          setError(
            `Partially completed. ${failedFiles.length} files could not be deleted.`,
          );
          setStatus("analyzed");
          setJunkFiles((prevFiles) =>
            prevFiles.filter((f) => failedFiles.includes(f.path)),
          );
          debouncedProgressUpdate("");
        } else {
          setError("Failed to delete any files. Files might be in use.");
          setStatus("analyzed");
          debouncedProgressUpdate("");
          throw new Error("Failed to delete any files");
        }

        // Log cleaning performance
        if (window.electronAPI.logPerformance) {
          window.electronAPI.logPerformance({
            timestamp: new Date().toISOString(),
            cpu: 0,
            mem: 0,
            diskUsage: 0,
            totalDisk: 0,
            netRx: 0,
            netTx: 0,
            responseTime: timeElapsed,
          });
        }

        setTimeout(() => setProgress(""), 3000);

        return {
          success: deletedCount > 0,
          deletedCount,
          bytesFreed,
          failedFiles,
          timeElapsed,
          error:
            failedFiles.length > 0
              ? "Some files could not be deleted"
              : undefined,
        };
      } catch (err: unknown) {
        console.error("Cleaning failed:", err);
        setError(err instanceof Error ? err.message : "Failed to clean files.");
        setStatus("analyzed"); // Go back to analyzed state on error
        debouncedProgressUpdate("");
        throw err; // Re-throw to allow caller to handle
      }
    },
    [junkFiles, debouncedProgressUpdate],
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setRecoverableSpace(0);
    setJunkFiles([]);
    debouncedProgressUpdate("");
    setError(null);
    setAnalysisResult(null);
    setCleaningStats(null);
  }, [debouncedProgressUpdate]);

  return {
    status,
    recoverableSpace,
    junkFiles,
    analysisResult,
    cleaningStats,
    analyze,
    clean,
    reset,
    formatBytes: formatBytes,
    progress,
    error,
  };
};

export default useJunkFileCleaner;
