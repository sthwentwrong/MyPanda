const getCpu = require('./systemInfo');

const ipc = require('electron').ipcMain;

ipc.on('get-cpu-info', function (event, arg) {
    event.sender.send('cpu-info-reply', getCpu())
})