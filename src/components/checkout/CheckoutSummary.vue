<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h3>

    <!-- Order Items -->
    <div class="space-y-3 mb-6">
      <div class="text-sm text-gray-600 dark:text-gray-300">2 × Large Pepperoni Pizza - $24.00</div>
      <div class="text-sm text-gray-600 dark:text-gray-300">1 × Medium Veggie Pizza - $15.00</div>
    </div>

    <!-- Totals -->
    <div class="space-y-2 mb-6">
      <div class="flex justify-between text-sm">
        <span class="text-gray-600 dark:text-gray-300">Subtotal:</span>
        <span class="text-gray-900 dark:text-white">$39.00</span>
      </div>

      <div class="flex justify-between text-sm">
        <span class="text-gray-600 dark:text-gray-300">Tax:</span>
        <span class="text-gray-900 dark:text-white">$3.32</span>
      </div>

      <div class="flex justify-between text-sm">
        <span class="text-gray-600 dark:text-gray-300">Delivery:</span>
        <span class="text-green-600">FREE</span>
      </div>

      <div class="border-t border-gray-200 dark:border-gray-700 pt-2">
        <div class="flex justify-between">
          <span class="font-semibold text-gray-900 dark:text-white">Total:</span>
          <span class="text-xl font-bold text-orange-500">$42.32</span>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="space-y-3">
      <button
        @click="$emit('place-order')"
        class="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
      >
        <Icon icon="radix-icons:check" class="w-4 h-4 mr-2" />
        Place Order
      </button>

      <button
        @click="$emit('back')"
        class="w-full py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        Back to Summary
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineEmits<{
  'place-order': []
  back: []
}>()
</script>
