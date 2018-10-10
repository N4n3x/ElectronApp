const {app, BrowserWindow, ipcMain} = require('electron')



let mainWindow

function createWindow () {

  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}
app.on('ready', createWindow)
app.on('window-all-closed', function () { //Pour OSX
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', function () { //Pour OSX
  if (mainWindow === null) {
    createWindow()
  }
})

//marche pas
ipcMain.on('sync_message', (event,arg) => {
  console.log(arg)
  event.returnValue = 'ok'
})

ipcMain.on('async_message', (event,arg) => {
  console.log(arg)
  event.sender.send('async_reply', 'OK')
})