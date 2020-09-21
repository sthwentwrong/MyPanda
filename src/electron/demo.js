var fs = require('fs');
var path = require('path');
const { error } = require('console');
var mypath = "E:/aiedge/detector/reportTMPL";



function getfiles(rootdir, recursive, callback) {
    fs.readdir(rootdir, function (err1, files) {
        if (err1) {
            callback(err1)
            return;
        }
        files.forEach(function (name) {
            var fp = path.join(rootdir, name);
            fs.stat(fp, function (err2, stats) {
                if (err2) {
                    return console.log(err2);
                }
                if (stats.isFile()) {
                    callback(err2, fp, stats)
                } else {
                    if (stats.isDirectory()) {
                        if (recursive) {
                            getfiles(fp, recursive, callback);
                        }
                    }
                }
            });
        });
    });
}


// var fl = [];
getfiles(mypath, true, function (err, file, stats) {
    // console.log("here:" + file)
    if (err) {
        console.log(err);
    } else {
        console.log(file);
    }
});

console.log(process.env);

// fl.forEach(function (s) {
//     console.log(s);
// })
