<template>
  <div class="flex items-center space-x-4">
    <div class="flex items-center space-x-2">
      <label class="text-sm font-medium">Status:</label>
      <select
        :value="status"
        @input="$emit('update:status', ($event.target as HTMLSelectElement).value)"
        class="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="processing">Processing</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </div>

    <div class="flex items-center space-x-2">
      <label class="text-sm font-medium">Search:</label>
      <input
        :value="search"
        @input="$emit('update:search', ($event.target as HTMLInputElement).value)"
        type="text"
        placeholder="Search orders..."
        class="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  search: string
  status: string
}

defineProps<Props>()
defineEmits<{
  'update:search': [value: string]
  'update:status': [value: string]
}>()
</script>
