import { defineStore } from "pinia";

interface Report {
  id: number;
  transactionType: string;
  accountHolderName: string;
  transactionDate: string;
  transactionAmount: number;
}

export const useReportStore = defineStore("report", {
  // Define the state of the store
  state: () => ({
    reports: [] as Array<Report>, // Array to store report data
    loading: true, // Tracks if data is being loaded
    searchQuery: "", // Stores the current search query
    selectedExportFormat: "pdf", // Default export format
  }),

  // Define getters to compute derived state
  getters: {
    filteredReports: (state) => {
      const query = state.searchQuery.toLowerCase();
      // Filter reports by transaction type or account holder name
      return state.reports.filter(
        (report) =>
          report.transactionType.toLowerCase().includes(query) ||
          report.accountHolderName.toLowerCase().includes(query)
      );
    },
  },

  // Define actions to update the store state
  actions: {
    // Fetch reports data from a mock endpoint
    async fetchReports() {
      try {
        const response = await fetch("/mock-reports.json");
        if (!response.ok) {
          throw new Error("Failed to fetch reports");
        }
        this.reports = await response.json();
        this.loading = false; // Set loading to false once data is loaded
      } catch (error) {
        console.error("Error fetching data:", error);
        this.loading = false; // Ensure loading is false even on error
      }
    },
  },
});
