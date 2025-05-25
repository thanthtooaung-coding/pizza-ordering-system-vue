<template>
  <header
    class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-orange-200 dark:border-gray-700 sticky top-0 z-40"
  >
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center space-x-3">
          <div
            class="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center"
          >
            <Icon icon="radix-icons:slice" class="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-900 dark:text-white">PizzaCraft</h1>
            <p class="text-xs text-gray-500 dark:text-gray-400">Artisan Pizza Ordering</p>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center space-x-4">
          <!-- Theme Toggle -->
          <button
            @click="$emit('toggle-theme')"
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <Icon
              :icon="isDark ? 'radix-icons:sun' : 'radix-icons:moon'"
              class="w-5 h-5 text-gray-600 dark:text-gray-300"
            />
          </button>

          <!-- Cart Button -->
          <button
            @click="$emit('view-cart')"
            class="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="View cart"
          >
            <Icon icon="radix-icons:backpack" class="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <Transition name="bounce">
              <span
                v-if="cartCount > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
              >
                {{ cartCount }}
              </span>
            </Transition>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface Props {
  cartCount: number
  isDark: boolean
}

defineProps<Props>()
defineEmits<{
  'toggle-theme': []
  'view-cart': []
}>()
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
