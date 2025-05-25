<template>
  <div class="flex flex-col items-center">
    <div
      :class="[
        'w-10 h-10 rounded-full flex items-center justify-center mb-2',
        completed
          ? 'bg-green-500 text-white'
          : active
            ? 'bg-orange-500 text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-400',
      ]"
    >
      <Icon :icon="icon" class="w-5 h-5" />
    </div>
    <span
      :class="[
        'text-xs text-center',
        completed || active ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500',
      ]"
    >
      {{ label }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface Props {
  icon: string
  label: string
  completed: boolean
  active: boolean
}

defineProps<Props>()
</script>
