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
const xlsx_populate_1 = __importDefault(require("xlsx-populate"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const exceljs_1 = __importDefault(require("exceljs"));
const fs = __importStar(require("fs"));
function moment(date) {
    return (0, moment_timezone_1.default)(date).tz("America/Sao_Paulo");
}
const path_data = `\\\\server-tec\\Tecnico\\Sistemas VIP\\VIP-Audiometria`;
class DataProvider {
    getPath() {
        if (!fs.existsSync(path_data))
            fs.mkdirSync(path_data);
        if (!fs.existsSync(path_data + "/data.json"))
            fs.writeFileSync(path_data + "/data.json", JSON.stringify({ version: "1.0.0", datas: [] }));
        if (!fs.existsSync(path_data + "/Requisicao.xlsx"))
            fs;
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
    download(data, type, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blob = new Blob([data], { type: "application/vnd.ms-excel" });
                // Pergunta ao usuário onde salvar
                const { filePath } = yield electron_1.dialog.showSaveDialog({
                    title: "Salvar arquivo",
                    defaultPath: `${type.toUpperCase()} - ${name}}.${type === "requisicao" ? "xlsx" : "xlsm"}`,
                    filters: [{ name: "Excel", extensions: ["xlsx", "xlsm"] }],
                });
                if (filePath) {
                    // Converte o Blob em Buffer
                    const arrayBuffer = yield blob.arrayBuffer();
                    const buffer = Buffer.from(arrayBuffer);
                    // Salva o arquivo no caminho escolhido
                    fs.writeFileSync(filePath, buffer);
                    console.log("✅ Arquivo salvo em:", filePath);
                    // Abre o arquivo automaticamente
                    electron_1.shell.openPath(filePath);
                }
            }
            catch (error) {
                console.error("❌ Erro ao baixar o arquivo:", error);
            }
        });
    }
    downloadData(id, type) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
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
                    const responsavelCell = worksheet.getRow(5).getCell(6);
                    const documentoCell = worksheet.getRow(7).getCell(6);
                    nameCell.value = data.nome;
                    nascimentoCell.value = moment(data.dataNascimento).format("DD/MM/YYYY");
                    responsavelCell.value = data.responsavel;
                    documentoCell.value = data.documento;
                    cpfCell.value = data.cpf;
                    dataExameCell.value = moment(data.dataExame).format("DD/MM/YYYY");
                    funcaoCell.value = data.funcao;
                    empresaCell.value = data.empresa;
                    tipoExameCell.value = `(${data.tipoExame === "admissional" ? "X" : " "})Adm  (${data.tipoExame === "demissional" ? "X" : " "})Dem  (${data.tipoExame === "periodico" ? "X" : " "})Per  (${data.tipoExame === "mudanca" ? "X" : " "})Mud. Fun`;
                    // 📌 Salva as alterações no arquivo
                    return this.download(yield workbook.xlsx.writeBuffer(), type, data.nome);
                }
                catch (error) {
                    console.error("❌ Erro ao atualizar a planilha:", error);
                    return undefined;
                }
            }
            else {
                const filePath = `${path_data}/Resultado.xlsm`;
                try {
                    const workbook = yield xlsx_populate_1.default.fromFileAsync(filePath);
                    const sheet = workbook.sheets()[0];
                    if (!sheet) {
                        console.error("❌ Planilha não encontrada!");
                        return;
                    }
                    sheet.cell("G11").value(data.nome.toUpperCase());
                    sheet.cell("G12").value(data.cpf);
                    sheet
                        .cell("G13")
                        .value(moment(data.dataExame).format("DD/MM/YYYY"));
                    sheet.cell("R12").value(data.tipoExame.toUpperCase());
                    sheet.cell("R13").value(data.empresa.toUpperCase());
                    sheet
                        .cell("AC11")
                        .value(moment(data.dataNascimento).format("DD/MM/YYYY"));
                    sheet.cell("AB12").value(data.funcao.toUpperCase());
                    // Audiometria Direita
                    sheet.cell("M22").value((_a = data.resultados) === null || _a === void 0 ? void 0 : _a.d8000);
                    sheet.cell("L22").value((_b = data.resultados) === null || _b === void 0 ? void 0 : _b.d6000);
                    sheet.cell("K22").value((_c = data.resultados) === null || _c === void 0 ? void 0 : _c.d4000);
                    sheet.cell("J22").value((_d = data.resultados) === null || _d === void 0 ? void 0 : _d.d3000);
                    sheet.cell("I22").value((_e = data.resultados) === null || _e === void 0 ? void 0 : _e.d2000);
                    sheet.cell("H22").value((_f = data.resultados) === null || _f === void 0 ? void 0 : _f.d1000);
                    sheet.cell("G22").value((_g = data.resultados) === null || _g === void 0 ? void 0 : _g.d500);
                    sheet.cell("F22").value((_h = data.resultados) === null || _h === void 0 ? void 0 : _h.d250);
                    // Audiometria Esquerda
                    sheet.cell("AC22").value((_j = data.resultados) === null || _j === void 0 ? void 0 : _j.e8000);
                    sheet.cell("AB22").value((_k = data.resultados) === null || _k === void 0 ? void 0 : _k.e6000);
                    sheet.cell("AA22").value((_l = data.resultados) === null || _l === void 0 ? void 0 : _l.e4000);
                    sheet.cell("Z22").value((_m = data.resultados) === null || _m === void 0 ? void 0 : _m.e3000);
                    sheet.cell("Y22").value((_o = data.resultados) === null || _o === void 0 ? void 0 : _o.e2000);
                    sheet.cell("X22").value((_p = data.resultados) === null || _p === void 0 ? void 0 : _p.e1000);
                    sheet.cell("W22").value((_q = data.resultados) === null || _q === void 0 ? void 0 : _q.e500);
                    sheet.cell("V22").value((_r = data.resultados) === null || _r === void 0 ? void 0 : _r.e250);
                    sheet.cell("L40").value((_s = data.resultados) === null || _s === void 0 ? void 0 : _s.od);
                    sheet.cell("U40").value((_t = data.resultados) === null || _t === void 0 ? void 0 : _t.oe);
                    sheet.cell("S57").value(data.responsavel);
                    sheet.cell("S58").value(data.documento);
                    for (let i = 47, a = 0; i <= 52; i++, a++) {
                        const arr = (_u = data.resultados) === null || _u === void 0 ? void 0 : _u.obs.split("<br>");
                        const str = arr[a];
                        if (str)
                            sheet.cell(`E${i}`).value(str);
                    }
                    return this.download(yield workbook.outputAsync(), type, data.nome);
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
