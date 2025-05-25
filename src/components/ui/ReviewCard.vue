<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <!-- Header -->
    <div class="flex items-center space-x-4 mb-4">
      <img
        :src="review.avatar"
        :alt="review.name"
        class="w-12 h-12 rounded-full object-cover"
      />
      <div class="flex-1">
        <h4 class="font-semibold text-gray-900 dark:text-white">{{ review.name }}</h4>
        <div class="flex items-center space-x-2">
          <div class="flex items-center">
            <Icon
              v-for="star in 5"
              :key="star"
              icon="radix-icons:star-filled"
              :class="[
                'w-4 h-4',
                star <= review.rating ? 'text-yellow-500' : 'text-gray-300'
              ]"
            />
          </div>
          <span class="text-sm text-gray-500">{{ review.date }}</span>
        </div>
      </div>
    </div>

    <!-- Review Content -->
    <p class="text-gray-600 dark:text-gray-300 italic">
      "{{ review.comment }}"
    </p>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface Review {
  id: number
  name: string
  rating: number
  comment: string
  avatar: string
  date: string
}

interface Props {
  review: Review
}

defineProps<Props>()
</script>
