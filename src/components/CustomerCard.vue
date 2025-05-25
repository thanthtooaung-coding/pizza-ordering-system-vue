<template>
  <div class="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
    <div class="flex items-center space-x-4">
      <div
        class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground"
      >
        {{ customer.name.charAt(0) }}
      </div>
      <div class="flex-1">
        <h3 class="font-medium">{{ customer.name }}</h3>
        <p class="text-sm text-muted-foreground">{{ customer.email }}</p>
      </div>
    </div>
    <div class="mt-4 space-y-2">
      <div class="flex justify-between text-sm">
        <span class="text-muted-foreground">Total Orders:</span>
        <span class="font-medium">{{ customer.totalOrders }}</span>
      </div>
      <div class="flex justify-between text-sm">
        <span class="text-muted-foreground">Total Spent:</span>
        <span class="font-medium">${{ customer.totalSpent.toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Customer } from '../types'

interface Props {
  customer: Customer
}

defineProps<Props>()
</script>
