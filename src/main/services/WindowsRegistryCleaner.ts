import { app } from "electron";
import Registry from "winreg";
import fs from "fs-extra";
import path from "path";
import type {
  RegistryItem,
  RegistryBackup,
  RegistryValueType,
} from "../../renderer/types";
import { IRegistryCleaner } from "./IRegistryCleaner";

interface IWinReg {
  values(
    callback: (
      err: Error | null,
      result: Array<{ name: string; type: string; value: string }>,
    ) => void,
  ): void;
  remove(name: string, callback: (err: Error | null) => void): void;
  set(
    name: string,
    type: string,
    value: string,
    callback: (err: Error | null) => void,
  ): void;
}

const SCAN_KEYS = [
  "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run",
  "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run",
  "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\StartupApproved\\Run",
  "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\StartupApproved\\Run32",
  "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall",
  "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall",
  "HKCU\\Software",
  "HKCR\\CLSID",
];

export class WindowsRegistryCleaner implements IRegistryCleaner {
  private async getRegistryKey(keyPath: string): Promise<IWinReg> {
    return new Registry({
      hive: keyPath.startsWith("HKCU") ? Registry.HKCU : Registry.HKLM,
      key: keyPath.substring(keyPath.indexOf("\\") + 1),
    });
  }

  private async getRegistryValues(
    regKey: IWinReg,
    keyPath: string,
  ): Promise<RegistryItem[]> {
    return new Promise((resolve, reject) => {
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
  }

  private async validateRegistryItem(item: RegistryItem): Promise<boolean> {
    if (item.type !== "REG_SZ" && item.type !== "REG_EXPAND_SZ") {
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

    for (const keyPath of SCAN_KEYS) {
      try {
        const regKey = await this.getRegistryKey(keyPath);
        const items = await this.getRegistryValues(regKey, keyPath);

        for (const item of items) {
          if (await this.validateRegistryItem(item)) {
            issues.push({ ...item, isInvalid: true });
          }
        }
      } catch (error) {
        console.error(`Failed to scan registry key ${keyPath}:`, error);
      }
    }

    return issues;
  }

  async backupRegistry(backup: RegistryBackup): Promise<void> {
    const backupDir = path.join(app.getPath("userData"), "registry-backups");
    await fs.mkdir(backupDir, { recursive: true });

    const backupPath = path.join(backupDir, `backup-${backup.timestamp}.json`);
    await fs.writeFile(backupPath, JSON.stringify(backup, null, 2));
  }

  async cleanRegistry(items: RegistryItem[]): Promise<void> {
    for (const item of items) {
      try {
        const keyPath = item.path.substring(0, item.path.lastIndexOf("\\"));
        const valueName = item.path.substring(item.path.lastIndexOf("\\") + 1);

        const regKey = new Registry({
          hive: keyPath.startsWith("HKCU") ? Registry.HKCU : Registry.HKLM,
          key: keyPath.substring(keyPath.indexOf("\\") + 1),
        });

        await new Promise<void>((resolve, reject) => {
          regKey.remove(valueName, (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
      } catch (error) {
        console.error(`Failed to clean registry entry ${item.path}:`, error);
        throw error;
      }
    }
  }

  async restoreRegistry(backup: RegistryBackup): Promise<void> {
    for (const item of backup.items) {
      try {
        const keyPath = item.path.substring(0, item.path.lastIndexOf("\\"));
        const valueName = item.path.substring(item.path.lastIndexOf("\\") + 1);

        const regKey = new Registry({
          hive: keyPath.startsWith("HKCU") ? Registry.HKCU : Registry.HKLM,
          key: keyPath.substring(keyPath.indexOf("\\") + 1),
        });

        await new Promise<void>((resolve, reject) => {
          regKey.set(valueName, item.type, item.value, (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
      } catch (error) {
        console.error(`Failed to restore registry entry ${item.path}:`, error);
        throw error;
      }
    }
  }
}
