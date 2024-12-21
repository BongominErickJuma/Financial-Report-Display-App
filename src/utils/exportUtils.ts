import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

export function exportToCSV(reports: any[]) {
  const csvContent =
    "Transaction ID,Date,Account Holder Name,Transaction Type,Amount,Account Balance\n" +
    reports
      .map((report) =>
        [
          report.transactionId,
          report.date,
          report.accountHolderName,
          report.transactionType,
          report.amount,
          report.accountBalance,
        ].join(",")
      )
      .join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", "financial_reports.csv");
  link.click();
}

export function exportToPDF(reports: any[]) {
  const doc = new jsPDF();
  doc.text("Financial Reports", 14, 10);
  doc.autoTable({
    head: [
      [
        "Transaction ID",
        "Date",
        "Account Holder Name",
        "Transaction Type",
        "Amount",
        "Account Balance",
      ],
    ],
    body: reports.map((report) => [
      report.transactionId,
      report.date,
      report.accountHolderName,
      report.transactionType,
      report.amount,
      report.accountBalance,
    ]),
  });
  doc.save("financial_reports.pdf");
}

export function exportToExcel(reports: any[]) {
  const worksheet = XLSX.utils.json_to_sheet(reports);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Reports");
  XLSX.writeFile(workbook, "financial_reports.xlsx");
}
