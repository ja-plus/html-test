const { app, BrowserWindow, Menu } = require('electron')

let win = null
app.whenReady().then(() => {
  Menu.setApplicationMenu(null) // 取消菜单栏
  win = new BrowserWindow({
    height: 500,
    width: 400,
    minWidth: 400,
    minHeight: 400,
    center: true,
    icon: './icon/icon.ico',
    // frame: false,
    // resizable: false,
    webPreferences: {
      nodeIntegration: false,
    },
  })
  // win.webContents.openDevTools()
  win.loadFile('src/index.html')
  win.on('closed', function () {
    win = null
  })
})
app.on('window-all-closed', function () {
  app.quit()
})
