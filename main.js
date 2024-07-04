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
     removeMenu: true,
    acceptFirstMouse: true,
    autoHideMenuBar: true,
    webPreferences: {    nodeIntegration: true,

      contextIsolation: true,
      preload: path.join(__dirname, "./preload.js"),
    },
  });  
  win.loadFile('index.html')
  }
 


  app.whenReady().then(() => {
    createWindow()
    win.webContents.openDevTools();
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    autoUpdater.checkForUpdates(); 
  win.webContents.send("versionMessage", `Current version ${app.getVersion()}`);
  win.webContents.send("updateMessage", `Checking for updates`);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })
  })


  /*New Update Available*/
autoUpdater.on("update-available", (info) => {
     win.webContents.send("updateMessage", `Update available`);
    let pth = autoUpdater.downloadUpdate();
    win.webContents.send("updateMessage", pth);
  });
  
  autoUpdater.on("update-not-available", (info) => {
     win.webContents.send("updateMessage", `No update available`);
  });

    /*Download Completion Message*/
    autoUpdater.on("download-progress", (info) => {
     win.webContents.send("updateMessage", `Update downloading...`);
      win.webContents.send("updateProgressMessage", info);
   });
  
  /*Download Completion Message*/
  autoUpdater.on("update-downloaded", (info) => {
     win.webContents.send("updateMessage", `Update downloaded`);
  });
  
  autoUpdater.on("error", (info) => {
     win.webContents.send("updateMessage", info);
  }); 