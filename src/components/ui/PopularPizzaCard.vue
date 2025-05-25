<template>
  <div class="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
    <!-- Pizza Image -->
    <div class="relative h-48 bg-gradient-to-br from-yellow-200 to-orange-300 overflow-hidden">
      <img
        :src="pizza.image"
        :alt="pizza.name"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
      
      <!-- Overlay with Quick Actions -->
      <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
        <button
          @click="$emit('quick-add', pizza)"
          class="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white text-orange-500 px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl hover:bg-orange-50"
        >
          <Icon icon="radix-icons:plus" class="w-4 h-4 mr-2 inline" />
          Quick Add
        </button>
      </div>

      <!-- Rating Badge -->
      <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
        <Icon icon="radix-icons:star-filled" class="w-4 h-4 text-yellow-500" />
        <span class="text-sm font-semibold text-gray-900">{{ pizza.rating }}</span>
      </div>

      <!-- Popular Badge -->
      <div class="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
        🔥 {{ pizza.orders }}+ orders
      </div>
    </div>

    <!-- Content -->
    <div class="p-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-500 transition-colors">
        {{ pizza.name }}
      </h3>
      
      <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
        {{ pizza.description }}
      </p>

      <div class="flex items-center justify-between">
        <div class="text-2xl font-bold text-orange-500">
          ${{ pizza.price.toFixed(2) }}
        </div>
        
        <button
          @click="$emit('quick-add', pizza)"
          class="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface Pizza {
  name: string
  description: string
  price: number
  image: string
  rating: number
  orders: number
}

interface Props {
  pizza: Pizza
}

defineProps<Props>()
defineEmits<{
  'quick-add': [pizza: Pizza]
}>()
</script>
