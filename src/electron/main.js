const fs = require('fs');
const path = require('path');
const { app, BrowserWindow } = require('electron')

console.log(process.argv);
const logger = require('electron-log');

const ipc = require('electron').ipcMain
const debug = /--debug/.test(process.argv[2])

let mainWindow = null

function initialize() {
    
    setupLogger()

    logger.info("set single instance. ")
    makeSingleInstance()

    function createWindow() {
        const windowOptions = {
            width: 1080,
            minWidth: 680,
            height: 840,
            title: app.getName(),
            webPreferences: {
                nodeIntegration: true,
                preload: './preload.js'
            }
        }

        if (process.platform === 'linux') {
            windowOptions.icon = path.join(__dirname, '/assets/app-icon/png/512.png')
        }

        mainWindow = new BrowserWindow(windowOptions)
        mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))

        // Launch fullscreen with DevTools open, usage: npm run debug
        if (debug) {
            mainWindow.webContents.openDevTools()
            mainWindow.maximize()
            require('devtron').install()
        }

        mainWindow.on('closed', () => {
            mainWindow = null
        })
    }

    app.on('ready', () => {
        createWindow()
    })

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })

    app.on('activate', () => {
        if (mainWindow === null) {
            createWindow()
        }
    })
}

function makeSingleInstance() {
    if (process.mas) return

    app.requestSingleInstanceLock()

    app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore()
            mainWindow.focus()
        }
    })
}

function setupLogger() {

    logger.transports.file.level = true;
    // Same as for console transport
    logger.transports.file.level = 'info';
    // logger.transports.file.format = '{h}:{i}:{s}:{ms} {text}';

    // Set approximate maximum log size in bytes. When it exceeds,
    // the archived log will be saved as the log.old.log file
    logger.transports.file.maxSize = 5 * 1024 * 1024;

    // Write to this file, must be set before first logging
    // logger.transports.file.fileName = __dirname + '/log.log';

    // fs.createWriteStream options, must be set before first logging
    logger.transports.file.streamConfig = {flags: 'w'};

    // set existed file stream
    logger.transports.file.stream = fs.createWriteStream('log.log');
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// let aboutWin;
// ipc.on('displayAbout', () => {
//     if (aboutWin == null) {
//         aboutWin = new BrowserWindow({
//             width: 800,
//             height: 600,
//             // frame:false,
//             // parent: app
//         })
//         aboutWin.loadFile(path.join(__dirname, 'about.html'));
//         aboutWin.on('closed', () => (aboutWin = null))
//     }
// })


initialize()
