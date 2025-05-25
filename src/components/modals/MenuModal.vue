<template>
  <Transition name="modal">
    <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" @click="$emit('update:show', false)"></div>
      
      <!-- Modal -->
      <div class="relative min-h-screen flex items-center justify-center p-4">
        <div class="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
          <!-- Header -->
          <div class="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6 z-10">
            <div class="flex items-center justify-between">
              <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
                🍕 Our Full Menu
              </h2>
              <button
                @click="$emit('update:show', false)"
                class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                <Icon icon="radix-icons:cross-2" class="w-6 h-6" />
              </button>
            </div>
            
            <!-- Category Tabs -->
            <div class="flex space-x-4 mt-4 overflow-x-auto">
              <button
                v-for="category in categories"
                :key="category"
                @click="activeCategory = category"
                :class="[
                  'px-6 py-3 rounded-full font-medium transition-all duration-300 whitespace-nowrap',
                  activeCategory === category
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400'
                ]"
              >
                {{ category }}
              </button>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <MenuItemCard
                v-for="item in filteredItems"
                :key="item.id"
                :item="item"
                @add-to-cart="$emit('add-to-cart', $event)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import MenuItemCard from '../ui/MenuItemCard.vue'

interface Props {
  show: boolean
}

defineProps<Props>()
defineEmits<{
  'update:show': [show: boolean]
  'add-to-cart': [item: any]
}>()

const activeCategory = ref('Pizzas')
const categories = ['Pizzas', 'Sides', 'Drinks', 'Desserts']

const menuItems = [
  // Pizzas
  { id: 1, category: 'Pizzas', name: 'Margherita Supreme', description: 'Fresh mozzarella, basil, premium tomato sauce', price: 18.99, image: '/placeholder.svg?height=200&width=200', popular: true },
  { id: 2, category: 'Pizzas', name: 'Meat Lovers Deluxe', description: 'Pepperoni, sausage, bacon, ham, ground beef', price: 24.99, image: '/placeholder.svg?height=200&width=200', popular: true },
  { id: 3, category: 'Pizzas', name: 'Veggie Garden', description: 'Bell peppers, mushrooms, olives, onions, tomatoes', price: 21.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 4, category: 'Pizzas', name: 'BBQ Chicken', description: 'Grilled chicken, BBQ sauce, red onions, cilantro', price: 22.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 5, category: 'Pizzas', name: 'Hawaiian Paradise', description: 'Ham, pineapple, mozzarella, tomato sauce', price: 20.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 6, category: 'Pizzas', name: 'Spicy Pepperoni', description: 'Double pepperoni, jalapeños, hot sauce drizzle', price: 23.99, image: '/placeholder.svg?height=200&width=200' },
  
  // Sides
  { id: 7, category: 'Sides', name: 'Garlic Breadsticks', description: 'Fresh baked breadsticks with garlic butter', price: 7.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 8, category: 'Sides', name: 'Mozzarella Sticks', description: 'Crispy breaded mozzarella with marinara sauce', price: 9.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 9, category: 'Sides', name: 'Buffalo Wings', description: '8 pieces with your choice of sauce', price: 12.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 10, category: 'Sides', name: 'Caesar Salad', description: 'Fresh romaine, parmesan, croutons, caesar dressing', price: 8.99, image: '/placeholder.svg?height=200&width=200' },
  
  // Drinks
  { id: 11, category: 'Drinks', name: 'Coca-Cola', description: 'Classic refreshing cola', price: 2.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 12, category: 'Drinks', name: 'Fresh Lemonade', description: 'House-made with real lemons', price: 3.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 13, category: 'Drinks', name: 'Craft Beer', description: 'Local brewery selection', price: 5.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 14, category: 'Drinks', name: 'Italian Soda', description: 'Sparkling water with fruit syrup', price: 3.49, image: '/placeholder.svg?height=200&width=200' },
  
  // Desserts
  { id: 15, category: 'Desserts', name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with molten center', price: 6.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 16, category: 'Desserts', name: 'Tiramisu', description: 'Classic Italian coffee-flavored dessert', price: 7.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 17, category: 'Desserts', name: 'Gelato Trio', description: 'Three scoops of artisan gelato', price: 8.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 18, category: 'Desserts', name: 'Cannoli', description: 'Sicilian pastry with sweet ricotta filling', price: 5.99, image: '/placeholder.svg?height=200&width=200' }
]

const filteredItems = computed(() => {
  return menuItems.filter(item => item.category === activeCategory.value)
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
