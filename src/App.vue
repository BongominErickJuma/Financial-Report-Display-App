<template>
  <div id="app">
    <h1>Financial Reports</h1>

    <!-- FilterBar for managing search and export options -->
    <FilterBar
      :searchQuery="searchQuery"
      :selectedExportFormat="selectedExportFormat"
      @search="updateSearchQuery"
      @update:selectedExportFormat="updateExportFormat"
      @export="exportData"
    />

    <!-- Conditional rendering: Show loading indicator or report table -->
    <LoadingIndicator v-if="loading" />
    <ReportTable v-else :reports="filteredReports" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from "vue";
import { useReportStore } from "@/stores/reportStore";
import FilterBar from "@/components/FilterBar.vue";
import ReportTable from "@/components/ReportTable.vue";
import LoadingIndicator from "@/components/LoadingIndicator.vue";
import { exportToCSV, exportToPDF, exportToExcel } from "@/utils/exportUtils";

export default defineComponent({
  name: "App",
  components: { FilterBar, ReportTable, LoadingIndicator },

  setup() {
    const store = useReportStore(); // State management for reports

    // Reactive properties for user inputs
    const searchQuery = ref("");
    const selectedExportFormat = ref("pdf");

    // Filter reports based on the search query
    const filteredReports = computed(() =>
      store.reports.filter((report) => {
        const query = searchQuery.value.toLowerCase();
        return (
          report.transactionType.toLowerCase().includes(query) ||
          report.accountHolderName.toLowerCase().includes(query)
        );
      })
    );

    // Track the loading state from the store
    const loading = computed(() => store.loading);

    // Handle exporting data in the selected format
    const exportData = (format: string) => {
      const reports = filteredReports.value;
      switch (format) {
        case "csv":
          exportToCSV(reports);
          break;
        case "pdf":
          exportToPDF(reports);
          break;
        case "excel":
          exportToExcel(reports);
          break;
        default:
          console.error("Unsupported export format:", format);
      }
    };

    // Update the search query from user input
    const updateSearchQuery = (query: string) => {
      searchQuery.value = query;
    };

    // Update the selected export format
    const updateExportFormat = (format: string) => {
      selectedExportFormat.value = format;
    };

    // Fetch reports when the component is mounted
    onMounted(() => {
      store.fetchReports();
    });

    return {
      searchQuery,
      selectedExportFormat,
      filteredReports,
      loading,
      exportData,
      updateSearchQuery,
      updateExportFormat,
    };
  },
});
</script>
