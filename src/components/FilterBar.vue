<template>
  <div class="filter-export-container">
    <!-- Input field for search functionality -->
    <input
      type="text"
      :value="searchQuery"
      @input="handleInput"
      placeholder="Search by Transaction Type or Account Holder Name"
    />

    <!-- Export options container -->
    <div class="export-container">
      <span>Export</span>

      <!-- Dropdown for selecting export format -->
      <select v-model="localExportFormat">
        <option value="pdf">PDF</option>
        <option value="csv">CSV</option>
        <option value="excel">Excel</option>
      </select>

      <!-- Button to trigger export event -->
      <button @click="$emit('export', localExportFormat)">Export</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FilterBar",
  props: {
    searchQuery: { type: String, required: true }, // Search query from the parent
    selectedExportFormat: { type: String, required: true }, // Export format from the parent
  },
  data() {
    return {
      localExportFormat: this.selectedExportFormat, // Local state for the selected export format
    };
  },
  watch: {
    // Watch for changes in the local export format and sync with the parent component
    localExportFormat(newValue) {
      this.$emit("update:selectedExportFormat", newValue);
    },
  },
  methods: {
    // Emit the search query as the user types
    handleInput(event: Event) {
      const target = event.target as HTMLInputElement | null;
      if (target) {
        this.$emit("search", target.value);
      }
    },
  },
});
</script>
