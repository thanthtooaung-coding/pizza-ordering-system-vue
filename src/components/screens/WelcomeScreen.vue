<template>
  <div class="text-center max-w-4xl mx-auto">
    <!-- Hero Section -->
    <div class="mb-12">
      <div class="relative mb-8">
        <div
          class="w-32 h-32 mx-auto bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-2xl"
        >
          <Icon icon="radix-icons:slice" class="w-16 h-16 text-white" />
        </div>
        <div
          class="absolute inset-0 w-32 h-32 mx-auto bg-gradient-to-br from-orange-400 to-red-500 rounded-full animate-ping opacity-20"
        ></div>
      </div>

      <h1 class="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
        Welcome to
        <span class="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          PizzaCraft
        </span>
      </h1>

      <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
        Craft your perfect pizza with premium ingredients and artisan techniques. Every bite is a
        masterpiece waiting to be created.
      </p>
    </div>

    <!-- Features Grid -->
    <div class="grid md:grid-cols-3 gap-8 mb-12">
      <FeatureCard v-for="feature in features" :key="feature.title" :feature="feature" />
    </div>

    <!-- CTA Button -->
    <div class="space-y-4">
      <button
        @click="$emit('start-ordering')"
        class="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
      >
        <span class="relative z-10 flex items-center space-x-2">
          <Icon icon="radix-icons:plus" class="w-5 h-5" />
          <span>Start Crafting Your Pizza</span>
        </span>
        <div
          class="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        ></div>
      </button>

      <p class="text-sm text-gray-500 dark:text-gray-400">
        Free delivery on orders over $25 • Ready in 15-20 minutes
      </p>
    </div>

    <!-- Stats -->
    <div class="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto">
      <div class="text-center">
        <div class="text-2xl font-bold text-orange-500">{{ animatedStats.pizzas }}</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">Pizzas Crafted</div>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-orange-500">{{ animatedStats.customers }}</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">Happy Customers</div>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-orange-500">{{ animatedStats.rating }}</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">Average Rating</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import FeatureCard from '../ui/FeatureCard.vue'

defineEmits<{
  'start-ordering': []
}>()

const features = [
  {
    icon: 'radix-icons:gear',
    title: 'Custom Built',
    description: 'Choose from 3 sizes, 3 crust types, and 6 premium toppings',
  },
  {
    icon: 'radix-icons:timer',
    title: 'Fast Delivery',
    description: 'Fresh, hot pizza delivered to your door in 15-20 minutes',
  },
  {
    icon: 'radix-icons:star',
    title: 'Premium Quality',
    description: 'Only the finest ingredients and traditional cooking methods',
  },
]

const animatedStats = ref({
  pizzas: 0,
  customers: 0,
  rating: 0,
})

const targetStats = {
  pizzas: 1247,
  customers: 892,
  rating: 4.9,
}

// Animate numbers on mount
onMounted(() => {
  const duration = 2000
  const steps = 60
  const interval = duration / steps

  let step = 0
  const timer = setInterval(() => {
    step++
    const progress = step / steps

    animatedStats.value.pizzas = Math.floor(targetStats.pizzas * progress)
    animatedStats.value.customers = Math.floor(targetStats.customers * progress)
    animatedStats.value.rating = Number((targetStats.rating * progress).toFixed(1))

    if (step >= steps) {
      clearInterval(timer)
      animatedStats.value = { ...targetStats }
    }
  }, interval)
})
</script>
