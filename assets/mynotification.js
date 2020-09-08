
const os = require('os');

function doNotify(evt) {
  if (evt.srcElement.id == "basic") {
    options = [
      {
        title: "Basic Notification",
        body: os.arch()
      }
    ]
    new Notification(options[0].title, options[0]);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("basic").addEventListener("click", doNotify);
})

