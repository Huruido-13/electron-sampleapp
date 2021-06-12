const {app, Menu, BrowserWindow} = require('electron');
const path = require('path');
const { ipcMain }= require('electron');

ipcMain.handle('hello', (event,arg) => {
    let ws = BrowserWindow.getAllWindows();
    for (const window of ws) {
        if(window.id != arg){
            window.close();
        }
    }

    return 'only open id= ' + arg;
})


function createWindow(){
    win = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation:false,
            enableRemoteModule:true,
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    });

    win.loadFile('index.html');
    win.webContents.openDevTools();
    return win.id;
}

function createMenu() {
    let menu_temp = [
        {label:'File',
            submenu: [
                {label:'New', click: () => {
                    console.log('New menu.');
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
