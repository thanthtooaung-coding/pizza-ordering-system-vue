<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">Orders</h2>
        <p class="text-muted-foreground">
          Manage and track all your orders here.
        </p>
      </div>
      <button
        @click="$emit('create-order')"
        class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
      >
        <Icon icon="radix-icons:plus" class="mr-2 h-4 w-4" />
        New Order
      </button>
    </div>

    <OrderFilters
      v-model:search="searchQuery"
      v-model:status="selectedStatus"
    />

    <OrdersTable
      :orders="paginatedOrders"
      :total-pages="totalPages"
      :current-page="currentPage"
      :total-items="filteredOrders.length"
      :items-per-page="itemsPerPage"
      @edit-order="$emit('edit-order', $event)"
      @delete-order="$emit('delete-order', $event)"
      @view-order="$emit('view-order', $event)"
      @sort="handleSort"
      @page-change="currentPage = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import OrderFilters from '../OrderFilters.vue'
import OrdersTable from '../OrdersTable.vue'
import type { Order } from '../../types'

interface Props {
  orders: Order[]
}

const props = defineProps<Props>()

defineEmits<{
  'create-order': []
  'edit-order': [order: Order]
  'delete-order': [orderId: number]
  'view-order': [order: Order]
}>()

const searchQuery = ref('')
const selectedStatus = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const sortColumn = ref('id')
const sortDirection = ref<'asc' | 'desc'>('desc')

const filteredOrders = computed(() => {
  let filtered = props.orders

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(order =>
      order.id.toString().includes(query) ||
      order.customer.name.toLowerCase().includes(query) ||
      order.customer.email.toLowerCase().includes(query)
    )
  }

  if (selectedStatus.value) {
    filtered = filtered.filter(order => order.status === selectedStatus.value)
  }

  // Sorting
  filtered.sort((a, b) => {
    let aValue: any
    let bValue: any
    
    if (sortColumn.value === 'customer') {
      aValue = a.customer?.name || a.customerInfo?.name || ''
      bValue = b.customer?.name || b.customerInfo?.name || ''
    } else if (sortColumn.value === 'total') {
      aValue = a.total || a.totalAmount || 0
      bValue = b.total || b.totalAmount || 0
    } else {
      aValue = a[sortColumn.value as keyof Order]
      bValue = b[sortColumn.value as keyof Order]
    }

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }

    if (sortDirection.value === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  return filtered
})

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredOrders.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredOrders.value.length / itemsPerPage.value)
})

const handleSort = (column: string) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = column
    sortDirection.value = 'asc'
  }
}
</script>
