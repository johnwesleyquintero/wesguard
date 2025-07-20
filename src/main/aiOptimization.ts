import { ipcMain } from 'electron';
import { aiOptimizationService } from './services/aiOptimizationService';

export function initAIOptimizationHandlers() {
  ipcMain.handle('ai-init-data-dir', () => aiOptimizationService.initDataDir());
  ipcMain.handle('ai-log-performance', (_, data) =>
    aiOptimizationService.logPerformance(data)
  );
  ipcMain.handle('ai-log-crash', (_, data) =>
    aiOptimizationService.logCrash(data)
  );
  ipcMain.handle('ai-get-suggestions', () =>
    aiOptimizationService.getSuggestions()
  );
}
