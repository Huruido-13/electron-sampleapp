// createWindow()される前にロードされる
const { contextBridge, ipcRenderer } = require('electron');
const { remote } = require('electron');
const { dialog } = remote;
const fs = require('fs');
const https = require('https');
const Parser = require('rss-parser');
const path = require('path');
const sqlite3 = require('sqlite3')

window.ipcRenderer = ipcRenderer;
window.remote = remote;
window.dialog = dialog;
window.fs = fs;
window.https = https;
window.Parser = Parser;
window.path = path;
window.sqlite3 = sqlite3;