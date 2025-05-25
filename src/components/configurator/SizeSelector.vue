<template>
  <div class="space-y-4">
    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Choose Your Size</h3>

    <div class="grid gap-4">
      <div
        v-for="size in sizes"
        :key="size.name"
        @click="$emit('update:modelValue', size)"
        :class="[
          'p-4 border-2 rounded-xl cursor-pointer transition-all duration-300',
          modelValue?.name === size.name
            ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
            : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600',
        ]"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div
              :class="[
                'w-12 h-12 rounded-full flex items-center justify-center',
                getSizeIconClass(size.name),
              ]"
            >
              <Icon icon="radix-icons:circle" :class="getSizeIconSize(size.name)" />
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 dark:text-white">
                {{ size.name }}
              </h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ size.description }}
              </p>
            </div>
          </div>
          <div class="text-right">
            <div class="text-lg font-bold text-orange-500">${{ size.price.toFixed(2) }}</div>
            <div v-if="modelValue?.name === size.name" class="text-green-500 text-sm">
              <Icon icon="radix-icons:check" class="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { PizzaSize } from '../../types'

interface Props {
  modelValue: PizzaSize | null
  sizes: PizzaSize[]
}

defineProps<Props>()
defineEmits<{
  'update:modelValue': [size: PizzaSize]
}>()

const getSizeIconClass = (sizeName: string) => {
  switch (sizeName.toLowerCase()) {
    case 'small':
      return 'bg-blue-100 dark:bg-blue-900 text-blue-500'
    case 'medium':
      return 'bg-green-100 dark:bg-green-900 text-green-500'
    case 'large':
      return 'bg-red-100 dark:bg-red-900 text-red-500'
    default:
      return 'bg-gray-100 dark:bg-gray-900 text-gray-500'
  }
}

const getSizeIconSize = (sizeName: string) => {
  switch (sizeName.toLowerCase()) {
    case 'small':
      return 'w-4 h-4'
    case 'medium':
      return 'w-6 h-6'
    case 'large':
      return 'w-8 h-8'
    default:
      return 'w-6 h-6'
  }
}
</script>
