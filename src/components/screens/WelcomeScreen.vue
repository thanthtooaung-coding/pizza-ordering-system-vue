<template>
  <div class="text-center max-w-6xl mx-auto">
    <!-- Hero Section with Enhanced Animation -->
    <div class="mb-16 relative">
      <!-- Floating Pizza Background -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          v-for="i in 6"
          :key="i"
          :class="[
            'absolute w-8 h-8 rounded-full bg-gradient-to-br from-orange-300 to-red-400 opacity-10',
            `animate-float-${i}`
          ]"
          :style="getFloatingStyle(i)"
        ></div>
      </div>

      <div class="relative mb-8">
        <div class="w-40 h-40 mx-auto bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden">
          <!-- Animated Pizza Slice -->
          <div class="absolute inset-0 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full animate-spin-slow"></div>
          <Icon icon="radix-icons:slice" class="w-20 h-20 text-white relative z-10 animate-bounce" />
          
          <!-- Sparkle Effects -->
          <div
            v-for="sparkle in 8"
            :key="sparkle"
            :class="[
              'absolute w-2 h-2 bg-white rounded-full animate-ping',
              `sparkle-${sparkle}`
            ]"
            :style="getSparkleStyle(sparkle)"
          ></div>
        </div>
        
        <!-- Pulsing Ring -->
        <div class="absolute inset-0 w-40 h-40 mx-auto bg-gradient-to-br from-orange-400 to-red-500 rounded-full animate-ping opacity-20"></div>
      </div>
      
      <h1 class="text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
        Welcome to
        <span class="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
          PizzaCraft
        </span>
      </h1>
      
      <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
        Craft your perfect pizza with premium ingredients and artisan techniques. 
        Every bite is a masterpiece waiting to be created.
      </p>

      <!-- Special Offer Banner -->
      <div class="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full inline-block mb-8 animate-pulse">
        <span class="font-semibold">🎉 Special Offer: 20% OFF on orders over $30!</span>
      </div>
    </div>

    <!-- Enhanced Features Grid -->
    <div class="grid md:grid-cols-3 gap-8 mb-16">
      <FeatureCard
        v-for="(feature, index) in features"
        :key="feature.title"
        :feature="feature"
        :delay="index * 100"
      />
    </div>

    <!-- Popular Pizzas Preview -->
    <div class="mb-16">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        🔥 Most Popular Pizzas
      </h2>
      <div class="grid md:grid-cols-3 gap-6">
        <PopularPizzaCard
          v-for="pizza in popularPizzas"
          :key="pizza.name"
          :pizza="pizza"
          @quick-add="handleQuickAdd"
        />
      </div>
    </div>

    <!-- Enhanced CTA Section -->
    <div class="space-y-6 mb-16">
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          @click="$emit('start-ordering')"
          class="group relative px-10 py-4 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden border-0"
        >
          <span class="relative z-10 flex items-center space-x-3">
            <Icon icon="radix-icons:plus" class="w-6 h-6" />
            <span>Start Crafting Your Pizza</span>
            <Icon icon="radix-icons:arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
          <div class="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <!-- Animated Background -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>
        </button>

        <button
          @click="showMenu = true"
          class="px-8 py-4 bg-transparent border-2 border-orange-500 text-orange-500 dark:text-orange-400 font-semibold rounded-2xl hover:bg-orange-500 hover:text-white dark:hover:text-white transition-all duration-300"
        >
          <Icon icon="radix-icons:hamburger-menu" class="w-5 h-5 mr-2 inline" />
          View Full Menu
        </button>
      </div>
      
      <div class="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
        <div class="flex items-center space-x-2">
          <Icon icon="radix-icons:rocket" class="w-4 h-4 text-green-500" />
          <span>Free delivery on orders over $25</span>
        </div>
        <div class="flex items-center space-x-2">
          <Icon icon="radix-icons:timer" class="w-4 h-4 text-blue-500" />
          <span>Ready in 15-20 minutes</span>
        </div>
        <div class="flex items-center space-x-2">
          <Icon icon="radix-icons:star-filled" class="w-4 h-4 text-yellow-500" />
          <span>4.9/5 rating</span>
        </div>
      </div>
    </div>

    <!-- Enhanced Stats with Animation -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16">
      <StatCounter
        v-for="stat in stats"
        :key="stat.label"
        :stat="stat"
        :target="stat.target"
      />
    </div>

    <!-- Customer Reviews -->
    <div class="mb-16">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        ⭐ What Our Customers Say
      </h2>
      <div class="grid md:grid-cols-3 gap-6">
        <ReviewCard
          v-for="review in customerReviews"
          :key="review.id"
          :review="review"
        />
      </div>
    </div>

    <!-- Newsletter Signup -->
    <div class="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 text-white">
      <h3 class="text-2xl font-bold mb-4">🍕 Stay Updated!</h3>
      <p class="mb-6">Get exclusive offers, new pizza alerts, and cooking tips!</p>
      <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <input
          v-model="email"
          type="email"
          placeholder="Enter your email"
          class="flex-1 px-4 py-3 rounded-xl text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30"
        />
        <button
          @click="subscribeNewsletter"
          class="px-6 py-3 bg-white text-orange-500 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
        >
          Subscribe
        </button>
      </div>
    </div>

    <!-- Menu Modal -->
    <MenuModal v-model:show="showMenu" @add-to-cart="handleQuickAdd" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { useCartStore } from '../../stores/cartStore'
