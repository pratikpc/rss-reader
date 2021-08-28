import { app, BrowserWindow, shell } from 'electron';
import AutoUpdate from 'update-electron-app';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

AutoUpdate();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: !app.isPackaged,
    webPreferences: {
      nodeIntegration: false,
      enableRemoteModule: false,
      contextIsolation: true,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
  function handleRedirect(e: Electron.Event, url: string) {
    if (url !== win.webContents.getURL()) {
      e.preventDefault();
      shell.openExternal(url);
    }
  }

  win.webContents.on('will-navigate', handleRedirect);
  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  if (app.isPackaged) {
    // Hide menu
    win.setMenu(null);
  } else {
    // Open the DevTools.
    // win.webContents.openDevTools({ mode: "detach" });
  }

  win.webContents.session.webRequest.onBeforeSendHeaders(
    (details, callback) => {
      callback({ requestHeaders: { Origin: '*', ...details.requestHeaders } });
    },
  );

  win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        'Access-Control-Allow-Origin': ['*'],
        ...details.responseHeaders,
      },
    });
  });

  // win.on('ready-to-show', () => win.show());
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
