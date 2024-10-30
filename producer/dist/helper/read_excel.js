"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readExcel = void 0;
const path_1 = require("path");
const xlsx_1 = __importDefault(require("xlsx"));
const readExcel = (filename) => {
    const filePath = (0, path_1.resolve)(__dirname, "..", "input", filename);
    const workbook = xlsx_1.default.readFile(filePath);
    // Get the names of the sheets in the workbook
    const sheetNames = workbook.SheetNames;
    // Access the first sheet
    const firstSheet = workbook.Sheets[sheetNames[0]];
    // Convert the sheet to JSON
    const data = xlsx_1.default.utils.sheet_to_json(firstSheet);
    function excelDateToJSDate(excelDate) {
        const epoch = new Date(Date.UTC(1900, 0, 1)); // January 1, 1900
        const date = new Date(epoch.setDate(epoch.getDate() + excelDate - 1)); // Adjust for the serial number
        return date.toISOString().split("T")[0];
    }
    // Convert and display the data
    data.forEach((row) => {
        if (row.date_of_birth) {
            // Replace 'Birth' with your actual column name
            row.date_of_birth = excelDateToJSDate(row.date_of_birth);
        }
    });
    // Output the data
    return data;
};
exports.readExcel = readExcel;
