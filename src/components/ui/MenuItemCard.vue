<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
    <!-- Image -->
    <div class="relative h-40 overflow-hidden">
      <img
        :src="item.image"
        :alt="item.name"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
      
      <!-- Popular Badge -->
      <div v-if="item.popular" class="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold">
        🔥 Popular
      </div>

      <!-- Quick Add Button -->
      <button
        @click="$emit('add-to-cart', item)"
        class="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm text-orange-500 p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-white hover:scale-110 shadow-lg"
      >
        <Icon icon="radix-icons:plus" class="w-4 h-4" />
      </button>
    </div>

    <!-- Content -->
    <div class="p-4">
      <h3 class="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-orange-500 transition-colors">
        {{ item.name }}
      </h3>
      
      <p class="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
        {{ item.description }}
      </p>

      <div class="flex items-center justify-between">
        <span class="text-lg font-bold text-orange-500">
          ${{ item.price.toFixed(2) }}
        </span>
        
        <button
          @click="$emit('add-to-cart', item)"
          class="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors shadow-md hover:shadow-lg"
        >
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface MenuItem {
  id: number
  category: string
  name: string
  description: string
  price: number
  image: string
  popular?: boolean
}

interface Props {
  item: MenuItem
}

defineProps<Props>()
defineEmits<{
  'add-to-cart': [item: MenuItem]
}>()
</script>
