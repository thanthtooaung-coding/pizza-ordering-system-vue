<template>
  <div
    class="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
  >
    <div
      class="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900 dark:to-red-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
    >
      <Icon :icon="feature.icon" class="w-6 h-6 text-orange-500" />
    </div>
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
      {{ feature.title }}
    </h3>
    <p class="text-gray-600 dark:text-gray-300 text-sm">
      {{ feature.description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface Feature {
  icon: string
  title: string
  description: string
}

interface Props {
  feature: Feature
}

defineProps<Props>()
</script>
