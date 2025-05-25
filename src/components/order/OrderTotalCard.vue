<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Total</h3>

    <!-- Order Summary -->
    <div class="space-y-3 mb-6">
      <div class="flex justify-between text-sm">
        <span class="text-gray-600 dark:text-gray-300">Subtotal:</span>
        <span class="text-gray-900 dark:text-white">${{ subtotal.toFixed(2) }}</span>
      </div>

      <div class="flex justify-between text-sm">
        <span class="text-gray-600 dark:text-gray-300">Tax (8.5%):</span>
        <span class="text-gray-900 dark:text-white">${{ tax.toFixed(2) }}</span>
      </div>

      <div class="flex justify-between text-sm">
        <span class="text-gray-600 dark:text-gray-300">Delivery Fee:</span>
        <span class="text-gray-900 dark:text-white">
          {{ subtotal >= 25 ? 'FREE' : '$3.99' }}
        </span>
      </div>

      <div class="border-t border-gray-200 dark:border-gray-700 pt-3">
        <div class="flex justify-between">
          <span class="font-semibold text-gray-900 dark:text-white">Total:</span>
          <span class="text-xl font-bold text-orange-500">${{ total.toFixed(2) }}</span>
        </div>
      </div>
    </div>

    <!-- Delivery Info -->
    <div
      v-if="subtotal < 25"
      class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 mb-6"
    >
      <div class="flex items-center space-x-2">
        <Icon icon="radix-icons:info-circled" class="w-4 h-4 text-amber-600" />
        <span class="text-sm text-amber-700 dark:text-amber-300">
          Add ${{ (25 - subtotal).toFixed(2) }} more for free delivery!
        </span>
      </div>
    </div>

    <div
      v-else
      class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-6"
    >
      <div class="flex items-center space-x-2">
        <Icon icon="radix-icons:check-circled" class="w-4 h-4 text-green-600" />
        <span class="text-sm text-green-700 dark:text-green-300">
          You qualify for free delivery!
        </span>
      </div>
    </div>

    <!-- Estimated Time -->
    <div
      class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-6"
    >
      <div class="flex items-center space-x-2">
        <Icon icon="radix-icons:timer" class="w-4 h-4 text-blue-600" />
        <span class="text-sm text-blue-700 dark:text-blue-300">
          Estimated delivery: 25-35 minutes
        </span>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="space-y-3">
      <button
        @click="$emit('checkout')"
        :disabled="pizzas.length === 0"
        class="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Proceed to Checkout
      </button>

      <button
        @click="$emit('back')"
        class="w-full py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        Add More Pizzas
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import type { CartItem } from '../../types'

interface Props {
  pizzas: CartItem[]
  specialInstructions: string
}

const props = defineProps<Props>()
defineEmits<{
  checkout: []
  back: []
}>()

const subtotal = computed(() => {
  return props.pizzas.reduce((sum, pizza) => sum + pizza.totalPrice * pizza.quantity, 0)
})

const tax = computed(() => {
  return subtotal.value * 0.085
})

const deliveryFee = computed(() => {
  return subtotal.value >= 25 ? 0 : 3.99
})

const total = computed(() => {
  return subtotal.value + tax.value + deliveryFee.value
})
</script>
