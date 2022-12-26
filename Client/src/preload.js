// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, BrowserView,BrowserWindow } = require('electron');

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // we can also expose variables, not just functions
});


contextBridge.exposeInMainWorld('newview', {
  create: () => {
    const win = new BrowserWindow({ width: 800, height: 600 })

    const view = new BrowserView()
    win.setBrowserView(view)
    view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
    view.webContents.loadURL('https://electronjs.org')
  }
});