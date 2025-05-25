<template>
  <div class="max-w-2xl mx-auto text-center">
    <!-- Success Animation -->
    <div class="mb-8">
      <div class="relative w-24 h-24 mx-auto mb-6">
        <div
          class="w-full h-full bg-green-500 rounded-full flex items-center justify-center animate-pulse"
        >
          <Icon icon="radix-icons:check" class="w-12 h-12 text-white" />
        </div>
        <div
          class="absolute inset-0 w-full h-full bg-green-500 rounded-full animate-ping opacity-20"
        ></div>
      </div>

      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Order Confirmed!</h2>

      <p class="text-gray-600 dark:text-gray-300 mb-6">
        Thank you for your order. We're preparing your delicious pizzas!
      </p>
    </div>

    <!-- Order Details -->
    <div v-if="order" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
      <div class="grid md:grid-cols-2 gap-6 text-left">
        <!-- Order Info -->
        <div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-3">Order Details</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-300">Order ID:</span>
              <span class="font-medium text-gray-900 dark:text-white">{{ order.id }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-300">Status:</span>
              <span
                class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium"
              >
                {{ order.status.toUpperCase() }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-300">Total:</span>
              <span class="font-bold text-orange-500">
                ${{ (order?.totalAmount ?? 0).toFixed(2) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Delivery Info -->
        <div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-3">Delivery Information</h3>
          <div class="space-y-2 text-sm">
            <div>
              <span class="text-gray-600 dark:text-gray-300">Delivering to:</span>
              <div class="font-medium text-gray-900 dark:text-white">
                {{ order.customerInfo.name }}
              </div>
              <div class="text-gray-600 dark:text-gray-300">{{ order.customerInfo.address }}</div>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-300">Phone:</span>
              <span class="font-medium text-gray-900 dark:text-white">{{
                order.customerInfo.phone
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Estimated Time -->
    <div
      class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8"
    >
      <div class="flex items-center justify-center space-x-3 mb-3">
        <Icon icon="radix-icons:timer" class="w-6 h-6 text-blue-600" />
        <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100">
          Estimated Delivery Time
        </h3>
      </div>
      <div class="text-2xl font-bold text-blue-600 mb-2">25-35 minutes</div>
      <p class="text-sm text-blue-700 dark:text-blue-300">
        We'll send you updates via SMS and email
      </p>
    </div>

    <!-- Order Tracking -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Progress</h3>

      <div class="flex items-center justify-between">
        <OrderStep
          icon="radix-icons:check-circled"
          label="Order Received"
          :completed="true"
          :active="false"
        />
        <div class="flex-1 h-0.5 bg-orange-200 mx-2"></div>
        <OrderStep icon="radix-icons:gear" label="Preparing" :completed="false" :active="true" />
        <div class="flex-1 h-0.5 bg-gray-200 mx-2"></div>
        <OrderStep
          icon="radix-icons:rocket"
          label="Out for Delivery"
          :completed="false"
          :active="false"
        />
        <div class="flex-1 h-0.5 bg-gray-200 mx-2"></div>
        <OrderStep icon="radix-icons:home" label="Delivered" :completed="false" :active="false" />
      </div>
    </div>

    <!-- Actions -->
    <div class="space-y-4">
      <button
        @click="$emit('new-order')"
        class="px-8 py-3 bg-orange-500 text-white font-semibold rounded-xl shadow-lg hover:bg-orange-600 transform hover:scale-105 transition-all duration-300"
      >
        <Icon icon="radix-icons:plus" class="w-5 h-5 mr-2" />
        Order Another Pizza
      </button>

      <div class="text-sm text-gray-500 dark:text-gray-400">
        Questions about your order? Call us at (555) 123-PIZZA
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import OrderStep from '../ui/OrderStep.vue'
import type { Order } from '../../types'

interface Props {
  order: Order | null
}

defineProps<Props>()
defineEmits<{
  'new-order': []
}>()
</script>
