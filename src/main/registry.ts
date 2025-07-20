import { ipcMain } from 'electron';
import { registryService } from './services/registryService';

export function initRegistryHandlers() {
  ipcMain.handle('scan-registry', () => registryService.scanRegistry());
  ipcMain.handle('backup-registry', (_, backup) =>
    registryService.backupRegistry(backup)
  );
  ipcMain.handle('clean-registry', (_, items) =>
    registryService.cleanRegistry(items)
  );
  ipcMain.handle('restore-registry', (_, backup) =>
    registryService.restoreRegistry(backup)
  );
}