import { useNotificationStore } from '../../stores/notificationStore'
import FeatureCard from '../ui/FeatureCard.vue'
import PopularPizzaCard from '../ui/PopularPizzaCard.vue'
import StatCounter from '../ui/StatCounter.vue'
import ReviewCard from '../ui/ReviewCard.vue'
import MenuModal from '../modals/MenuModal.vue'
import type { Pizza } from '../../types'

defineEmits<{
  'start-ordering': []
}>()

const email = ref('')
const showMenu = ref(false)
const cartStore = useCartStore()
const notificationStore = useNotificationStore()

const features = [
  {
    icon: 'radix-icons:gear',
    title: 'Custom Built',
    description: 'Choose from 3 sizes, 3 crust types, and 12 premium toppings',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: 'radix-icons:timer',
    title: 'Lightning Fast',
    description: 'Fresh, hot pizza delivered to your door in 15-20 minutes',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: 'radix-icons:star',
    title: 'Premium Quality',
    description: 'Only the finest ingredients and traditional cooking methods',
    color: 'from-purple-500 to-pink-500'
  }
]

const popularPizzas = [
  {
    name: 'Margherita Supreme',
    description: 'Fresh mozzarella, basil, premium tomato sauce',
    price: 18.99,
    image: '/placeholder.svg?height=200&width=200',
    rating: 4.9,
    orders: 1247
  },
  {
    name: 'Meat Lovers Deluxe',
    description: 'Pepperoni, sausage, bacon, ham, ground beef',
    price: 24.99,
    image: '/placeholder.svg?height=200&width=200',
    rating: 4.8,
    orders: 892
  },
  {
    name: 'Veggie Garden',
    description: 'Bell peppers, mushrooms, olives, onions, tomatoes',
    price: 21.99,
    image: '/placeholder.svg?height=200&width=200',
    rating: 4.7,
    orders: 634
  }
]

const stats = [
  { label: 'Pizzas Crafted', target: 15247, suffix: '+', color: 'text-orange-500' },
  { label: 'Happy Customers', target: 8924, suffix: '+', color: 'text-green-500' },
  { label: 'Average Rating', target: 4.9, suffix: '/5', color: 'text-yellow-500' },
  { label: 'Delivery Time', target: 18, suffix: ' min', color: 'text-blue-500' }
]

