const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;

//liten for app to be ready
app.on('ready', function(){
    //Create a new window
    mainWindow = new BrowserWindow({});
    //load hml in the mainWindow
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol:'file:',
        slashes: true
    }));
    //Quit app when closed
    mainWindow.on('close', function(){
        app.quit();
    });

    //Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //insert menu
    Menu.setApplicationMenu(mainMenu);
});


//handle createAddWindow
function createAddWindow() {
    //Create a new window
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Ajouter un article dans la liste'
    });
    //load hml in the mainWindow
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol:'file:',
        slashes: true
    }));
    //garbage collection handle
    addWindow.on('close', function(){
        addWindow = null;
    });
};

//create menu template
const mainMenuTemplate = [
    {
        label:'Fichier',
        submenu:[
            {
                label: 'Ajouter',
                click(){
                    createAddWindow()
                }
            },
            {
                label: 'Effacer Tout'
            },
            {
                label: 'Fermer',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];