<template>
  <div
    class="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
  >
    <!-- Pizza Visual -->
    <div class="w-12 h-12 flex-shrink-0">
      <div class="w-full h-full rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400"></div>
    </div>

    <!-- Item Details -->
    <div class="flex-1 min-w-0">
      <h4 class="text-sm font-medium text-gray-900 dark:text-white truncate">
        {{ item.size.name }} {{ item.crust.name }}
      </h4>
      <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
        {{ item.toppings.map((t) => t.name).join(', ') }}
      </p>
      <div class="text-sm font-medium text-orange-500">${{ item.totalPrice.toFixed(2) }}</div>
    </div>

    <!-- Quantity Controls -->
    <div class="flex items-center space-x-1">
      <button
        @click="updateQuantity(item.quantity - 1)"
        :disabled="item.quantity <= 1"
        class="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
      >
        <Icon icon="radix-icons:minus" class="w-3 h-3" />
      </button>
      <span class="w-6 text-center text-sm">{{ item.quantity }}</span>
      <button
        @click="updateQuantity(item.quantity + 1)"
        class="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        <Icon icon="radix-icons:plus" class="w-3 h-3" />
      </button>
    </div>

    <!-- Remove Button -->
    <button
      @click="$emit('remove', item.cartId)"
      class="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
    >
      <Icon icon="radix-icons:trash" class="w-4 h-4" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { CartItem } from '../../types'

interface Props {
  item: CartItem
}

const props = defineProps<Props>()
const emit = defineEmits<{
  remove: [cartId: string]
  'update-quantity': [data: { cartId: string; quantity: number }]
}>()

const updateQuantity = (newQuantity: number) => {
  if (newQuantity > 0) {
    emit('update-quantity', { cartId: props.item.cartId, quantity: newQuantity })
  }
}
</script>
