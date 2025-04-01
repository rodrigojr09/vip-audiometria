"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const exceljs_1 = __importDefault(require("exceljs"));
const fs = __importStar(require("fs"));
function moment(date) {
    return (0, moment_timezone_1.default)(date).tz("America/Sao_Paulo");
}
const path_data = `${electron_1.app.getPath("documents")}/VIP-Audiometria`;
class DataProvider {
    getPath() {
        if (!fs.existsSync(path_data))
            fs.mkdirSync(path_data);
        if (!fs.existsSync(path_data + "/data.json"))
            fs.writeFileSync(path_data + "/data.json", JSON.stringify({ version: "1.0.0", datas: [] }));
        return path_data + "/data.json";
    }
    constructor() {
        this.getPath();
    }
    getData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.parse(fs.readFileSync(this.getPath()).toString());
            return id
                ? data.datas.find((d) => d.id === id)
                : data.datas;
        });
    }
    createData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataFile = JSON.parse(fs.readFileSync(this.getPath()).toString());
            dataFile.datas.push(data);
            fs.writeFileSync(this.getPath(), JSON.stringify(dataFile));
            return data;
        });
    }
    updateData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataFile = JSON.parse(fs.readFileSync(this.getPath()).toString());
            const datas = dataFile.datas.map((d) => {
                if (d.id === data.id)
                    return data;
                return d;
            });
            fs.writeFileSync(this.getPath(), JSON.stringify({ version: dataFile.version, datas }));
            return data;
        });
    }
    deleteData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataFile = JSON.parse(fs.readFileSync(this.getPath()).toString());
            const datas = dataFile.datas.filter((d) => d.id !== id);
            fs.writeFileSync(this.getPath(), JSON.stringify({ version: dataFile.version, datas }));
            return id;
        });
    }
    downloadData(id, type) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
            const data = (yield this.getData(id));
            if (!data)
                return undefined;
            if (type === "requisicao") {
                const filePath = `${path_data}/Requisicao.xlsx`;
                try {
                    const workbook = new exceljs_1.default.Workbook();
                    yield workbook.xlsx.readFile(filePath);
                    const worksheet = workbook.getWorksheet(1);
                    if (!worksheet) {
                        console.error("❌ Planilha não encontrada no arquivo!");
                        return;
                    }
                    // 📌 Atualiza a célula B3 sem perder formatação
                    const nameCell = worksheet.getRow(3).getCell(2);
                    const nascimentoCell = worksheet.getRow(3).getCell(7);
                    const cpfCell = worksheet.getRow(4).getCell(2);
                    const dataExameCell = worksheet.getRow(5).getCell(2);
                    const funcaoCell = worksheet.getRow(6).getCell(2);
                    const empresaCell = worksheet.getRow(7).getCell(2);
                    const tipoExameCell = worksheet.getRow(4).getCell(7);
                    nameCell.value = data.nome;
                    nascimentoCell.value = moment(data.dataNascimento).format("DD/MM/YYYY");
                    cpfCell.value = data.cpf;
                    dataExameCell.value = moment(data.dataExame).format("DD/MM/YYYY");
                    funcaoCell.value = data.funcao;
                    empresaCell.value = data.empresa;
                    tipoExameCell.value = `(${data.tipoExame === "admissional" ? "X" : " "})Adm  (${data.tipoExame === "demissional" ? "X" : " "})Dem  (${data.tipoExame === "periodico" ? "X" : " "})Per  (${data.tipoExame === "mudanca" ? "X" : " "})Mud. Fun`;
                    // 📌 Salva as alterações no arquivo
                    return yield workbook.xlsx.writeBuffer();
                }
                catch (error) {
                    console.error("❌ Erro ao atualizar a planilha:", error);
                    return undefined;
                }
            }
            else {
                try {
                    const filePath = `${path_data}/Resultado.xlsx`;
                    const workbook = new exceljs_1.default.Workbook();
                    yield workbook.xlsx.readFile(filePath);
                    const worksheet = workbook.getWorksheet(23);
                    if (!worksheet) {
                        console.error("❌ Planilha não encontrada no arquivo!");
                        return;
                    }
                    const nameCell = worksheet.getRow(11).getCell(7);
                    const cpfCell = worksheet.getRow(12).getCell(7);
                    const dataExameCell = worksheet.getRow(13).getCell(7);
                    const tipoExameCell = worksheet.getRow(12).getCell(18);
                    const empresaCell = worksheet.getRow(13).getCell(18);
                    const dataNascimento = worksheet.getRow(11).getCell(29);
                    const funcaoCell = worksheet.getRow(12).getCell(28);
                    // Resultados Direito
                    const d8000Cell = worksheet.getRow(22).getCell(13);
                    const d6000Cell = worksheet.getRow(22).getCell(12);
                    const d4000Cell = worksheet.getRow(22).getCell(11);
                    const d3000Cell = worksheet.getRow(22).getCell(10);
                    const d2000Cell = worksheet.getRow(22).getCell(9);
                    const d1000Cell = worksheet.getRow(22).getCell(8);
                    const d500Cell = worksheet.getRow(22).getCell(7);
                    const d250Cell = worksheet.getRow(22).getCell(6);
                    // Resultados Esquerdo
                    const e8000Cell = worksheet.getRow(22).getCell(29);
                    const e6000Cell = worksheet.getRow(22).getCell(28);
                    const e4000Cell = worksheet.getRow(22).getCell(27);
                    const e3000Cell = worksheet.getRow(22).getCell(26);
                    const e2000Cell = worksheet.getRow(22).getCell(25);
                    const e1000Cell = worksheet.getRow(22).getCell(24);
                    const e500Cell = worksheet.getRow(22).getCell(23);
                    const e250Cell = worksheet.getRow(22).getCell(22);
                    d8000Cell.value = (_a = data.resultados) === null || _a === void 0 ? void 0 : _a.d8000;
                    d6000Cell.value = (_b = data.resultados) === null || _b === void 0 ? void 0 : _b.d6000;
                    d4000Cell.value = (_c = data.resultados) === null || _c === void 0 ? void 0 : _c.d4000;
                    d3000Cell.value = (_d = data.resultados) === null || _d === void 0 ? void 0 : _d.d3000;
                    d2000Cell.value = (_e = data.resultados) === null || _e === void 0 ? void 0 : _e.d2000;
                    d1000Cell.value = (_f = data.resultados) === null || _f === void 0 ? void 0 : _f.d1000;
                    d500Cell.value = (_g = data.resultados) === null || _g === void 0 ? void 0 : _g.d500;
                    d250Cell.value = (_h = data.resultados) === null || _h === void 0 ? void 0 : _h.d250;
                    e8000Cell.value = (_j = data.resultados) === null || _j === void 0 ? void 0 : _j.e8000;
                    e6000Cell.value = (_k = data.resultados) === null || _k === void 0 ? void 0 : _k.e6000;
                    e4000Cell.value = (_l = data.resultados) === null || _l === void 0 ? void 0 : _l.e4000;
                    e3000Cell.value = (_m = data.resultados) === null || _m === void 0 ? void 0 : _m.e3000;
                    e2000Cell.value = (_o = data.resultados) === null || _o === void 0 ? void 0 : _o.e2000;
                    e1000Cell.value = (_p = data.resultados) === null || _p === void 0 ? void 0 : _p.e1000;
                    e500Cell.value = (_q = data.resultados) === null || _q === void 0 ? void 0 : _q.e500;
                    e250Cell.value = (_r = data.resultados) === null || _r === void 0 ? void 0 : _r.e250;
                    nameCell.value = data.nome.toUpperCase();
                    cpfCell.value = data.cpf;
                    dataExameCell.value = moment(data.dataExame).format("DD/MM/YYYY");
                    tipoExameCell.value = data.tipoExame.toUpperCase();
                    empresaCell.value = data.empresa.toUpperCase();
                    dataNascimento.value = moment(data.dataNascimento).format("DD/MM/YYYY");
                    funcaoCell.value = data.funcao.toUpperCase();
                    const buffer = yield workbook.xlsx.writeBuffer();
                    return buffer;
                }
                catch (error) {
                    console.error("❌ Erro ao atualizar a planilha:", error);
                    return undefined;
                }
            }
        });
    }
}
exports.default = DataProvider;
