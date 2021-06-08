const {app, BrowserWindow} = require('electron');


function createWindow(){
    let win = new BrowserWindow({
        width: 400,
        height: 200,
        show:false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('index.html');

    win.on('ready-to-show', () =>{
        win.show();
    })

    let child = new BrowserWindow({
        width: 350,
        height: 200,
        parent: win,
        webPreferences:{
            nodeIntegration:true
        }
    });

    child.loadFile('sub.html');
    win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

//Electronの起動処理が完了すると発生
app.on('will-finish-launching', () => {
    console.log("will-finish-launching");
})
