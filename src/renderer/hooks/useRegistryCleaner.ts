import { useState, useCallback } from "react";
import type { RegistryItem, RegistryBackup, ElectronAPI } from "../types";

export const useRegistryCleaner = () => {
  const [scanning, setScanning] = useState(false);
  const [issues, setIssues] = useState<RegistryItem[]>([]);
  const [backups, setBackups] = useState<RegistryBackup[]>([]);

  // Scan registry for issues
  const scanRegistry = useCallback(async () => {
    setScanning(true);
    try {
      // Use IPC to communicate with main process for registry operations
      const result = await (window.electronAPI as ElectronAPI).scanRegistry();
      setIssues(result);
    } catch (error) {
      console.error("Failed to scan registry:", error);
    } finally {
      setScanning(false);
    }
  }, []);

  // Create registry backup
  const createBackup = useCallback(async () => {
    try {
      const backup: RegistryBackup = {
        timestamp: new Date().toISOString(),
        items: [...issues],
      };
      await (window.electronAPI as ElectronAPI).backupRegistry(backup);
      setBackups((prev) => [...prev, backup]);
      return true;
    } catch (error) {
      console.error("Failed to create backup:", error);
      return false;
    }
  }, [issues]);

  // Clean selected registry items
  const cleanRegistry = useCallback(
    async (selectedItems: RegistryItem[]) => {
      try {
        // Create backup before cleaning
        const backupCreated = await createBackup();
        if (!backupCreated) {
          throw new Error("Failed to create backup before cleaning");
        }

        // Clean registry entries
        await (window.electronAPI as ElectronAPI).cleanRegistry(selectedItems);

        // Update issues list
        setIssues((prev) =>
          prev.filter(
            (item) =>
              !selectedItems.some((selected) => selected.path === item.path),
          ),
        );

        return true;
      } catch (error) {
        console.error("Failed to clean registry:", error);
        return false;
      }
    },
    [createBackup],
  );

  // Restore from backup
  const restoreBackup = useCallback(async (backup: RegistryBackup) => {
    try {
      await (window.electronAPI as ElectronAPI).restoreRegistry(backup);
      return true;
    } catch (error) {
      console.error("Failed to restore backup:", error);
      return false;
    }
  }, []);

  return {
    scanning,
    issues,
    backups,
    scanRegistry,
    cleanRegistry,
    createBackup,
    restoreBackup,
  };
};
