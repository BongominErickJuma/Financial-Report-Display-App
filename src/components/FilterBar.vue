<template>
  <div class="filter-export-container">
    <input
      type="text"
      :value="searchQuery"
      @input="handleInput"
      placeholder="Search by Transaction Type or Account Holder Name"
    />
    <div class="export-container">
      <span>Export</span>
      <select v-model="localExportFormat">
        <option value="pdf">PDF</option>
        <option value="csv">CSV</option>
        <option value="excel">Excel</option>
      </select>
      <button @click="$emit('export', localExportFormat)">Export</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FilterBar",
  props: {
    searchQuery: { type: String, required: true },
    selectedExportFormat: { type: String, required: true },
  },
  data() {
    return {
      localExportFormat: this.selectedExportFormat, // Initialize local data with prop value
    };
  },
  watch: {
    localExportFormat(newValue) {
      this.$emit("update:selectedExportFormat", newValue); // Sync local changes with the parent
    },
  },
  methods: {
    handleInput(event: Event) {
      const target = event.target as HTMLInputElement | null;
      if (target) {
        this.$emit("search", target.value);
      }
    },
  },
});
</script>
