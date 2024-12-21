<template>
  <div class="filter-export-container">
    <input
      type="text"
      :value="searchQuery"
      @input="$emit('search', $event.target.value)"
      placeholder="Search by Transaction Type or Account Holder Name"
    />
    <div class="export-container">
      <span>Export</span>
      <select v-model="selectedExportFormat">
        <option value="pdf">PDF</option>
        <option value="csv">CSV</option>
        <option value="excel">Excel</option>
      </select>
      <button @click="$emit('export')">Export</button>
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
});
</script>
