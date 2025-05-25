<template>
  <div class="space-y-4">
    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Choose Your Crust</h3>

    <div class="grid gap-4">
      <div
        v-for="crust in crusts"
        :key="crust.name"
        @click="$emit('update:modelValue', crust)"
        :class="[
          'p-4 border-2 rounded-xl cursor-pointer transition-all duration-300',
          modelValue?.name === crust.name
            ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
            : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600',
        ]"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div
              :class="[
                'w-12 h-12 rounded-full flex items-center justify-center',
                getCrustIconClass(crust.name),
              ]"
            >
              <Icon :icon="getCrustIcon(crust.name)" class="w-6 h-6" />
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 dark:text-white">
                {{ crust.name }}
              </h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ crust.description }}
              </p>
            </div>
          </div>
          <div class="text-right">
            <div class="text-lg font-bold text-orange-500">
              {{ crust.price === 0 ? 'Free' : `+$${crust.price.toFixed(2)}` }}
            </div>
            <div v-if="modelValue?.name === crust.name" class="text-green-500 text-sm">
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
import type { CrustType } from '../../types'

interface Props {
  modelValue: CrustType | null
  crusts: CrustType[]
}

defineProps<Props>()
defineEmits<{
  'update:modelValue': [crust: CrustType]
}>()

const getCrustIcon = (crustName: string) => {
  switch (crustName.toLowerCase()) {
    case 'thin':
      return 'radix-icons:minus'
    case 'thick':
      return 'radix-icons:layers'
    case 'stuffed':
      return 'radix-icons:stack'
    default:
      return 'radix-icons:circle'
  }
}

const getCrustIconClass = (crustName: string) => {
  switch (crustName.toLowerCase()) {
    case 'thin':
      return 'bg-purple-100 dark:bg-purple-900 text-purple-500'
    case 'thick':
      return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-500'
    case 'stuffed':
      return 'bg-indigo-100 dark:bg-indigo-900 text-indigo-500'
    default:
      return 'bg-gray-100 dark:bg-gray-900 text-gray-500'
  }
}
</script>
