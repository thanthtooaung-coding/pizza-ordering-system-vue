<template>
  <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <StatCard v-for="stat in stats" :key="stat.title" :stat="stat" />
  </div>
</template>

<script setup lang="ts">
import StatCard from './StatCard.vue'
import type { DashboardStat } from '../types'

interface Props {
  stats: DashboardStat[]
}

defineProps<Props>()
</script>
