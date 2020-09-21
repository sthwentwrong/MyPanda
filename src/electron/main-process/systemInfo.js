// https://juejin.im/post/6844903873237221384

var os = require('os');

function getCpu() {
    var cores = os.cpus();
    if (cores.length > 0) {
        return cores[0].model;
    }
}

exports.getCpu = getCpu