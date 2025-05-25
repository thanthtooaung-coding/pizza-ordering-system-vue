<template>
  <div class="text-center group">
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div :class="['text-4xl font-bold mb-2', stat.color]">
        {{ displayValue }}{{ stat.suffix }}
      </div>
      <div class="text-gray-600 dark:text-gray-300 font-medium">
        {{ stat.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

interface Stat {
  label: string
  target: number
  suffix: string
  color: string
}

interface Props {
  stat: Stat
  target: number
}

const props = defineProps<Props>()

const displayValue = ref(0)

const animateCounter = () => {
  const duration = 2000
  const steps = 60
  const increment = props.target / steps
  const interval = duration / steps

  let current = 0
  const timer = setInterval(() => {
    current += increment
    if (current >= props.target) {
      displayValue.value = props.target
      clearInterval(timer)
    } else {
      displayValue.value = Math.floor(current * 10) / 10
    }
  }, interval)
}

onMounted(() => {
  // Start animation after a short delay
  setTimeout(animateCounter, 500)
})
</script>
