import { app } from "electron";
import Registry from "winreg";
import fs from "fs-extra";
import path from "path";
import { promisify } from "util";
import type {
  RegistryItem,
  RegistryBackup,
  RegistryValueType,
} from "../../renderer/types";
import { IRegistryCleaner } from "./IRegistryCleaner";

// Promisify registry operations for better async/await support
const promisifyRegistry = (regKey: Registry) => ({
  values: promisify(regKey.values.bind(regKey)),
  remove: promisify(regKey.remove.bind(regKey)),
  set: promisify(regKey.set.bind(regKey)),
});

const SCAN_KEYS = [
  "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run",
  "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run",
  "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\StartupApproved\\Run",
  "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\StartupApproved\\Run32",
  "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall",
  "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall",
  // More specific paths to avoid scanning entire software registry
  "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\RunOnce",
  "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\RunOnce",
];

export class WindowsRegistryCleaner implements IRegistryCleaner {
  private getRegistryKey(keyPath: string): Registry {
    return new Registry({
      hive: keyPath.startsWith("HKCU") ? Registry.HKCU : Registry.HKLM,
      key: keyPath.substring(keyPath.indexOf("\\") + 1),
    });
  }

  private async getRegistryValues(
    regKey: Registry,
    keyPath: string,
  ): Promise<RegistryItem[]> {
    try {
      const promisified = promisifyRegistry(regKey);
      const result = await promisified.values();
      return result.map((item) => ({
        name: item.name,
        path: `${keyPath}\\${item.name}`,
        value: item.value,
        type: item.type as RegistryValueType,
        isInvalid: false,
      }));
    } catch (error) {
      console.error(`Failed to get registry values for ${keyPath}:`, error);
      return [];
    }
  }

  private async validateRegistryItem(item: RegistryItem): Promise<boolean> {
    // Enhanced validation logic
    if (item.type !== "REG_SZ" && item.type !== "REG_EXPAND_SZ") {
      return false;
    }

    // Skip system-critical entries
    const systemCriticalPaths = [
      "Windows Security",
      "Windows Defender",
      "Microsoft",
      "System32",
    ];
    
    if (systemCriticalPaths.some(path => item.value.includes(path))) {
      return false;
    }

    const filePath = item.value
      .replace(/"/g, "")
      .split(" ")[0]
      .replace(/%([^%]+)%/g, (_, name) => process.env[name] || "");

    if (!filePath) return false;

    try {
      await fs.access(filePath);
      return false;
    } catch {
      return true;
    }
  }

  async scanRegistry(): Promise<RegistryItem[]> {
    const issues: RegistryItem[] = [];
    const scanPromises = SCAN_KEYS.map(async (keyPath) => {
      try {
        const regKey = this.getRegistryKey(keyPath);
        const items = await this.getRegistryValues(regKey, keyPath);
        
        const validationPromises = items.map(async (item) => {
          if (await this.validateRegistryItem(item)) {
            return { ...item, isInvalid: true };
          }
          return null;
        });
        
        const validatedItems = await Promise.all(validationPromises);
        return validatedItems.filter(Boolean) as RegistryItem[];
      } catch (error) {
        console.error(`Failed to scan registry key ${keyPath}:`, error);
        return [];
      }
    });

    const results = await Promise.all(scanPromises);
    results.forEach(result => issues.push(...result));

    return issues;
  }

  async backupRegistry(backup: RegistryBackup): Promise<void> {
    const backupDir = path.join(app.getPath("userData"), "registry-backups");
    await fs.mkdir(backupDir, { recursive: true });

    const backupPath = path.join(backupDir, `backup-${backup.timestamp}.json`);
    await fs.writeFile(backupPath, JSON.stringify(backup, null, 2));
  }

  async cleanRegistry(items: RegistryItem[]): Promise<void> {
    const cleanPromises = items.map(async (item) => {
      try {
        const keyPath = item.path.substring(0, item.path.lastIndexOf("\\"));
        const valueName = item.path.substring(item.path.lastIndexOf("\\") + 1);

        const regKey = new Registry({
          hive: keyPath.startsWith("HKCU") ? Registry.HKCU : Registry.HKLM,
          key: keyPath.substring(keyPath.indexOf("\\") + 1),
        });

        const promisified = promisifyRegistry(regKey);
        await promisified.remove(valueName);
      } catch (error) {
        console.error(`Failed to clean registry entry ${item.path}:`, error);
        throw error;
      }
    });

    await Promise.all(cleanPromises);
  }

  async restoreRegistry(backup: RegistryBackup): Promise<void> {
    const restorePromises = backup.items.map(async (item) => {
      try {
        const keyPath = item.path.substring(0, item.path.lastIndexOf("\\"));
        const valueName = item.path.substring(item.path.lastIndexOf("\\") + 1);

        const regKey = new Registry({
          hive: keyPath.startsWith("HKCU") ? Registry.HKCU : Registry.HKLM,
          key: keyPath.substring(keyPath.indexOf("\\") + 1),
        });

        const promisified = promisifyRegistry(regKey);
        await promisified.set(valueName, item.type, item.value);
      } catch (error) {
        console.error(`Failed to restore registry entry ${item.path}:`, error);
        throw error;
      }
    });

    await Promise.all(restorePromises);
  }
}