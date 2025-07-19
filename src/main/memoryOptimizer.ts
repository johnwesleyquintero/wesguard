import { ipcMain } from "electron";
import { memoryOptimizerService } from "./services/memoryOptimizerService";

export function initMemoryOptimizerHandlers() {
  ipcMain.handle("memory-init-data-dir", () =>
    memoryOptimizerService.initDataDir(),
  );
  ipcMain.handle("memory-get-current-usage", async () => {
    const logEntry = await memoryOptimizerService.getCurrentUsage();
    memoryOptimizerService.logUsage(logEntry); // Log the usage data
    return logEntry;
  });
  ipcMain.handle("memory-optimize", () => memoryOptimizerService.optimize());
  ipcMain.handle("memory-get-history", () =>
    memoryOptimizerService.getHistory(),
  );
}
