<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="flex items-center space-x-2 rounded-md p-2 hover:bg-accent"
    >
      <Icon icon="radix-icons:person" class="h-5 w-5" />
      <span class="text-sm font-medium">{{ user?.name }}</span>
      <Icon icon="radix-icons:chevron-down" class="h-4 w-4" />
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-48 rounded-md border bg-popover p-1 shadow-md"
      @click.stop
    >
      <div class="px-2 py-1.5 text-sm font-medium">{{ user.name }}</div>
      <div class="px-2 py-1.5 text-xs text-muted-foreground">{{ user.email }}</div>
      <div class="my-1 h-px bg-border"></div>
      <button class="w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent">
        Profile
      </button>
      <button class="w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent">
        Settings
      </button>
      <div class="my-1 h-px bg-border"></div>
      <button class="w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent">
        Sign out
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'

interface Props {
  user: {
    name: string
    email: string
  }
}

defineProps<Props>()

const isOpen = ref(false)

const closeDropdown = (event: Event) => {
  if (!(event.target as Element).closest('.relative')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>
