const { app, BrowserWindow } = require('electron');
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
  });
  win.loadURL('https://vanish.myhexin.com/website/web/index.html#/chat');
}

app.whenReady().then(() => {
  createWindow();
});
