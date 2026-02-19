import path from "node:path";
import {
    app,
    BrowserWindow,
    type BrowserWindowConstructorOptions,
    Menu,
    MenuItem,
    nativeImage,
} from "electron";

const defaultOptions: BrowserWindowConstructorOptions = {
    icon: nativeImage.createFromPath(
        path.join(__dirname, "../assets", "icon.png"),
    ),
    title: "VIP Audiometria",
    show: false,
};

export function MainWindow(isDev: boolean) {
    const win = new BrowserWindow(defaultOptions);

    if (isDev) win?.loadURL("http://localhost:3000");
    else win?.loadURL("https://vip-audiometria.vercel.app/");

    win.on("ready-to-show", () => {
        win.show();
        win?.maximize();
    });

    const menu = new MenuItem({
        label: "Audiometria",
        submenu: [
            {
                label: "Configurações",
                click: () => {
                    if (isDev) win?.loadURL("http://localhost:3000/config");
                    else win?.loadURL("https://vip-audiometria.vercel.app/config");
                },
            },
            {
                label: "Sair",
                click: () => {
                    app.quit();
                },
            },
        ],
    });

    const devMenu = new MenuItem({
        label: "Desenvolvimento",
        submenu: [
            {
                label: "Recarregar",
                role: "reload",
            },
            {
                label: "Abrir DevTools",
                role: "toggleDevTools",
            },
        ],
    });

    win.setMenu(Menu.buildFromTemplate([menu, devMenu]));

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
    if (isDev) win?.loadURL("http://localhost:3000/");
    else win?.loadURL("https://vip-audiometria.vercel.app/");

    win.on("ready-to-show", () => {
        win.show();
        win?.maximize();
    });

    return win;
}
