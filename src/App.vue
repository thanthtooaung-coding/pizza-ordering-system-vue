<template>
  <div
    class="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800"
  >
    <!-- Header -->
    <AppHeader
      :cart-count="cartStore.totalItems"
      :is-dark="isDark"
      @toggle-theme="toggleTheme"
      @view-cart="showCart = true"
    />

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <Transition name="fade" mode="out-in">
        <!-- Welcome Screen -->
        <WelcomeScreen
          v-if="currentStep === 'welcome'"
          @start-ordering="currentStep = 'configure'"
        />

        <!-- Pizza Configuration -->
        <PizzaConfigurator
          v-else-if="currentStep === 'configure'"
          @pizza-added="handlePizzaAdded"
          @back="currentStep = 'welcome'"
        />

        <!-- Order Summary -->
        <OrderSummary
          v-else-if="currentStep === 'summary'"
          :pizzas="cartStore.items"
          @back="currentStep = 'configure'"
          @checkout="currentStep = 'checkout'"
        />

        <!-- Checkout -->
        <CheckoutForm
          v-else-if="currentStep === 'checkout'"
          @back="currentStep = 'summary'"
          @order-placed="handleOrderPlaced"
        />

        <!-- Order Confirmation -->
        <OrderConfirmation
          v-else-if="currentStep === 'confirmation'"
          :order="completedOrder"
          @new-order="resetOrder"
        />
      </Transition>
    </main>

    <!-- Cart Sidebar -->
    <CartSidebar
      v-model:show="showCart"
      :items="cartStore.items"
      @checkout="handleCartCheckout"
      @remove-item="cartStore.removeItem"
      @update-quantity="cartStore.updateQuantity"
    />

    <!-- Loading Overlay -->
    <LoadingOverlay v-if="isLoading" />

    <!-- Notifications -->
    <NotificationContainer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, provide } from 'vue'
import { useCartStore } from './stores/cartStore'
import { useNotificationStore } from './stores/notificationStore'
import AppHeader from './components/layout/AppHeader.vue'
import WelcomeScreen from './components/screens/WelcomeScreen.vue'
import PizzaConfigurator from './components/screens/PizzaConfigurator.vue'
import OrderSummary from './components/screens/OrderSummary.vue'
import CheckoutForm from './components/screens/CheckoutForm.vue'
import OrderConfirmation from './components/screens/OrderConfirmation.vue'
import CartSidebar from './components/cart/CartSidebar.vue'
import LoadingOverlay from './components/ui/LoadingOverlay.vue'
import NotificationContainer from './components/ui/NotificationContainer.vue'
import type { Pizza, Order } from './types'

// Stores
const cartStore = useCartStore()
const notificationStore = useNotificationStore()

// Reactive state
const currentStep = ref<'welcome' | 'configure' | 'summary' | 'checkout' | 'confirmation'>(
  'welcome',
)
const showCart = ref(false)
const isDark = ref(false)
const isLoading = ref(false)
const completedOrder = ref<Order | null>(null)

// Provide global state
provide('isDark', isDark)
provide('isLoading', isLoading)

// Methods
const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

const handlePizzaAdded = (pizza: Pizza) => {
  cartStore.addItem(pizza)
  notificationStore.addNotification({
    type: 'success',
    title: 'Pizza Added!',
    message: `${pizza.size.name} ${pizza.crust.name} crust pizza added to cart`,
    duration: 3000,
  })
}

const handleCartCheckout = () => {
  showCart.value = false
  currentStep.value = 'summary'
}

const handleOrderPlaced = (order: Order) => {
  isLoading.value = true

  // Simulate order processing
  setTimeout(() => {
    completedOrder.value = order
    currentStep.value = 'confirmation'
    cartStore.clearCart()
    isLoading.value = false

    notificationStore.addNotification({
      type: 'success',
      title: 'Order Placed!',
      message: `Your order #${order.id} has been confirmed`,
      duration: 5000,
    })
  }, 2000)
}

const resetOrder = () => {
  currentStep.value = 'welcome'
  completedOrder.value = null
}

// Lifecycle
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
