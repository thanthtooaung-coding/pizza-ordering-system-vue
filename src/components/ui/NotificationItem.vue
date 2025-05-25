<template>
  <div :class="[
    'max-w-sm w-full bg-white dark:bg-gray-800 shadow-xl rounded-xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 overflow-hidden transform transition-all duration-300',
    getNotificationClass(notification.type)
  ]">
    <div class="p-4">
      <div class="flex items-start space-x-3">
        <div class="flex-shrink-0">
          <div :class="[
            'w-8 h-8 rounded-full flex items-center justify-center',
            getIconBackgroundClass(notification.type)
          ]">
            <Icon :icon="getNotificationIcon(notification.type)" :class="[
              'w-4 h-4',
              getIconClass(notification.type)
            ]" />
          </div>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold text-gray-900 dark:text-white break-words">
            {{ notification.title }}
          </p>
          <p class="mt-1 text-sm text-gray-600 dark:text-gray-300 break-words leading-relaxed">
            {{ notification.message }}
          </p>
        </div>
        <div class="flex-shrink-0">
          <button
            @click="$emit('close', notification.id)"
            class="bg-white dark:bg-gray-800 rounded-md inline-flex text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors p-1"
          >
            <Icon icon="radix-icons:cross-2" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
    
    <!-- Progress bar for auto-dismiss -->
    <div v-if="notification.duration" class="h-1 bg-gray-200 dark:bg-gray-700">
      <div 
        :class="[
          'h-full transition-all ease-linear',
          getProgressBarClass(notification.type)
        ]"
        :style="{ 
          width: '100%',
          animation: `shrink ${notification.duration}ms linear forwards`
        }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
}

interface Props {
  notification: Notification
}

defineProps<Props>()
defineEmits<{
  'close': [id: string]
}>()

const getNotificationClass = (type: string) => {
  switch (type) {
    case 'success':
      return 'border-l-4 border-green-500'
    case 'error':
      return 'border-l-4 border-red-500'
    case 'warning':
      return 'border-l-4 border-yellow-500'
    case 'info':
      return 'border-l-4 border-blue-500'
    default:
      return 'border-l-4 border-gray-500'
  }
}

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'success':
      return 'radix-icons:check-circled'
    case 'error':
      return 'radix-icons:cross-circled'
    case 'warning':
      return 'radix-icons:exclamation-triangle'
    case 'info':
      return 'radix-icons:info-circled'
    default:
      return 'radix-icons:info-circled'
  }
}

const getIconClass = (type: string) => {
  switch (type) {
    case 'success':
      return 'text-white'
    case 'error':
      return 'text-white'
    case 'warning':
      return 'text-white'
    case 'info':
      return 'text-white'
    default:
      return 'text-white'
  }
}

const getIconBackgroundClass = (type: string) => {
  switch (type) {
    case 'success':
      return 'bg-green-500'
    case 'error':
      return 'bg-red-500'
    case 'warning':
      return 'bg-yellow-500'
    case 'info':
      return 'bg-blue-500'
    default:
      return 'bg-gray-500'
  }
}

const getProgressBarClass = (type: string) => {
  switch (type) {
    case 'success':
      return 'bg-green-500'
    case 'error':
      return 'bg-red-500'
    case 'warning':
      return 'bg-yellow-500'
    case 'info':
      return 'bg-blue-500'
    default:
      return 'bg-gray-500'
  }
}
</script>

<style scoped>
@keyframes shrink {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}
</style>
