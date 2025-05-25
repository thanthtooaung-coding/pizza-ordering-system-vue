<template>
  <div class="rounded-lg border bg-card p-6">
    <h3 class="text-lg font-medium mb-4">Monthly Revenue</h3>
    <div class="text-3xl font-bold">${{ revenue.toFixed(2) }}</div>
    <p class="text-sm text-muted-foreground mt-2">
      <span class="text-green-600">+12.5%</span> from last month
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  revenue: number
}

defineProps<Props>()
</script>
