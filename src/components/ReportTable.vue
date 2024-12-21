<template>
  <table border="1" cellspacing="0" cellpadding="10">
    <thead>
      <!-- Table headers -->
      <tr>
        <th>Transaction ID</th>
        <th>Date</th>
        <th>Account Holder Name</th>
        <th>Transaction Type</th>
        <th>Amount</th>
        <th>Account Balance</th>
      </tr>
    </thead>
    <tbody>
      <!-- Dynamically render each report row -->
      <tr v-for="report in reports" :key="report.transactionId">
        <td>{{ report.transactionId }}</td>
        <td>{{ report.date }}</td>
        <td>{{ report.accountHolderName }}</td>
        <td>{{ report.transactionType }}</td>
        <td>{{ report.amount }}</td>
        <td>{{ report.accountBalance }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ReportTable",
  props: {
    reports: { type: Array, required: true }, // Array of report objects passed from the parent
  },
});
</script>
