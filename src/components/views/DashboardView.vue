<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold tracking-tight">Dashboard</h2>
      <p class="text-muted-foreground">
        Welcome back! Here's what's happening with your orders today.
      </p>
    </div>

    <StatsGrid :stats="dashboardStats" />

    <RecentOrdersTable :orders="recentOrders" @view-order="$emit('view-order', $event)" />
  </div>
</template>

<script setup lang="ts">
import StatsGrid from '../StatsGrid.vue'
import RecentOrdersTable from '../RecentOrdersTable.vue'
import type { DashboardStat, Order } from '../../types'

interface Props {
  dashboardStats: DashboardStat[]
  recentOrders: Order[]
}

defineProps<Props>()
defineEmits<{
  'view-order': [order: Order]
}>()
</script>
