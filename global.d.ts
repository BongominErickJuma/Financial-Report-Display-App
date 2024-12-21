declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: {
      head: string[][];
      body: (string | number)[][];
    }) => void;
  }
}
