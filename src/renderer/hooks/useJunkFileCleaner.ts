import { useState, useCallback } from "react";

type Status = "idle" | "analyzing" | "analyzed" | "cleaning" | "cleaned";

interface JunkFile {
  name: string;
  path: string;
  size: number;
  lastModified: number; // Unix timestamp
}

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

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
      const response = await window.electronAPI.analyzeJunkFiles();
      if (response.error) {
        throw new Error(response.error);
      }
      setRecoverableSpace(response.totalSize);
      setJunkFiles(response.files);
      setStatus("analyzed");
      setProgress("");
      return { files: response.files, totalSize: response.totalSize };
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
      const result = await window.electronAPI.executeCleaning(filesToDelete);
      if (result.success) {
        setStatus("cleaned");
        setRecoverableSpace(0); // Reset recoverable space after cleaning
        setJunkFiles([]); // Clear junk files after cleaning
        setProgress("");
      } else {
        setError(result.error || "Cleaning operation failed.");
        setStatus("analyzed"); // Go back to analyzed state
        setProgress("");
        throw new Error(result.error || "Cleaning operation failed");
      }
      return result;
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
    formatBytes,
    progress,
    error,
  };
};

export default useJunkFileCleaner;
