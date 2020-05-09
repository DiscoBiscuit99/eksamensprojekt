const { app, BrowserWindow, Menu } = require('electron');

//Menu.setApplicationMenu(null);

function createWindow () {
	const win = new BrowserWindow({
		width: 1600,
		height: 1000,
        autoHideMenuBar: true,
		webPreferences: {
            nodeIntegration: true
		}
	});

	win.loadFile('html/start.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

