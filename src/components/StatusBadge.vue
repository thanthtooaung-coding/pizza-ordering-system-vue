<template>
  <span
    :class="[
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
      statusColors[status],
    ]"
  >
    {{ status }}
  </span>
</template>

<script setup lang="ts">
interface Props {
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
}

defineProps<Props>()

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}
</script>
