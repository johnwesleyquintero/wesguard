import { app as e, BrowserWindow as t } from "electron";
import n from "path";
function i() {
  const o = new t({
    width: 900,
    height: 600,
    webPreferences: {
      preload: n.join(__dirname, "preload.cjs"),
      nodeIntegration: !0,
      contextIsolation: !1
    }
  });
  process.env.VITE_DEV_SERVER_URL ? (o.loadURL(process.env.VITE_DEV_SERVER_URL), o.webContents.openDevTools()) : o.loadFile(n.join(__dirname, "dist", "index.html"));
}
e.whenReady().then(() => {
  i(), e.on("activate", () => {
    t.getAllWindows().length === 0 && i();
  });
});
e.on("window-all-closed", () => {
  process.platform !== "darwin" && e.quit();
});
