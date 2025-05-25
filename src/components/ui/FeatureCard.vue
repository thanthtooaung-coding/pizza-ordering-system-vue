<template>
  <div 
    class="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden relative"
    :style="{ animationDelay: `${delay}ms` }"
  >
    <!-- Background Gradient -->
    <div :class="[
      'absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br',
      feature.color || 'from-orange-500 to-red-500'
    ]"></div>

    <!-- Icon with Animation -->
    <div class="relative mb-6">
      <div :class="[
        'w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 bg-gradient-to-br',
        feature.color || 'from-orange-100 to-red-100 dark:from-orange-900 dark:to-red-900'
      ]">
        <Icon 
          :icon="feature.icon" 
          class="w-8 h-8 text-orange-500 group-hover:rotate-12 transition-transform duration-300" 
        />
      </div>
      
      <!-- Floating Particles -->
      <div class="absolute -top-2 -right-2 w-3 h-3 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
      <div class="absolute -bottom-1 -left-1 w-2 h-2 bg-red-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-opacity duration-300" style="animation-delay: 0.2s;"></div>
    </div>

    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-orange-500 transition-colors duration-300">
      {{ feature.title }}
    </h3>
    
    <p class="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
      {{ feature.description }}
    </p>

    <!-- Hover Effect Line -->
    <div class="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-500"></div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface Feature {
  icon: string
  title: string
  description: string
  color?: string
}

interface Props {
  feature: Feature
  delay?: number
}

defineProps<Props>()
</script>
