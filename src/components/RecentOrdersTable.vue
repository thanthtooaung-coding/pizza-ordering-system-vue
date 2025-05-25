<template>
  <div class="rounded-lg border bg-card">
    <div class="p-6">
      <h3 class="text-lg font-medium">Recent Orders</h3>
      <p class="text-sm text-muted-foreground">
        You have {{ orders.length }} orders this week.
      </p>
    </div>
    <div class="border-t">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b bg-muted/50">
              <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Order ID
              </th>
              <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Customer
              </th>
              <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Status
              </th>
              <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="order in orders.slice(0, 5)"
              :key="order.id"
              class="border-b transition-colors hover:bg-muted/50 cursor-pointer"
              @click="$emit('view-order', order)"
            >
              <td class="p-4 align-middle">
                <div class="font-medium">#{{ order.id }}</div>
              </td>
              <td class="p-4 align-middle">
                <div>
                  <div class="font-medium">{{ order.customer?.name || order.customerInfo?.name || 'N/A' }}</div>
                  <div class="text-sm text-muted-foreground">{{ order.customer?.email || order.customerInfo?.email || 'N/A' }}</div>
                </div>
              </td>
              <td class="p-4 align-middle">
                <StatusBadge :status="order.status" />
              </td>
              <td class="p-4 align-middle">
                <div class="font-medium">${{ (order.total || order.totalAmount || 0).toFixed(2) }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import StatusBadge from './StatusBadge.vue'
import type { Order } from '../types'

interface Props {
  orders: Order[]
}

defineProps<Props>()
defineEmits<{
  'view-order': [order: Order]
}>()
</script>
