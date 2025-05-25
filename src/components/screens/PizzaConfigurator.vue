<template>
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Craft Your Perfect Pizza
      </h2>
      <p class="text-gray-600 dark:text-gray-300">
        Choose your size, crust, and toppings to create your masterpiece
      </p>
    </div>

    <!-- Progress Steps -->
    <div class="mb-8">
      <div class="flex items-center justify-center space-x-4">
        <StepIndicator
          v-for="(step, index) in steps"
          :key="step.id"
          :step="step"
          :is-active="currentStepIndex === index"
          :is-completed="currentStepIndex > index"
          @click="goToStep(index)"
        />
      </div>
    </div>

    <!-- Configuration Content -->
    <div class="grid lg:grid-cols-2 gap-8">
      <!-- Configuration Panel -->
      <div class="space-y-6">
        <Transition name="slide" mode="out-in">
          <!-- Size Selection -->
          <SizeSelector v-if="currentStep === 'size'" v-model="selectedSize" :sizes="pizzaSizes" />

          <!-- Crust Selection -->
          <CrustSelector
            v-else-if="currentStep === 'crust'"
            v-model="selectedCrust"
            :crusts="crustTypes"
          />

          <!-- Toppings Selection -->
          <ToppingsSelector
            v-else-if="currentStep === 'toppings'"
            v-model="selectedToppings"
            :toppings="availableToppings"
            :min-toppings="1"
          />
        </Transition>

        <!-- Navigation -->
        <div class="flex justify-between pt-6">
          <button
            v-if="currentStepIndex > 0"
            @click="previousStep"
            class="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Icon icon="radix-icons:arrow-left" class="w-4 h-4 mr-2" />
            Previous
          </button>

          <div class="ml-auto space-x-3">
            <button
              @click="$emit('back')"
              class="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Back to Home
            </button>

            <button
              v-if="currentStepIndex < steps.length - 1"
              @click="nextStep"
              :disabled="!canProceed"
              class="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <Icon icon="radix-icons:arrow-right" class="w-4 h-4 ml-2" />
            </button>

            <button
              v-else
              @click="addPizza"
              :disabled="!canAddPizza"
              class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Icon icon="radix-icons:plus" class="w-4 h-4 mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <!-- Pizza Preview -->
      <div class="lg:sticky lg:top-24">
        <PizzaPreview
          :size="selectedSize"
          :crust="selectedCrust"
          :toppings="selectedToppings"
          :total-price="totalPrice"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { pizzaSizes, crustTypes, availableToppings } from '../data/pizzaData'
import StepIndicator from '../ui/StepIndicator.vue'
import SizeSelector from '../configurator/SizeSelector.vue'
import CrustSelector from '../configurator/CrustSelector.vue'
import ToppingsSelector from '../configurator/ToppingsSelector.vue'
import PizzaPreview from '../configurator/PizzaPreview.vue'
import type { PizzaSize, CrustType, Topping, Pizza } from '../../types'

const emit = defineEmits<{
  'pizza-added': [pizza: Pizza]
  back: []
}>()

// Configuration steps
const steps = [
  { id: 'size', label: 'Size', icon: 'radix-icons:size' },
  { id: 'crust', label: 'Crust', icon: 'radix-icons:layers' },
  { id: 'toppings', label: 'Toppings', icon: 'radix-icons:plus' },
]

const currentStepIndex = ref(0)
const currentStep = computed(() => steps[currentStepIndex.value]?.id)

// Selected options
const selectedSize = ref<PizzaSize | null>(null)
const selectedCrust = ref<CrustType | null>(null)
const selectedToppings = ref<Topping[]>([])

// Computed properties
const totalPrice = computed(() => {
  let price = 0
  if (selectedSize.value) price += selectedSize.value.price
  if (selectedCrust.value) price += selectedCrust.value.price
  price += selectedToppings.value.reduce((sum, topping) => sum + topping.price, 0)
  return price
})

const canProceed = computed(() => {
  switch (currentStep.value) {
    case 'size':
      return selectedSize.value !== null
    case 'crust':
      return selectedCrust.value !== null
    case 'toppings':
      return selectedToppings.value.length >= 1
    default:
      return false
  }
})

const canAddPizza = computed(() => {
  return selectedSize.value && selectedCrust.value && selectedToppings.value.length >= 1
})

// Methods
const goToStep = (index: number) => {
  if (index <= currentStepIndex.value || canProceed.value) {
    currentStepIndex.value = index
  }
}

const nextStep = () => {
  if (canProceed.value && currentStepIndex.value < steps.length - 1) {
    currentStepIndex.value++
  }
}

const previousStep = () => {
  if (currentStepIndex.value > 0) {
    currentStepIndex.value--
  }
}

const addPizza = () => {
  if (!canAddPizza.value) return

  const pizza: Pizza = {
    id: `pizza-${Date.now()}`,
    size: selectedSize.value!,
    crust: selectedCrust.value!,
    toppings: [...selectedToppings.value],
    quantity: 1,
    totalPrice: totalPrice.value,
  }

  emit('pizza-added', pizza)
  resetConfiguration()
}

const resetConfiguration = () => {
  selectedSize.value = null
  selectedCrust.value = null
  selectedToppings.value = []
  currentStepIndex.value = 0
}

// Auto-advance when selections are made
watch(selectedSize, (newSize) => {
  if (newSize && currentStep.value === 'size') {
    setTimeout(() => nextStep(), 500)
  }
})

watch(selectedCrust, (newCrust) => {
  if (newCrust && currentStep.value === 'crust') {
    setTimeout(() => nextStep(), 500)
  }
})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
