// createWindow()される前にロードされる
const { ipcRenderer } = require('electron');
const { remote } = require('electron');
const { dialog } = remote;
const fs = require('fs');
const https = require('https');

window.ipcRenderer = ipcRenderer;
window.remote = remote;
window.dialog = dialog;
window.fs = fs;
window.https = https;