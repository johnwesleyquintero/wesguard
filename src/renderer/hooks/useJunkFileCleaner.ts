import { useState, useCallback } from "react";

type Status = "idle" | "analyzing" | "analyzed" | "cleaning" | "cleaned";

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

  const analyze = useCallback(async () => {
    setStatus("analyzing");
    try {
      if (!window.electronAPI) {
        throw new Error("Electron API not available");
      }
      const size = await window.electronAPI.analyzeJunkFiles();
      setRecoverableSpace(size);
      setStatus("analyzed");
      return size;
    } catch (error) {
      console.error("Analysis failed:", error);
      setStatus("idle"); // Reset on error
      throw error; // Re-throw to allow caller to handle
    }
  }, []);

  const clean = useCallback(async () => {
    setStatus("cleaning");
    try {
      if (!window.electronAPI) {
        throw new Error("Electron API not available");
      }
      const result = await window.electronAPI.executeCleaning();
      if (result.success) {
        setStatus("cleaned");
      } else {
        // Handle cleaning failure, maybe show a notification
        setStatus("analyzed"); // Go back to analyzed state
        throw new Error("Cleaning operation failed");
      }
      return result;
    } catch (error) {
      console.error("Cleaning failed:", error);
      setStatus("analyzed"); // Go back to analyzed state on error
      throw error; // Re-throw to allow caller to handle
    }
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setRecoverableSpace(0);
  }, []);

  return { status, recoverableSpace, analyze, clean, reset, formatBytes };
};

export default useJunkFileCleaner;
