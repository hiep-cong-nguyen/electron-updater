const { app, BrowserWindow } = require('electron')
const path = require('path')
const { autoUpdater,   } = require("electron-updater");

let win
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;


const createWindow = () => {
  
    win  = new BrowserWindow({
    width: 1000,
    height: 600,
    title: "This is a test application",
    show: false,
    removeMenu: true,
    acceptFirstMouse: true,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "./preload.js"),
    },
  });  
  win.loadFile('index.html')
  }
 


  app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })
  })


  /*New Update Available*/
autoUpdater.on("update-available", (info) => {
     win.webContents.send("updateMessage", `Update available. Current version ${app.getVersion()}`);
    let pth = autoUpdater.downloadUpdate();
    win.webContents.send("updateMessage", pth);
  });
  
  autoUpdater.on("update-not-available", (info) => {
     win.webContents.send("updateMessage", `No update available. Current version ${app.getVersion()}`);
  });
  
  /*Download Completion Message*/
  autoUpdater.on("update-downloaded", (info) => {
     win.webContents.send("updateMessage", `Update downloaded. Current version ${app.getVersion()}`);
  });
  
  autoUpdater.on("error", (info) => {
     win.webContents.send("updateMessage", info);
  }); 