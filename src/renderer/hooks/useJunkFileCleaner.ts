import { useState, useCallback } from "react";
import { formatBytes } from "../../../src/utils/formatters";
import type { JunkFile } from "../types"; // Import JunkFile

type Status = "idle" | "analyzing" | "analyzed" | "cleaning" | "cleaned";

const useJunkFileCleaner = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [recoverableSpace, setRecoverableSpace] = useState(0);
  const [junkFiles, setJunkFiles] = useState<JunkFile[]>([]);
  const [progress, setProgress] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async () => {
    setStatus("analyzing");
    setProgress("Scanning common junk locations...");
    setError(null);
    try {
      if (!window.electronAPI) {
        throw new Error("Electron API not available");
      }
      const response = await window.electronAPI.cleaner.analyzeJunkFiles();
      if (response.error) {
        // Access error property
        throw new Error(response.error);
      }
      setRecoverableSpace(response.totalSize);
      setJunkFiles(response.files);
      setStatus("analyzed");
      setProgress("");
      return {
        files: response.files,
        totalSize: response.totalSize,
        error: response.error,
      };
    } catch (err: unknown) {
      console.error("Analysis failed:", err);
      setError(
        err instanceof Error ? err.message : "Failed to analyze junk files.",
      );
      setStatus("idle"); // Reset on error
      setProgress("");
      throw err; // Re-throw to allow caller to handle
    }
  }, []);

  const clean = useCallback(async (filesToDelete: string[]) => {
    setStatus("cleaning");
    setProgress("Removing selected files...");
    setError(null);
    try {
      if (!window.electronAPI) {
        throw new Error("Electron API not available");
      }

      // Track the files that were successfully deleted
      let deletedCount = 0;
      const failedFiles: string[] = [];

      // Process files one by one with a small delay
      for (const file of filesToDelete) {
        try {
          setProgress(
            `Removing file ${deletedCount + 1} of ${filesToDelete.length}...`,
          );
          const result = await window.electronAPI.cleaner.executeCleaning([
            file,
          ]);
          if (result.success) {
            deletedCount++;
          } else {
            failedFiles.push(file);
          }
          // Add a small delay between deletions
          await new Promise((resolve) => setTimeout(resolve, 100));
        } catch (err) {
          failedFiles.push(file);
        }
      }

      if (deletedCount === filesToDelete.length) {
        // All files were deleted successfully
        setStatus("cleaned");
        setRecoverableSpace(0);
        setJunkFiles([]);
        setProgress("");
      } else if (deletedCount > 0) {
        // Some files were deleted
        setError(
          `Partially completed. ${failedFiles.length} files could not be deleted.`,
        );
        setStatus("analyzed");
        // Update junkFiles to only include the files that weren't deleted
        setJunkFiles((prevFiles) =>
          prevFiles.filter((f) => failedFiles.includes(f.path)),
        );
        setProgress("");
      } else {
        // No files were deleted
        setError("Failed to delete any files. Files might be in use.");
        setStatus("analyzed");
        setProgress("");
        throw new Error("Failed to delete any files");
      }

      return {
        success: deletedCount > 0,
        deletedCount,
        failedFiles,
        error:
          failedFiles.length > 0
            ? "Some files could not be deleted"
            : undefined,
      };
    } catch (err: unknown) {
      console.error("Cleaning failed:", err);
      setError(err instanceof Error ? err.message : "Failed to clean files.");
      setStatus("analyzed"); // Go back to analyzed state on error
      setProgress("");
      throw err; // Re-throw to allow caller to handle
    }
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setRecoverableSpace(0);
    setJunkFiles([]);
    setProgress("");
    setError(null);
  }, []);

  return {
    status,
    recoverableSpace,
    junkFiles,
    analyze,
    clean,
    reset,
    formatBytes: formatBytes,
    progress,
    error,
  };
};

export default useJunkFileCleaner;
