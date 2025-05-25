<template>
  <div class="rounded-lg border bg-card p-6">
    <h3 class="text-lg font-medium mb-4">Order Status Distribution</h3>
    <div class="space-y-3">
      <div v-for="status in stats" :key="status.name" class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <div :class="['h-3 w-3 rounded-full', getStatusColor(status.name)]"></div>
          <span class="text-sm font-medium capitalize">{{ status.name }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <span class="text-sm text-muted-foreground">{{ status.count }}</span>
          <span class="text-sm font-medium">{{ status.percentage }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { OrderStatusStat } from '../types'

interface Props {
  stats: OrderStatusStat[]
}

defineProps<Props>()

const getStatusColor = (status: string) => {
  const colors = {
    pending: 'bg-yellow-500',
    processing: 'bg-blue-500',
    shipped: 'bg-purple-500',
    delivered: 'bg-green-500',
    cancelled: 'bg-red-500',
  }
  return colors[status as keyof typeof colors] || 'bg-gray-500'
}
</script>
