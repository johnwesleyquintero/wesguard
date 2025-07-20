import type { RegistryItem, RegistryBackup } from '../../renderer/types';

export interface IRegistryCleaner {
  scanRegistry(): Promise<RegistryItem[]>;
  backupRegistry(backup: RegistryBackup): Promise<void>;
  cleanRegistry(items: RegistryItem[]): Promise<void>;
  restoreRegistry(backup: RegistryBackup): Promise<void>;
}