const customerReviews = [
  {
    id: 1,
    name: 'Sarah Johnson',
    rating: 5,
    comment: 'Best pizza in town! The crust is perfectly crispy and the toppings are fresh.',
    avatar: '/placeholder.svg?height=50&width=50',
    date: '2 days ago'
  },
  {
    id: 2,
    name: 'Mike Chen',
    rating: 5,
    comment: 'Lightning fast delivery and amazing taste. Will definitely order again!',
    avatar: '/placeholder.svg?height=50&width=50',
    date: '1 week ago'
  },
  {
    id: 3,
    name: 'Emily Davis',
    rating: 4,
    comment: 'Great variety of toppings and the customization options are fantastic.',
    avatar: '/placeholder.svg?height=50&width=50',
    date: '2 weeks ago'
  }
]

const getFloatingStyle = (index: number) => {
  const positions = [
    { left: '10%', top: '20%' },
    { right: '15%', top: '30%' },
    { left: '20%', bottom: '25%' },
    { right: '25%', bottom: '35%' },
    { left: '5%', top: '60%' },
    { right: '10%', top: '70%' }
  ]
  return positions[index - 1] || {}
}

const getSparkleStyle = (index: number) => {
  const angle = (index / 8) * 360
  const radius = 80
  const x = 50 + radius * Math.cos((angle * Math.PI) / 180)
  const y = 50 + radius * Math.sin((angle * Math.PI) / 180)
  
  return {
    left: `${x}%`,
    top: `${y}%`,
    animationDelay: `${index * 0.2}s`
  }
}

const handleQuickAdd = (pizza: any) => {
  // Convert menu item to pizza format
  const pizzaItem: Pizza = {
    id: `pizza-${Date.now()}`,
    size: { name: 'MEDIUM', price: 10.0, description: 'Great for 2-3 people • 12 inch' },
    crust: { name: 'THIN', price: 0.0, description: 'Crispy and light • Classic Italian style' },
    toppings: [
      { name: 'CHEESE', price: 1.0, description: 'Extra mozzarella cheese', icon: 'radix-icons:component-2' }
    ],
    quantity: 1,
    totalPrice: pizza.price
  }

  cartStore.addItem(pizzaItem)
  
  notificationStore.addNotification({
    type: 'success',
    title: 'Added to Cart! 🍕',
    message: `${pizza.name} added successfully`,
    duration: 3000
  })
}

const subscribeNewsletter = () => {
  if (email.value) {
    notificationStore.addNotification({
      type: 'success',
      title: 'Subscribed! 📧',
      message: 'Welcome to our newsletter!',
      duration: 3000
    })
    email.value = ''
  }
}
</script>

<style scoped>
@keyframes float-1 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(180deg); } }
@keyframes float-2 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-15px) rotate(-180deg); } }
@keyframes float-3 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-25px) rotate(90deg); } }
@keyframes float-4 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-18px) rotate(-90deg); } }
@keyframes float-5 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-22px) rotate(270deg); } }
@keyframes float-6 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-16px) rotate(-270deg); } }

.animate-float-1 { animation: float-1 6s ease-in-out infinite; }
.animate-float-2 { animation: float-2 8s ease-in-out infinite; }
.animate-float-3 { animation: float-3 7s ease-in-out infinite; }
.animate-float-4 { animation: float-4 9s ease-in-out infinite; }
.animate-float-5 { animation: float-5 5s ease-in-out infinite; }
.animate-float-6 { animation: float-6 10s ease-in-out infinite; }

@keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.animate-spin-slow { animation: spin-slow 20s linear infinite; }

@keyframes gradient { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
.animate-gradient { background-size: 200% 200%; animation: gradient 3s ease infinite; }

.sparkle-1 { animation-delay: 0s; }
.sparkle-2 { animation-delay: 0.2s; }
.sparkle-3 { animation-delay: 0.4s; }
.sparkle-4 { animation-delay: 0.6s; }
.sparkle-5 { animation-delay: 0.8s; }
.sparkle-6 { animation-delay: 1s; }
.sparkle-7 { animation-delay: 1.2s; }
.sparkle-8 { animation-delay: 1.4s; }
</style>
