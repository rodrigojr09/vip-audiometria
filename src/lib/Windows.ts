import { BrowserWindow, nativeImage } from "electron";
import path from "path";

export default function MainWindow() {
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
    
    return win;
}
