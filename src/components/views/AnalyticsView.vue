<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold tracking-tight">Analytics</h2>
      <p class="text-muted-foreground">Track your business performance and insights.</p>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <OrderStatusChart :stats="orderStatusStats" />
      <RevenueCard :revenue="monthlyRevenue" />
    </div>
  </div>
</template>

<script setup lang="ts">
import OrderStatusChart from '../OrderStatusChart.vue'
import RevenueCard from '../RevenueCard.vue'
import type { OrderStatusStat } from '../../types'

interface Props {
  orderStatusStats: OrderStatusStat[]
  monthlyRevenue: number
}

defineProps<Props>()
</script>
