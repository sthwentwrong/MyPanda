
const os = require('os');
const fs = require('fs');
const path = require('path');
const shell = require('electron').shell

const { aboutWin } = require('electron')

function notify(message) {
  if (!message) {
    message = 'unknown message.';
  }
  options = [
    {
      title: "Basic Notification",
      body: message
    }
  ];
  var notification = new Notification(options[0].title, options[0]);
  notification.show();
}

function doNotify(evt) {
  switch (evt.srcElement.id) {
    case "basic": {
      options = [
        {
          title: "Basic Notification",
          body: os.arch()
        }
      ];
      new Notification(options[0].title, options[0]);
      break;
    }
    case "createpath": {
      createFolder();
      break;
    }
    case "listprojs": {
      listProjs();
      break;
    }
    default: {
      break;
    }
  }
}

function createFolder(folderPath) {
  dirPath = path.join(process.cwd(), 'projects');
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, function (err) {
      if (err) {
        return console.log(err);
      }
      notify('create folder successfully.');
      document.getElementById("cresult").innerHTML = 'success';
    });
  } else {
    document.getElementById("cresult").innerHTML = 'the path existed';
    notify('the path existed');
    console.log('the path existed');
  }
}

function getfiles(dir, recursive, callback) {
  fs.readdir(dir, function (err, files) {
    if (err) {
      console.log(err.message);
      throw new Error(err);
    }

    files.forEach(function (name) {
      var filePath = path.join(dir, name);
      var stat = fs.statSync(filePath);
      if (stat.isFile()) {
        callback(filePath)
      } else if (stat.isDirectory() && recursive) {
        getdirs(filePath, recursive, callback);
      }
    });
  });
}

function getdirs(dir, recursive, callback) {
  fs.readdir(dir, function (err, files) {
    if (err) {
      console.log(err.message);
      throw new Error(err);
    }
    files.forEach(function (name) {
      var filePath = path.join(dir, name);
      var stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        callback(filePath)
        if (recursive) {
          getdirs(filePath, recursive, callback);
        }
      }
    });
  });
}

function walkDir(currentDirPath, callback) {
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
  console.log('dir path: ' + dirPath);
  var container = document.getElementById("listprojects");
  container.textContent = '';
  walkDir(dirPath, function (filePath, stat) {
    // filearr.push(filePath);
    console.log(filePath);
    // var d = document.createElement("div");
    // d.textContent = filePath;
    // document.getElementById("listprojects").appendChild(d);
  })
  // console.log(filearr);
}

var default_projects_cabin = path.join(process.cwd(), 'projects');

document.getElementById("span_default_projects_cabin").textContent = default_projects_cabin;

const demoBtns = document.querySelectorAll('.js-container-target')
Array.prototype.forEach.call(demoBtns, (btn) => {
  btn.addEventListener('click', (event) => {
    const parent = event.target.parentElement
    // Toggles the "is-open" class on the demo's parent element.
    parent.classList.toggle('is-open')
  })
})

const links = document.querySelectorAll('a[href]')

Array.prototype.forEach.call(links, (link) => {
  const url = link.getAttribute('href')
  if (url.indexOf('http') === 0) {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      shell.openExternal(url)
    })
  }
})


function appendData(data) {
  var mainContainer = document.getElementById("listprojects");
  mainContainer.innerHTML = '';
  for (var i = 0; i < data.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = 'Name: ' + data[i];
    mainContainer.appendChild(div);
  }
}

function getProjs(dir) {

  var results = [];

  fs.readdirSync(dir).forEach(function (file) {

    file = dir + '/' + file;
    var stat = fs.statSync(file);

    if (stat && stat.isDirectory()) {
      results.push(file)
      // results = results.concat(_getAllFilesFromFolder(file))
    } else results.push(file);

  });
  console.log(results);
  appendData(results);
  // notify("loading success.");
  return results;
};


const aboutbtn = document.querySelector("#button-about");
const ipc = require('electron').ipcRenderer;
aboutbtn.onclick = () => {
  ipc.send('displayAbout')
}


// span_default_projects_cabin
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("basic").addEventListener("click", doNotify);
  document.getElementById("createpath").addEventListener("click", doNotify);
  // document.getElementById("listprojs").addEventListener("click", getProjs(default_projects_cabin));
  // document.getElementById("button-about").addEventListener("click", displayAboutPage);
});