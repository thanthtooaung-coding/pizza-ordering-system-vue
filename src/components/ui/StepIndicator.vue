<template>
  <div
    @click="$emit('click')"
    :class="[
      'flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer',
      isActive
        ? 'bg-orange-500 text-white'
        : isCompleted
          ? 'bg-green-500 text-white'
          : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600',
    ]"
  >
    <div
      :class="[
        'w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium',
        isActive || isCompleted ? 'bg-white/20' : 'bg-white/10',
      ]"
    >
      <Icon v-if="isCompleted" icon="radix-icons:check" class="w-4 h-4" />
      <Icon v-else :icon="step.icon" class="w-4 h-4" />
    </div>
    <span class="text-sm font-medium">{{ step.label }}</span>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface Step {
  id: string
  label: string
  icon: string
}

interface Props {
  step: Step
  isActive: boolean
  isCompleted: boolean
}

defineProps<Props>()
defineEmits<{
  click: []
}>()
</script>
