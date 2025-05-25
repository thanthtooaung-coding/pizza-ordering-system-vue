<template>
  <div class="rounded-lg border bg-card">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b bg-muted/50">
            <th
              v-for="column in columns"
              :key="column.key"
              @click="$emit('sort', column.key)"
              :class="[
                'h-12 px-4 text-left align-middle font-medium text-muted-foreground cursor-pointer hover:bg-muted',
                column.sortable && 'select-none',
              ]"
            >
              <div class="flex items-center space-x-2">
                <span>{{ column.label }}</span>
                <Icon v-if="column.sortable" icon="radix-icons:chevron-up" class="h-4 w-4" />
              </div>
            </th>
            <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="order in orders"
            :key="order.id"
            class="border-b transition-colors hover:bg-muted/50"
          >
            <td class="p-4 align-middle">
              <div class="font-medium">#{{ order.id }}</div>
            </td>
            <td class="p-4 align-middle">
              <div>
                <div class="font-medium">{{ order.customer.name }}</div>
                <div class="text-sm text-muted-foreground">{{ order.customer.email }}</div>
              </div>
            </td>
            <td class="p-4 align-middle">
              <StatusBadge :status="order.status" />
            </td>
            <td class="p-4 align-middle">
              <div class="font-medium">${{ order.total.toFixed(2) }}</div>
            </td>
            <td class="p-4 align-middle">
              <div class="text-sm text-muted-foreground">
                {{ formatDate(order.createdAt) }}
              </div>
            </td>
            <td class="p-4 align-middle">
              <div class="flex items-center space-x-2">
                <button
                  @click="$emit('view-order', order)"
                  class="rounded-md p-2 hover:bg-accent"
                  title="View Order"
                >
                  <Icon icon="radix-icons:eye-open" class="h-4 w-4" />
                </button>
                <button
                  @click="$emit('edit-order', order)"
                  class="rounded-md p-2 hover:bg-accent"
                  title="Edit Order"
                >
                  <Icon icon="radix-icons:pencil-1" class="h-4 w-4" />
                </button>
                <button
                  @click="$emit('delete-order', order.id)"
                  class="rounded-md p-2 hover:bg-accent text-destructive"
                  title="Delete Order"
                >
                  <Icon icon="radix-icons:trash" class="h-4 w-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <TablePagination
      :current-page="currentPage"
      :total-pages="totalPages"
      :total-items="totalItems"
      :items-per-page="itemsPerPage"
      @page-change="$emit('page-change', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import StatusBadge from './StatusBadge.vue'
import TablePagination from './TablePagination.vue'
import type { Order } from '../types'

interface Props {
  orders: Order[]
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

defineProps<Props>()
defineEmits<{
  'view-order': [order: Order]
  'edit-order': [order: Order]
  'delete-order': [orderId: number]
  sort: [column: string]
  'page-change': [page: number]
}>()

const columns = [
  { key: 'id', label: 'Order ID', sortable: true },
  { key: 'customer', label: 'Customer', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'total', label: 'Total', sortable: true },
  { key: 'createdAt', label: 'Date', sortable: true },
]

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}
</script>
