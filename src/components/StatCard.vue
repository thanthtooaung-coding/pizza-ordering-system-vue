<template>
  <div class="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
    <div class="flex items-center justify-between space-y-0 pb-2">
      <h3 class="text-sm font-medium tracking-tight">{{ stat.title }}</h3>
      <Icon :icon="stat.icon" class="h-4 w-4 text-muted-foreground" />
    </div>
    <div>
      <div class="text-2xl font-bold">{{ stat.value }}</div>
      <p class="text-xs text-muted-foreground">
        <span :class="stat.trend === 'up' ? 'text-green-600' : 'text-red-600'">
          {{ stat.change }}
        </span>
        from last month
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { DashboardStat } from '../types'

interface Props {
  stat: DashboardStat
}

defineProps<Props>()
</script>
