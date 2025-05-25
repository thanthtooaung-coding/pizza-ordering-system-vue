<template>
  <Transition name="slide-over">
    <div v-if="show" class="fixed inset-0 z-50 overflow-hidden">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/50" @click="$emit('update:show', false)"></div>

      <!-- Sidebar -->
      <div
        class="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-xl"
      >
        <div class="flex h-full flex-col">
          <!-- Header -->
          <div
            class="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-6"
          >
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
              Your Cart ({{ items.length }})
            </h2>
            <button
              @click="$emit('update:show', false)"
              class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Icon icon="radix-icons:cross-2" class="w-5 h-5" />
            </button>
          </div>

          <!-- Cart Items -->
          <div class="flex-1 overflow-y-auto p-6">
            <div v-if="items.length === 0" class="text-center py-12">
              <Icon icon="radix-icons:slice" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p class="text-gray-500 dark:text-gray-400 mb-4">Your cart is empty</p>
              <button
                @click="$emit('update:show', false)"
                class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Start Ordering
              </button>
            </div>

            <div v-else class="space-y-4">
              <CartItem
                v-for="item in items"
                :key="item.cartId"
                :item="item"
                @remove="$emit('remove-item', $event)"
                @update-quantity="$emit('update-quantity', $event.cartId, $event.quantity)"
              />
            </div>
          </div>

          <!-- Footer -->
          <div v-if="items.length > 0" class="border-t border-gray-200 dark:border-gray-700 p-6">
            <div class="mb-4">
              <div class="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span class="text-orange-500">${{ cartTotal.toFixed(2) }}</span>
              </div>
            </div>

            <div class="space-y-3">
              <button
                @click="$emit('checkout')"
                class="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
              >
                Proceed to Checkout
              </button>

              <button
                @click="$emit('update:show', false)"
                class="w-full py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import CartItem from './CartItem.vue'
import type { CartItem as CartItemType } from '../../types'

interface Props {
  show: boolean
  items: CartItemType[]
}

const props = defineProps<Props>()
defineEmits<{
  'update:show': [show: boolean]
  checkout: []
  'remove-item': [cartId: string]
  'update-quantity': [cartId: string, quantity: number]
}>()

const cartTotal = computed(() => {
  return props.items.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0)
})
</script>

<style scoped>
.slide-over-enter-active,
.slide-over-leave-active {
  transition: all 0.3s ease;
}

.slide-over-enter-from,
.slide-over-leave-to {
  transform: translateX(100%);
}
</style>
