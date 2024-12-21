<template>
  <div id="app">
    <h1>Financial Reports</h1>
    <FilterBar
      :searchQuery="searchQuery"
      :selectedExportFormat="selectedExportFormat"
      @search="updateSearchQuery"
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
    const selectedExportFormat = ref("pdf");

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

    const exportData = () => {
      const reports = filteredReports.value;
      if (selectedExportFormat.value === "csv") exportToCSV(reports);
      else if (selectedExportFormat.value === "pdf") exportToPDF(reports);
      else if (selectedExportFormat.value === "excel") exportToExcel(reports);
    };

    const updateSearchQuery = (query: string) => {
      searchQuery.value = query;
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
    };
  },
});
</script>
