<template>
  <div
    class="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
  >
    <!-- Pizza Visual -->
    <div class="relative w-16 h-16 flex-shrink-0">
      <div class="w-full h-full rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400"></div>
      <div class="absolute inset-1 rounded-full overflow-hidden">
        <div
          v-for="(topping, index) in pizza.toppings.slice(0, 3)"
          :key="topping.name"
          :class="['absolute w-2 h-2 rounded-full', getToppingColor(topping.name)]"
          :style="getToppingPosition(index)"
        ></div>
      </div>
    </div>

    <!-- Pizza Details -->
    <div class="flex-1">
      <h4 class="font-semibold text-gray-900 dark:text-white">
        {{ pizza.size.name }} {{ pizza.crust.name }} Pizza
      </h4>
      <p class="text-sm text-gray-600 dark:text-gray-300">
        {{ pizza.toppings.map((t) => t.name).join(', ') }}
      </p>
      <div class="text-sm text-orange-500 font-medium">${{ pizza.totalPrice.toFixed(2) }} each</div>
    </div>

    <!-- Quantity Controls -->
    <div class="flex items-center space-x-2">
      <button
        @click="updateQuantity(pizza.quantity - 1)"
        :disabled="pizza.quantity <= 1"
        class="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
      >
        <Icon icon="radix-icons:minus" class="w-4 h-4" />
      </button>
      <span class="w-8 text-center font-medium">{{ pizza.quantity }}</span>
      <button
        @click="updateQuantity(pizza.quantity + 1)"
        class="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        <Icon icon="radix-icons:plus" class="w-4 h-4" />
      </button>
    </div>

    <!-- Total Price -->
    <div class="text-right">
      <div class="font-bold text-gray-900 dark:text-white">
        ${{ (pizza.totalPrice * pizza.quantity).toFixed(2) }}
      </div>
    </div>

    <!-- Remove Button -->
    <button
      @click="$emit('remove', pizza.cartId)"
      class="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
      title="Remove pizza"
    >
      <Icon icon="radix-icons:trash" class="w-4 h-4" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { CartItem } from '../../types'

interface Props {
  pizza: CartItem
}

const props = defineProps<Props>()
const emit = defineEmits<{
  remove: [cartId: string]
  'update-quantity': [cartId: string, quantity: number]
}>()

const updateQuantity = (newQuantity: number) => {
  if (newQuantity > 0) {
    emit('update-quantity', props.pizza.cartId, newQuantity)
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

const getToppingPosition = (index: number) => {
  const positions = [
    { left: '25%', top: '25%' },
    { left: '75%', top: '25%' },
    { left: '50%', top: '75%' },
  ]
  return positions[index] || { left: '50%', top: '50%' }
}
</script>
