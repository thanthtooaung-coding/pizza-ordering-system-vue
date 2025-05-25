<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Pizza Preview</h3>

    <!-- Pizza Visual -->
    <div class="relative w-48 h-48 mx-auto mb-6">
      <!-- Pizza Base -->
      <div
        class="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400 shadow-lg"
      >
        <!-- Crust indicator -->
        <div
          v-if="crust"
          :class="['absolute inset-0 rounded-full border-4', getCrustBorderClass(crust.name)]"
        ></div>
      </div>

      <!-- Toppings -->
      <div class="absolute inset-4 rounded-full overflow-hidden">
        <div
          v-for="(topping, index) in toppings"
          :key="topping.name"
          :class="['absolute w-3 h-3 rounded-full', getToppingColor(topping.name)]"
          :style="getToppingPosition(index, toppings.length)"
        ></div>
      </div>

      <!-- Size indicator -->
      <div v-if="size" class="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
        <span class="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
          {{ size.name }}
        </span>
      </div>
    </div>

    <!-- Details -->
    <div class="space-y-3">
      <div v-if="size" class="flex justify-between items-center">
        <span class="text-gray-600 dark:text-gray-300">Size:</span>
        <span class="font-medium text-gray-900 dark:text-white">{{ size.name }}</span>
      </div>

      <div v-if="crust" class="flex justify-between items-center">
        <span class="text-gray-600 dark:text-gray-300">Crust:</span>
        <span class="font-medium text-gray-900 dark:text-white">{{ crust.name }}</span>
      </div>

      <div v-if="toppings.length > 0" class="space-y-1">
        <span class="text-gray-600 dark:text-gray-300">Toppings:</span>
        <div class="flex flex-wrap gap-1">
          <span
            v-for="topping in toppings"
            :key="topping.name"
            class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
          >
            {{ topping.name }}
          </span>
        </div>
      </div>
    </div>

    <!-- Price Breakdown -->
    <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
      <div class="space-y-2 text-sm">
        <div v-if="size" class="flex justify-between">
          <span class="text-gray-600 dark:text-gray-300">{{ size.name }} Pizza:</span>
          <span class="text-gray-900 dark:text-white">${{ size.price.toFixed(2) }}</span>
        </div>

        <div v-if="crust && crust.price > 0" class="flex justify-between">
          <span class="text-gray-600 dark:text-gray-300">{{ crust.name }} Crust:</span>
          <span class="text-gray-900 dark:text-white">+${{ crust.price.toFixed(2) }}</span>
        </div>

        <div v-for="topping in toppings" :key="topping.name" class="flex justify-between">
          <span class="text-gray-600 dark:text-gray-300">{{ topping.name }}:</span>
          <span class="text-gray-900 dark:text-white">+${{ topping.price.toFixed(2) }}</span>
        </div>
      </div>

      <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
        <div class="flex justify-between items-center">
          <span class="font-semibold text-gray-900 dark:text-white">Total:</span>
          <span class="text-xl font-bold text-orange-500">${{ totalPrice.toFixed(2) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PizzaSize, CrustType, Topping } from '../../types'

interface Props {
  size: PizzaSize | null
  crust: CrustType | null
  toppings: Topping[]
  totalPrice: number
}

defineProps<Props>()

const getCrustBorderClass = (crustName: string) => {
  switch (crustName.toLowerCase()) {
    case 'thin':
      return 'border-yellow-600'
    case 'thick':
      return 'border-yellow-700 border-8'
    case 'stuffed':
      return 'border-yellow-800 border-8'
    default:
      return 'border-yellow-600'
  }
}

const getToppingColor = (toppingName: string) => {
  const colors = {
    CHEESE: 'bg-yellow-300',
    PEPPERONI: 'bg-red-500',
    MUSHROOM: 'bg-amber-700',
    OLIVES: 'bg-green-700',
    ONION: 'bg-purple-300',
    BACON: 'bg-orange-600',
  }
  return colors[toppingName as keyof typeof colors] || 'bg-gray-400'
}

const getToppingPosition = (index: number, total: number) => {
  const angle = (index / total) * 2 * Math.PI
  const radius = 30 + Math.random() * 40
  const x = 50 + radius * Math.cos(angle)
  const y = 50 + radius * Math.sin(angle)

  return {
    left: `${Math.max(10, Math.min(90, x))}%`,
    top: `${Math.max(10, Math.min(90, y))}%`,
  }
}
</script>
