<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-24 overflow-hidden">
    <!-- Header with Animation -->
    <div class="text-center mb-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
        🍕 Your Pizza Preview
      </h3>
      <div class="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto"></div>
    </div>
    
    <!-- Enhanced Pizza Visual -->
    <div class="relative w-56 h-56 mx-auto mb-8">
      <!-- Pizza Base with Realistic Shadows -->
      <div class="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400 shadow-2xl transform rotate-12 animate-pulse"></div>
      <div class="absolute inset-2 rounded-full bg-gradient-to-br from-yellow-300 to-orange-300 shadow-inner">
        
        <!-- Crust indicator with enhanced styling -->
        <div v-if="crust" :class="[
          'absolute inset-0 rounded-full',
          getCrustBorderClass(crust.name)
        ]"></div>
        
        <!-- Enhanced Toppings with realistic positioning -->
        <div class="absolute inset-6 rounded-full overflow-hidden">
          <div
            v-for="(topping, index) in toppings"
            :key="`${topping.name}-${index}`"
            :class="[
              'absolute rounded-full shadow-sm animate-pulse',
              getToppingClass(topping.name),
              getToppingSize(index)
            ]"
            :style="getToppingPosition(index, toppings.length)"
          >
            <!-- Topping texture -->
            <div :class="[
              'absolute inset-0 rounded-full opacity-30',
              getToppingTexture(topping.name)
            ]"></div>
          </div>
        </div>

        <!-- Steam Effect -->
        <div class="absolute inset-0 pointer-events-none">
          <div
            v-for="steam in 3"
            :key="steam"
            :class="[
              'absolute w-1 h-8 bg-white/20 rounded-full animate-ping',
              getSteamPosition(steam)
            ]"
            :style="{ animationDelay: `${steam * 0.5}s` }"
          ></div>
        </div>
      </div>
      
      <!-- Size indicator with glow effect -->
      <div v-if="size" class="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
        <span class="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm px-4 py-2 rounded-full shadow-lg animate-bounce">
          {{ size.name }}
        </span>
      </div>

      <!-- Floating ingredients around pizza -->
      <div
        v-for="(topping, index) in toppings.slice(0, 4)"
        :key="`floating-${topping.name}`"
        :class="[
          'absolute w-6 h-6 rounded-full opacity-20 animate-float',
          getToppingColor(topping.name)
        ]"
        :style="getFloatingPosition(index)"
      ></div>
    </div>

    <!-- Enhanced Details Section -->
    <div class="space-y-4">
      <div v-if="size" class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <span class="text-gray-600 dark:text-gray-300 flex items-center">
          <Icon icon="radix-icons:size" class="w-4 h-4 mr-2" />
          Size:
        </span>
        <span class="font-semibold text-gray-900 dark:text-white">{{ size.name }}</span>
      </div>
      
      <div v-if="crust" class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <span class="text-gray-600 dark:text-gray-300 flex items-center">
          <Icon icon="radix-icons:layers" class="w-4 h-4 mr-2" />
          Crust:
        </span>
        <span class="font-semibold text-gray-900 dark:text-white">{{ crust.name }}</span>
      </div>
      
      <div v-if="toppings.length > 0" class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div class="flex items-center mb-2">
          <Icon icon="radix-icons:plus" class="w-4 h-4 mr-2 text-gray-600 dark:text-gray-300" />
          <span class="text-gray-600 dark:text-gray-300">Toppings:</span>
        </div>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="topping in toppings"
            :key="topping.name"
            class="text-xs bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900 dark:to-red-900 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full font-medium border border-orange-200 dark:border-orange-800"
          >
            {{ topping.name }}
          </span>
        </div>
      </div>
    </div>

    <!-- Enhanced Price Breakdown -->
    <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
      <div class="space-y-3 text-sm">
        <div v-if="size" class="flex justify-between items-center">
          <span class="text-gray-600 dark:text-gray-300">{{ size.name }} Pizza:</span>
          <span class="text-gray-900 dark:text-white font-medium">${{ size.price.toFixed(2) }}</span>
        </div>
        
        <div v-if="crust && crust.price > 0" class="flex justify-between items-center">
          <span class="text-gray-600 dark:text-gray-300">{{ crust.name }} Crust:</span>
          <span class="text-gray-900 dark:text-white font-medium">+${{ crust.price.toFixed(2) }}</span>
        </div>
        
        <div v-for="topping in toppings" :key="topping.name" class="flex justify-between items-center">
          <span class="text-gray-600 dark:text-gray-300">{{ topping.name }}:</span>
          <span class="text-gray-900 dark:text-white font-medium">+${{ topping.price.toFixed(2) }}</span>
        </div>
      </div>
      
      <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex justify-between items-center">
          <span class="text-lg font-bold text-gray-900 dark:text-white">Total:</span>
          <span class="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            ${{ totalPrice.toFixed(2) }}
          </span>
        </div>
      </div>

      <!-- Nutritional Info -->
      <div class="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
        <div class="flex items-center mb-2">
          <Icon icon="radix-icons:heart" class="w-4 h-4 mr-2 text-green-600" />
          <span class="text-sm font-medium text-green-700 dark:text-green-300">Nutritional Info</span>
        </div>
        <div class="grid grid-cols-2 gap-2 text-xs text-green-600 dark:text-green-400">
          <div>Calories: ~{{ calculateCalories() }}</div>
          <div>Protein: ~{{ calculateProtein() }}g</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { PizzaSize, CrustType, Topping } from '../../types'

