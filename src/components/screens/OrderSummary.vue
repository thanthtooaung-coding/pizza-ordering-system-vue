<template>
  <div class="max-w-4xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Order Summary</h2>
      <p class="text-gray-600 dark:text-gray-300">Review your pizzas before checkout</p>
    </div>

    <div class="grid lg:grid-cols-3 gap-8">
      <!-- Order Items -->
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Your Pizzas ({{ pizzas.length }})
          </h3>

          <div v-if="pizzas.length === 0" class="text-center py-8">
            <Icon icon="radix-icons:slice" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p class="text-gray-500 dark:text-gray-400">No pizzas in your order yet</p>
            <button
              @click="$emit('back')"
              class="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Add Some Pizzas
            </button>
          </div>

          <div v-else class="space-y-4">
            <PizzaOrderItem
              v-for="pizza in pizzas"
              :key="pizza.cartId"
              :pizza="pizza"
              @remove="removePizza"
              @update-quantity="updateQuantity"
            />
          </div>
        </div>

        <!-- Special Instructions -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Special Instructions
          </h3>
          <textarea
            v-model="specialInstructions"
            placeholder="Any special requests for your order..."
            class="w-full h-24 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-500"
          ></textarea>
        </div>
      </div>

      <!-- Order Total -->
      <div class="lg:sticky lg:top-24">
        <OrderTotalCard
          :pizzas="pizzas"
          :special-instructions="specialInstructions"
          @checkout="$emit('checkout')"
          @back="$emit('back')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import PizzaOrderItem from '../order/PizzaOrderItem.vue'
import OrderTotalCard from '../order/OrderTotalCard.vue'
import type { CartItem } from '../../types'

interface Props {
  pizzas: CartItem[]
}

defineProps<Props>()
defineEmits<{
  back: []
  checkout: []
}>()

const specialInstructions = ref('')

const removePizza = (cartId: string) => {
  // This would typically call the cart store
  console.log('Remove pizza:', cartId)
}

const updateQuantity = (cartId: string, quantity: number) => {
  // This would typically call the cart store
  console.log('Update quantity:', cartId, quantity)
}
</script>
