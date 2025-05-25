<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Choose Your Toppings</h3>
      <div class="text-sm text-gray-600 dark:text-gray-300">
        {{ modelValue.length }} selected (min {{ minToppings }})
      </div>
    </div>

    <div class="grid sm:grid-cols-2 gap-3">
      <div
        v-for="topping in toppings"
        :key="topping.name"
        @click="toggleTopping(topping)"
        :class="[
          'p-3 border-2 rounded-lg cursor-pointer transition-all duration-300',
          isSelected(topping)
            ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
            : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600',
        ]"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div
              :class="[
                'w-10 h-10 rounded-lg flex items-center justify-center',
                getToppingIconClass(topping.name),
              ]"
            >
              <Icon :icon="topping.icon" class="w-5 h-5" />
            </div>
            <div>
              <h4 class="font-medium text-gray-900 dark:text-white">
                {{ topping.name }}
              </h4>
              <p class="text-xs text-gray-600 dark:text-gray-300">
                {{ topping.description }}
              </p>
            </div>
          </div>
          <div class="text-right">
            <div class="text-sm font-bold text-orange-500">+${{ topping.price.toFixed(2) }}</div>
            <div v-if="isSelected(topping)" class="text-green-500 text-xs">
              <Icon icon="radix-icons:check" class="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="modelValue.length < minToppings"
      class="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg"
    >
      <Icon icon="radix-icons:exclamation-triangle" class="w-4 h-4 mr-2" />
      Please select at least {{ minToppings }} topping{{ minToppings > 1 ? 's' : '' }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { Topping } from '../../types'

interface Props {
  modelValue: Topping[]
  toppings: Topping[]
  minToppings: number
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [toppings: Topping[]]
}>()

const isSelected = (topping: Topping) => {
  return props.modelValue.some((t) => t.name === topping.name)
}

const toggleTopping = (topping: Topping) => {
  const currentToppings = [...props.modelValue]
  const index = currentToppings.findIndex((t) => t.name === topping.name)

  if (index > -1) {
    currentToppings.splice(index, 1)
  } else {
    currentToppings.push(topping)
  }

  emit('update:modelValue', currentToppings)
}

const getToppingIconClass = (toppingName: string) => {
  const colors = {
    CHEESE: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600',
    PEPPERONI: 'bg-red-100 dark:bg-red-900 text-red-600',
    MUSHROOM: 'bg-brown-100 dark:bg-brown-900 text-brown-600',
    OLIVES: 'bg-green-100 dark:bg-green-900 text-green-600',
    ONION: 'bg-purple-100 dark:bg-purple-900 text-purple-600',
    BACON: 'bg-orange-100 dark:bg-orange-900 text-orange-600',
  }
  return colors[toppingName as keyof typeof colors] || 'bg-gray-100 dark:bg-gray-900 text-gray-600'
}
</script>
