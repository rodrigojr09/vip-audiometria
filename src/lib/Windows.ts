import { BrowserWindow, nativeImage } from "electron";
import path from "path";

const defaultOptions = {
	icon: nativeImage.createFromPath(
		path.join(__dirname, "../assets", "icon.png")
	),
	title: "VIP Audiometria",
	show: false,
	webPreferences: {
		nodeIntegration: true,
		contextIsolation: false,
	},
};

export function MainWindow(isDev: boolean) {
	const win = new BrowserWindow(defaultOptions);
	
	if (isDev) win?.loadURL("http://localhost:3000");
	else win?.loadURL("http://localhost:7961/");

	win.on("ready-to-show", () => {
		win.show();
		win?.maximize();
	});

	return win;
}

export function LoadingWindow(isDev: boolean) {
	const width = 600;
	const height = 400;
	const win = new BrowserWindow({
		...defaultOptions,
		width,
		height,
		resizable: false,
		maximizable: false,
		minimizable: false,
	});
	if (isDev) win?.loadURL("http://localhost:3000/loading");
	else win?.loadURL("http://localhost:7961/loading");

	win.on("ready-to-show", () => {
		win.show();
		win?.maximize();
	});

	return win;
}
