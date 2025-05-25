<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-sm w-full mx-4">
      <div class="text-center">
        <!-- Animated Pizza -->
        <div class="relative w-16 h-16 mx-auto mb-6">
          <div
            class="w-full h-full rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400 animate-spin"
          ></div>
          <div
            class="absolute inset-2 rounded-full bg-gradient-to-br from-orange-300 to-red-400 animate-pulse"
          ></div>
          <Icon
            icon="radix-icons:slice"
            class="absolute inset-0 w-full h-full text-white animate-bounce"
          />
        </div>

        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Processing Your Order
        </h3>

        <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
          Please wait while we prepare your delicious pizza order...
        </p>

        <!-- Progress Bar -->
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div class="bg-orange-500 h-2 rounded-full animate-pulse" style="width: 70%"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>
