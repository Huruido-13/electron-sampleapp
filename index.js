const {app, Menu, BrowserWindow} = require('electron');
const path = require('path');

function createWindow(){
    let win = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false

    }});

    win.loadFile('index.html');
    win.webContents.openDevTools();
}

function createMenu() {
    let menu_temp = [
        {label:'File',
            submenu: [
                {label:'New', click: () => {
                    console.log('New menu.');
                    createWindow();
                }},
                {label:'File', click: () => {
                    console.log('File menu.');
                    createWindow();
                }},
                {role: 'close'},
                {type: 'separator'},
                {role: 'quit'},
            ],
        },
        {role: 'editMenu'},
        {role: 'viewMenu'},
        {role: 'windowMenu'},
        {label: 'Help', submenu: [
            {role: 'about'},
            {type: 'separator'},
            {role: 'reload'},
            {role: 'zoomIn'},
            {role: 'zoomOut'}
        ]}
    ];

    let menu = Menu.buildFromTemplate(menu_temp);

    Menu.setApplicationMenu(menu);
}

createMenu();
app.whenReady().then(createWindow);
