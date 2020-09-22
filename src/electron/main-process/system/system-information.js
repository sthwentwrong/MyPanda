// https://juejin.im/post/6844903873237221384

var os = require('os');

function getCpu() {
    var cores = os.cpus();
    if (cores.length > 0) {
        return cores[0].model;
    }
}

const ipc = require('electron').ipcMain;

ipc.on('get-cpu-info', function (event, arg) {
    event.sender.send('cpu-info-reply', getCpu())
})

// exports.getCpu = getCpu