interface Props {
  size: PizzaSize | null
  crust: CrustType | null
  toppings: Topping[]
  totalPrice: number
}

const props = defineProps<Props>()

const getCrustBorderClass = (crustName: string) => {
  switch (crustName.toLowerCase()) {
    case 'thin':
      return 'border-4 border-yellow-600'
    case 'thick':
      return 'border-8 border-yellow-700'
    case 'stuffed':
      return 'border-8 border-yellow-800 shadow-inner'
    default:
      return 'border-4 border-yellow-600'
  }
}

const getToppingClass = (toppingName: string) => {
  const colors = {
    'CHEESE': 'bg-gradient-to-br from-yellow-300 to-yellow-400',
    'PEPPERONI': 'bg-gradient-to-br from-red-500 to-red-600',
    'MUSHROOM': 'bg-gradient-to-br from-amber-700 to-amber-800',
    'OLIVES': 'bg-gradient-to-br from-green-700 to-green-800',
    'ONION': 'bg-gradient-to-br from-purple-300 to-purple-400',
    'BACON': 'bg-gradient-to-br from-orange-600 to-orange-700'
  }
  return colors[toppingName as keyof typeof colors] || 'bg-gray-400'
}

const getToppingColor = (toppingName: string) => {
  const colors = {
    'CHEESE': 'bg-yellow-300',
    'PEPPERONI': 'bg-red-500',
    'MUSHROOM': 'bg-amber-700',
    'OLIVES': 'bg-green-700',
    'ONION': 'bg-purple-300',
    'BACON': 'bg-orange-600'
  }
  return colors[toppingName as keyof typeof colors] || 'bg-gray-400'
}

const getToppingTexture = (toppingName: string) => {
  switch (toppingName) {
    case 'CHEESE':
      return 'bg-gradient-radial from-transparent to-yellow-500'
    case 'PEPPERONI':
      return 'bg-gradient-radial from-red-300 to-transparent'
    default:
      return 'bg-gradient-radial from-white to-transparent'
  }
}

const getToppingSize = (index: number) => {
  const sizes = ['w-3 h-3', 'w-4 h-4', 'w-3.5 h-3.5', 'w-2.5 h-2.5']
  return sizes[index % sizes.length]
}

const getToppingPosition = (index: number, total: number) => {
  const angle = (index / total) * 2 * Math.PI + Math.random() * 0.5
  const radius = 25 + Math.random() * 35
  const x = 50 + radius * Math.cos(angle)
  const y = 50 + radius * Math.sin(angle)
  
  return {
    left: `${Math.max(10, Math.min(85, x))}%`,
    top: `${Math.max(10, Math.min(85, y))}%`,
    animationDelay: `${index * 0.2}s`
  }
}

const getFloatingPosition = (index: number) => {
  const positions = [
    { left: '-10px', top: '20%', animationDelay: '0s' },
    { right: '-10px', top: '40%', animationDelay: '1s' },
    { left: '20%', top: '-10px', animationDelay: '2s' },
    { right: '20%', bottom: '-10px', animationDelay: '3s' }
  ]
  return positions[index] || {}
}

const getSteamPosition = (index: number) => {
  const positions = ['left-1/4', 'left-1/2', 'left-3/4']
  return positions[index - 1] || 'left-1/2'
}

const calculateCalories = () => {
  let calories = 200 // base
  if (props.size?.name === 'MEDIUM') calories += 100
  if (props.size?.name === 'LARGE') calories += 200
  if (props.crust?.name === 'THICK') calories += 50
  if (props.crust?.name === 'STUFFED') calories += 100
  calories += props.toppings.length * 30
  return calories
}

const calculateProtein = () => {
  let protein = 8 // base
  if (props.size?.name === 'MEDIUM') protein += 4
  if (props.size?.name === 'LARGE') protein += 8
  protein += props.toppings.filter(t => ['PEPPERONI', 'BACON'].includes(t.name)).length * 3
  return protein
}
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(180deg); }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

.bg-gradient-radial {
  background: radial-gradient(circle, var(--tw-gradient-stops));
}
</style>
