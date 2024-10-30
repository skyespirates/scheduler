import { resolve } from "path";
import XLSX from "xlsx";

export const readExcel = (filename: string) => {
  const filePath = resolve(__dirname, "..", "input", filename);

  const workbook = XLSX.readFile(filePath);
  // Get the names of the sheets in the workbook
  const sheetNames = workbook.SheetNames;

  // Access the first sheet
  const firstSheet = workbook.Sheets[sheetNames[0]];

  // Convert the sheet to JSON
  const data = XLSX.utils.sheet_to_json(firstSheet);

  function excelDateToJSDate(excelDate: number) {
    const epoch = new Date(Date.UTC(1900, 0, 1)); // January 1, 1900
    const date = new Date(epoch.setDate(epoch.getDate() + excelDate - 1)); // Adjust for the serial number
    return date.toISOString().split("T")[0];
  }

  // Convert and display the data
  data.forEach((row: any) => {
    if (row.date_of_birth) {
      // Replace 'Birth' with your actual column name
      row.date_of_birth = excelDateToJSDate(row.date_of_birth);
    }
  });

  // Output the data
  return data;
};
