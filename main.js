const { app, BrowserWindow } = require('electron');

let win;

function create_browserwindow() {
	win = new BrowserWindow({
		width: 1000,
		height: 800,
		frame: true,
		webPreferences: {
			nodeIntegration: true
		}
	});

	win.loadFile('index.html');
}

app.whenReady().then(createWindow());

