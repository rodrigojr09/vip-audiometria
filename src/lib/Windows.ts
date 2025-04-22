import { BrowserWindow, nativeImage } from "electron";
import path from "path";

export default function MainWindow(isDev:boolean) {
	const win = new BrowserWindow({
		icon: nativeImage.createFromPath(
			path.join(__dirname, "../assets", "icon.png")
		),
		title: "VIP Audiometria",
		show: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});
	if (isDev) win?.loadURL("http://localhost:3000");
	else win?.loadURL("http://localhost:7961/");

	win.on("ready-to-show", () => {
		win.show();
		win?.maximize();
	});

	return win;
}
