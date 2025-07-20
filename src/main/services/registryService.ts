import { IRegistryCleaner } from './IRegistryCleaner';
import { WindowsRegistryCleaner } from './WindowsRegistryCleaner';
import type { RegistryItem, RegistryBackup } from '../../renderer/types';

let activeRegistryCleaner: IRegistryCleaner;

// In a real-world scenario, you would use a factory or dependency injection
// to provide the correct implementation based on the operating system.
// For this task, we'll directly instantiate WindowsRegistryCleaner.
if (process.platform === 'win32') {
  activeRegistryCleaner = new WindowsRegistryCleaner();
} else {
  // Fallback for non-Windows platforms or throw an error if not supported
  // For now, we'll use a dummy implementation or throw an error.
  // This part is outside the scope of the current task.
  class DummyRegistryCleaner implements IRegistryCleaner {
    async scanRegistry(): Promise<RegistryItem[]> {
      console.warn('Registry scanning not supported on this OS.');
      return [];
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async backupRegistry(_backup: RegistryBackup): Promise<void> {
      console.warn('Registry backup not supported on this OS.');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async cleanRegistry(_items: RegistryItem[]): Promise<void> {
      console.warn('Registry cleaning not supported on this OS.');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async restoreRegistry(_backup: RegistryBackup): Promise<void> {
      console.warn('Registry restore not supported on this OS.');
    }
  }
  activeRegistryCleaner = new DummyRegistryCleaner();
}

export const registryService = {
  scanRegistry: async () => activeRegistryCleaner.scanRegistry(),
  backupRegistry: async (backup: RegistryBackup) =>
    activeRegistryCleaner.backupRegistry(backup),
  cleanRegistry: async (items: RegistryItem[]) =>
    activeRegistryCleaner.cleanRegistry(items),
  restoreRegistry: async (backup: RegistryBackup) =>
    activeRegistryCleaner.restoreRegistry(backup),
};
