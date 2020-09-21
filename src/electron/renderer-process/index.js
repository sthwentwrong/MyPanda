// const obj = require('electron').remote.require('./systemInfo')
// const cpuInfo = obj.getCpu();
// console.log(cpuInfo);


const ipc = require('electron').ipcRenderer;
const getCpuInfoBtn = document.getElementById('info-btn');
getCpuInfoBtn.addEventListener('click', function () {
  ipc.send('get-cpu-info');
})

ipc.on('cpu-info-reply', function (event, arg) {
    console.log(arg);
})