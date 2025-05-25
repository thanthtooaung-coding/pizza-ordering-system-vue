<template>
  <div
    :class="[
      'max-w-sm w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden',
      getNotificationClass(notification.type),
    ]"
  >
    <div class="p-4">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <Icon
            :icon="getNotificationIcon(notification.type)"
            :class="['w-5 h-5', getIconClass(notification.type)]"
          />
        </div>
        <div class="ml-3 w-0 flex-1 pt-0.5">
          <p class="text-sm font-medium text-gray-900 dark:text-white">
            {{ notification.title }}
          </p>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {{ notification.message }}
          </p>
        </div>
        <div class="ml-4 flex-shrink-0 flex">
          <button
            @click="$emit('close', notification.id)"
            class="bg-white dark:bg-gray-800 rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            <Icon icon="radix-icons:cross-2" class="w-5 h-5" />
          </button>
        </div>
      </div>
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
}

interface Props {
  notification: Notification
}

defineProps<Props>()
defineEmits<{
  close: [id: string]
}>()

const getNotificationClass = (type: string) => {
  switch (type) {
    case 'success':
      return 'border-l-4 border-green-400'
    case 'error':
      return 'border-l-4 border-red-400'
    case 'warning':
      return 'border-l-4 border-yellow-400'
    case 'info':
      return 'border-l-4 border-blue-400'
    default:
      return 'border-l-4 border-gray-400'
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
      return 'text-green-400'
    case 'error':
      return 'text-red-400'
    case 'warning':
      return 'text-yellow-400'
    case 'info':
      return 'text-blue-400'
    default:
      return 'text-gray-400'
  }
}
</script>
