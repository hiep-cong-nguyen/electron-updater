window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
  })

   
  

  const { ipcRenderer } = require("electron")

  ipcRenderer.on("updateMessage", function (event, data) {
   let elemE = document.getElementById("message");
    elemE.innerHTML = data;
  });

  
  ipcRenderer.on("versionMessage", function (event, data) {
    let elemE = document.getElementById("version");
     elemE.innerHTML = data;
   });

   ipcRenderer.on("updateProgressMessage", function (event, data) {
    let elemE = document.getElementById("progress");
     elemE.innerHTML = data;
   });