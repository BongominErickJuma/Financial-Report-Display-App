<template>
  <!-- Displays a message while data is being loaded -->
  <div class="loading-container">
    <p>Loading data...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoadingIndicator", // Simple component to indicate loading state
});
</script>
