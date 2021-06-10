const {app, Menu, BrowserWindow} = require('electron');
const path = require('path');

function createWindow(){
    let win = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false, //electron ver12.x~これがないとrequireを使えない
            preload:path.join(app.getAppPath(), 'preload.js')
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
                {label:'Hello', click: (m,w) => {
                    console.log('Hello menu.');
                    w.webContents.executeJavaScript('hello()');
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
