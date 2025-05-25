<template>
  <div class="max-w-4xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Checkout</h2>
      <p class="text-gray-600 dark:text-gray-300">Enter your details to complete your order</p>
    </div>

    <form @submit.prevent="handleSubmit" class="grid lg:grid-cols-3 gap-8">
      <!-- Customer Information -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Contact Information -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Contact Information
          </h3>

          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                v-model="form.name"
                type="text"
                required
                class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                v-model="form.email"
                type="email"
                required
                class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone Number *
              </label>
              <input
                v-model="form.phone"
                type="tel"
                required
                class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>
        </div>

        <!-- Delivery Address -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Delivery Address</h3>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Street Address *
              </label>
              <input
                v-model="form.address"
                type="text"
                required
                class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="123 Main Street"
              />
            </div>

            <div class="grid md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  City *
                </label>
                <input
                  v-model="form.city"
                  type="text"
                  required
                  class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="City"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  State *
                </label>
                <select
                  v-model="form.state"
                  required
                  class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select State</option>
                  <option value="CA">California</option>
                  <option value="NY">New York</option>
                  <option value="TX">Texas</option>
                  <option value="FL">Florida</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ZIP Code *
                </label>
                <input
                  v-model="form.zipCode"
                  type="text"
                  required
                  class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="12345"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Payment Method -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Payment Method</h3>

          <div class="space-y-4">
            <div class="flex items-center space-x-3">
              <input
                id="card"
                v-model="form.paymentMethod"
                type="radio"
                value="card"
                class="w-4 h-4 text-orange-500 focus:ring-orange-500"
              />
              <label for="card" class="flex items-center space-x-2 cursor-pointer">
                <Icon icon="radix-icons:credit-card" class="w-5 h-5" />
                <span>Credit/Debit Card</span>
              </label>
            </div>

            <div class="flex items-center space-x-3">
              <input
                id="cash"
                v-model="form.paymentMethod"
                type="radio"
                value="cash"
                class="w-4 h-4 text-orange-500 focus:ring-orange-500"
              />
              <label for="cash" class="flex items-center space-x-2 cursor-pointer">
                <Icon icon="radix-icons:coin" class="w-5 h-5" />
                <span>Cash on Delivery</span>
              </label>
            </div>
          </div>

          <!-- Card Details (shown when card is selected) -->
          <div v-if="form.paymentMethod === 'card'" class="mt-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Card Number *
              </label>
              <input
                v-model="form.cardNumber"
                type="text"
                placeholder="1234 5678 9012 3456"
                class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Expiry Date *
                </label>
                <input
                  v-model="form.expiryDate"
                  type="text"
                  placeholder="MM/YY"
                  class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  CVV *
                </label>
                <input
                  v-model="form.cvv"
                  type="text"
                  placeholder="123"
                  class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Summary Sidebar -->
      <div class="lg:sticky lg:top-24">
        <CheckoutSummary @place-order="handleSubmit" @back="$emit('back')" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, defineEmits } from 'vue'
import { Icon } from '@iconify/vue'
import CheckoutSummary from '../checkout/CheckoutSummary.vue'
import type { Order, CustomerInfo } from '../../types'

defineEmits<{
  back: []
  'order-placed': [order: Order]
}>()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  paymentMethod: 'card',
  cardNumber: '',
  expiryDate: '',
  cvv: '',
})

const handleSubmit = () => {
  // Validate form
  if (!isFormValid()) {
    return
  }

  // Create customer info
  const customerInfo: CustomerInfo = {
    name: form.name,
    email: form.email,
    phone: form.phone,
    address: `${form.address}, ${form.city}, ${form.state} ${form.zipCode}`,
  }

  // Create order
  const order: Order = {
    id: `order-${Date.now()}`,
    pizzas: [], // This would come from the cart store
    totalAmount: 0, // This would be calculated
    customerInfo,
    status: 'pending',
    createdAt: new Date(),
  }

  $emit('order-placed', order)
}

const isFormValid = () => {
  const requiredFields = ['name', 'email', 'phone', 'address', 'city', 'state', 'zipCode']

  for (const field of requiredFields) {
    if (!form[field as keyof typeof form]) {
      return false
    }
  }

  if (form.paymentMethod === 'card') {
    const cardFields = ['cardNumber', 'expiryDate', 'cvv']
    for (const field of cardFields) {
      if (!form[field as keyof typeof form]) {
        return false
      }
    }
  }

  return true
}
</script>
