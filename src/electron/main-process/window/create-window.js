const {BrowserWindow} = require('electron')
const path = require('path')
const logger = require('electron-log');
const newWindowBtn = document.getElementById('new-window')

newWindowBtn.addEventListener('click', (event) => {
  logger.info("entry in new button")
  const modalPath = path.join('file://', __dirname, '../../modal.html')
  let win = new BrowserWindow({ width: 400, height: 320 })

  win.on('close', () => { win = null })
  win.loadURL(modalPath)
  win.show()
})