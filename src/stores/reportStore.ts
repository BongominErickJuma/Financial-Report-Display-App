import { defineStore } from "pinia";

interface Report {
  id: number;
  transactionType: string;
  accountHolderName: string;
  transactionDate: string;
  transactionAmount: number;
}

export const useReportStore = defineStore("report", {
  state: () => ({
    reports: [] as Array<Report>, // Specify the type for the reports array
    loading: true, // Tracks loading state
    searchQuery: "", // Search query for filtering
    selectedExportFormat: "pdf", // Default export format
  }),
  getters: {
    filteredReports: (state) => {
      const query = state.searchQuery.toLowerCase();
      return state.reports.filter(
        (report) =>
          report.transactionType.toLowerCase().includes(query) ||
          report.accountHolderName.toLowerCase().includes(query)
      );
    },
  },
  actions: {
    async fetchReports() {
      try {
        const response = await fetch("/mock-reports.json");
        if (!response.ok) {
          throw new Error("Failed to fetch reports");
        }
        this.reports = await response.json(); // Ensure your mock data matches the Report type
        this.loading = false;
      } catch (error) {
        console.error("Error fetching data:", error);
        this.loading = false;
      }
    },
  },
});
