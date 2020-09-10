
const os = require('os');
const fs = require('fs')
const path = require('path');

 
function doNotify(evt) {
  switch (evt.srcElement.id) {
    case "basic": {
      options = [
        {
          title: "Basic Notification",
          body: os.arch()
        }
      ]
      new Notification(options[0].title, options[0]);
      break;
    }
    case "createpath": {
      createFolder()
      break;
    }
    case "listprojs":{
      listProjs();
      break;
    }
    default: {
      break;
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("basic").addEventListener("click", doNotify);
  document.getElementById("createpath").addEventListener("click", doNotify);
  document.getElementById("listprojs").addEventListener("click", doNotify);
})

function createFolder(folderPath) {
  dirPath = path.join(process.cwd(), 'projects')
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, function (err) {
      if (err) {
        return console.log(err);
      }
      document.getElementById("cresult").innerHTML = 'success'
    });
  } else {
    document.getElementById("cresult").innerHTML = 'the path existed'
    console.log('the path existed')
  }
}

function walkDir(currentDirPath, callback) {
  var fs = require('fs'),
    path = require('path');
  fs.readdir(currentDirPath, function (err, files) {
    if (err) {
      console.log(err.message);
      throw new Error(err);
    }
    files.forEach(function (name) {
      var filePath = path.join(currentDirPath, name);
      var stat = fs.statSync(filePath);
      if (stat.isFile()) {
        callback(filePath, stat);
      } else if (stat.isDirectory()) {
        walkDir(filePath, callback);
      }
    });
  });
}

function listProjs() {
  // document.getElementById("listprojs")
  var dirPath = path.join(process.cwd(), 'projects');
  console.log('dir path:${dirPath}' + dirPath)
  var container = document.getElementById("listprojects");
  container.textContent='';
  walkDir(dirPath, function (filePath, stat) {
    // filearr.push(filePath);
    console.log(filePath);
    var d = document.createElement("div");
    d.textContent = filePath;
    document.getElementById("listprojects").appendChild(d);
  })
  // console.log(filearr);
}

