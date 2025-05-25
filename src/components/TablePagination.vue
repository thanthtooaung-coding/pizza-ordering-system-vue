<template>
  <div class="flex items-center justify-between border-t px-6 py-4">
    <div class="text-sm text-muted-foreground">
      Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
      {{ Math.min(currentPage * itemsPerPage, totalItems) }} of {{ totalItems }} results
    </div>
    <div class="flex items-center space-x-2">
      <button
        @click="$emit('page-change', currentPage - 1)"
        :disabled="currentPage === 1"
        class="rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-accent disabled:opacity-50"
      >
        Previous
      </button>
      <span class="text-sm"> Page {{ currentPage }} of {{ totalPages }} </span>
      <button
        @click="$emit('page-change', currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-accent disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

defineProps<Props>()
defineEmits<{
  'page-change': [page: number]
}>()
</script>
