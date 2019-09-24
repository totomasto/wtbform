const electron = require('electron');
const {app, BrowserWindow, ipcMain, Menu, webFrame} = electron;
// this should be placed at top of main.js to handle setup events quickly
if (handleSquirrelEvent(app)) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}


var mysql = require('mysql');
var fs = require('fs');


var con = mysql.createConnection({
  multipleStatements: true,
  host :       process.env.DB_host,
  user :      process.env.DB_user,
  password :  process.env.DB_password,
  database : process.env.DB_database,



});



let mainWindow;
let menuTemplate = [
  {
    label: 'Comenzi aplicatie',
    submenu: [
      { label:'Comanda noua', role:'reload'},
      { label:'Setari adaos', click(){ openExcessWindow()} }
     
      
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'pasteandmatchstyle' },
      { role: 'delete' },
      { role: 'selectall' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    role: 'window',
    submenu: [
      { role: 'minimize' },
      { role: 'close' }
    ]
  }
];

let newWindow = null
function openExcessWindow(){
  if (newWindow) {
    newWindow.focus()
    return
  }

  newWindow = new BrowserWindow({
    height: 500,
    width: 500,
    title: 'Setari adaos',
  })

  newWindow.loadURL('file://' + __dirname + '/excessSettings.html')

  newWindow.on('closed', function() {
    newWindow = null
  })
}






app.on('ready', ()=>{

  mainWindow = new BrowserWindow();
  // secondWindow = new BrowserWindow({width:400, height:600, x:780, y:300})
  app.commandLine.appendSwitch('high-dpi-support', 1)
  app.commandLine.appendSwitch('force-device-scale-factor', 1)
 

  // mainWindow.addEventListener('offline', () => console.log('came offline'));

      // checking for mysql db
      con.connect(function(err) {
        if (err){
          throw err; 
        mainWindow.loadURL(`file:${__dirname}/mysqlerr.html`);
        } else  if (fs.existsSync(`${__dirname}/js/resources/init.txt`)) {
          
          // checkFirstSetUp();
      mainWindow.maximize();
      mainWindow.loadURL(`file:${__dirname}/index.html`);
      
      let menu = Menu.buildFromTemplate(menuTemplate);
      Menu.setApplicationMenu(menu);


    }   else {
      mainWindow.loadURL(`file:${__dirname}/setUp.html`);
    }
  
  });



  // secondWindow.loadURL(`file:${__dirname}/total.html`);

        

// mysql end
});





function handleSquirrelEvent(application) {
  if (process.argv.length === 1) {
      return false;
  }

  const ChildProcess = require('child_process');
  const path = require('path');

  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.basename(process.execPath);

  const spawn = function(command, args) {
      let spawnedProcess, error;

      try {
          spawnedProcess = ChildProcess.spawn(command, args, {
              detached: true
          });
      } catch (error) {}

      return spawnedProcess;
  };

  const spawnUpdate = function(args) {
      return spawn(updateDotExe, args);
  };

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
      case '--squirrel-install':
      case '--squirrel-updated':
          // Optionally do things such as:
          // - Add your .exe to the PATH
          // - Write to the registry for things like file associations and
          //   explorer context menus

          // Install desktop and start menu shortcuts
          spawnUpdate(['--createShortcut', exeName]);

          setTimeout(application.quit, 1000);
          return true;

      case '--squirrel-uninstall':
          // Undo anything you did in the --squirrel-install and
          // --squirrel-updated handlers

          // Remove desktop and start menu shortcuts
          spawnUpdate(['--removeShortcut', exeName]);

          setTimeout(application.quit, 1000);
          return true;

      case '--squirrel-obsolete':
          // This is called on the outgoing version of your app before
          // we update to the new version - it's the opposite of
          // --squirrel-updated

          application.quit();
          return true;
  }
};



