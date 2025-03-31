"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const fs_1 = require("fs");
const path_data = `${electron_1.app.getPath("documents")}/VIP-Audiometria`;
class DataProvider {
    getPath() {
        if (!(0, fs_1.existsSync)(path_data))
            (0, fs_1.mkdirSync)(path_data);
        if (!(0, fs_1.existsSync)(path_data + "/data.json"))
            (0, fs_1.writeFileSync)(path_data + "/data.json", JSON.stringify({ version: "1.0.0", datas: [] }));
        return path_data + "/data.json";
    }
    constructor() {
        this.getPath();
    }
    getData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.parse((0, fs_1.readFileSync)(this.getPath()).toString());
            return id ? data.datas.find((d) => d.id === id) : data.datas;
        });
    }
    createData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataFile = JSON.parse((0, fs_1.readFileSync)(this.getPath()).toString());
            dataFile.datas.push(data);
            (0, fs_1.writeFileSync)(this.getPath(), JSON.stringify(dataFile));
            return data;
        });
    }
    updateData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataFile = JSON.parse((0, fs_1.readFileSync)(this.getPath()).toString());
            const datas = dataFile.datas.map((d) => {
                if (d.id === data.id)
                    return data;
                return d;
            });
            (0, fs_1.writeFileSync)(this.getPath(), JSON.stringify({ version: dataFile.version, datas }));
            return data;
        });
    }
    deleteData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataFile = JSON.parse((0, fs_1.readFileSync)(this.getPath()).toString());
            const datas = dataFile.datas.filter((d) => d.id !== id);
            (0, fs_1.writeFileSync)(this.getPath(), JSON.stringify({ version: dataFile.version, datas }));
            return id;
        });
    }
}
exports.default = DataProvider;
