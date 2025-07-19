import { ipcMain, app } from "electron";
import Registry from "winreg";
import fs from "fs-extra";
import path from "path";

// Registry keys to scan
const SCAN_KEYS = [
  "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run",
  "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run",
  "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\StartupApproved\\Run",
  "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\StartupApproved\\Run32",
  // Add more problematic registry locations here
];

import type {
  RegistryItem,
  RegistryBackup,
  RegistryValueType,
} from "../renderer/types";

// Registry value interface from winreg

// Initialize registry handlers
export function initRegistryHandlers() {
  // Scan registry for issues
  ipcMain.handle("scan-registry", async () => {
    const issues: RegistryItem[] = [];

    for (const keyPath of SCAN_KEYS) {
      try {
        const regKey = new Registry({
          hive: keyPath.startsWith("HKCU") ? Registry.HKCU : Registry.HKLM,
          key: keyPath.substring(keyPath.indexOf("\\") + 1),
        });

        const items = await new Promise<RegistryItem[]>((resolve, reject) => {
          regKey.values(
            (
              err: Error | null,
              result: Array<{ name: string; type: string; value: string }>,
            ) => {
              if (err) reject(err);
              else {
                resolve(
                  result.map((item) => ({
                    name: item.name,
                    path: `${keyPath}\\${item.name}`,
                    value: item.value,
                    type: item.type as RegistryValueType,
                    isInvalid: false,
                  })),
                );
              }
            },
          );
        });

        for (const item of items) {
          // Check if the value points to a non-existent file
          if (item.type === "REG_SZ" || item.type === "REG_EXPAND_SZ") {
            const filePath = item.value.replace(
              /%([^%]+)%/g,
              (_: string, name: string) => process.env[name] || "",
            );
            try {
              await fs.access(filePath);
            } catch {
              issues.push({
                name: item.name,
                path: `${keyPath}\\${item.name}`,
                value: item.value,
                type: item.type,
                isInvalid: true,
              });
            }
          }
        }
      } catch (error) {
        console.error(`Failed to scan registry key ${keyPath}:`, error);
      }
    }

    return issues;
  });

  // Backup registry entries
  ipcMain.handle("backup-registry", async (_, backup: RegistryBackup) => {
    const backupDir = path.join(app.getPath("userData"), "registry-backups");
    await fs.mkdir(backupDir, { recursive: true });

    const backupPath = path.join(backupDir, `backup-${backup.timestamp}.json`);
    await fs.writeFile(backupPath, JSON.stringify(backup, null, 2));
  });

  // Clean registry entries
  ipcMain.handle("clean-registry", async (_, items: RegistryItem[]) => {
    for (const item of items) {
      try {
        const keyPath = item.path.substring(0, item.path.lastIndexOf("\\"));
        const valueName = item.path.substring(item.path.lastIndexOf("\\") + 1);

        const regKey = new Registry({
          hive: keyPath.startsWith("HKCU") ? Registry.HKCU : Registry.HKLM,
          key: keyPath.substring(keyPath.indexOf("\\") + 1),
        });

        await new Promise((resolve, reject) => {
          regKey.remove(valueName, (err) => {
            if (err) reject(err);
            else resolve(true);
          });
        });
      } catch (error) {
        console.error(`Failed to clean registry entry ${item.path}:`, error);
        throw error;
      }
    }
  });

  // Restore from backup
  ipcMain.handle("restore-registry", async (_, backup: RegistryBackup) => {
    for (const item of backup.items) {
      try {
        const keyPath = item.path.substring(0, item.path.lastIndexOf("\\"));
        const valueName = item.path.substring(item.path.lastIndexOf("\\") + 1);

        const regKey = new Registry({
          hive: keyPath.startsWith("HKCU") ? Registry.HKCU : Registry.HKLM,
          key: keyPath.substring(keyPath.indexOf("\\") + 1),
        });

        await new Promise((resolve, reject) => {
          regKey.set(valueName, Registry[item.type], item.value, (err) => {
            if (err) reject(err);
            else resolve(true);
          });
        });
      } catch (error) {
        console.error(`Failed to restore registry entry ${item.path}:`, error);
        throw error;
      }
    }
  });
}
