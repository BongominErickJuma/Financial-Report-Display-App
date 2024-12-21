<template>
  <div id="app">
    <h1>Financial Reports</h1>
    <FilterBar
      :searchQuery="searchQuery"
      :selectedExportFormat="selectedExportFormat"
      @search="updateSearchQuery"
      @update:selectedExportFormat="updateExportFormat"
      @export="exportData"
    />
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
    const store = useReportStore();
    const searchQuery = ref("");
    const selectedExportFormat = ref("pdf"); // Initial default export format

    const filteredReports = computed(() =>
      store.reports.filter((report) => {
        const query = searchQuery.value.toLowerCase();
        return (
          report.transactionType.toLowerCase().includes(query) ||
          report.accountHolderName.toLowerCase().includes(query)
        );
      })
    );

    const loading = computed(() => store.loading);

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

    const updateSearchQuery = (query: string) => {
      searchQuery.value = query;
    };

    const updateExportFormat = (format: string) => {
      selectedExportFormat.value = format;
    };

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
