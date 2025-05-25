<template>
  <aside class="w-64 border-r bg-card p-6">
    <nav class="space-y-2">
      <button
        v-for="item in navigation"
        :key="item.name"
        @click="$emit('tab-change', item.id)"
        :class="[
          'flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors',
          activeTab === item.id
            ? 'bg-primary text-primary-foreground'
            : 'hover:bg-accent hover:text-accent-foreground',
        ]"
      >
        <Icon :icon="item.icon" class="h-4 w-4" />
        <span>{{ item.name }}</span>
      </button>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface Props {
  navigation: any[]
  activeTab: string
}

defineProps<Props>()
defineEmits<{
  'tab-change': [tabId: string]
}>()
</script>
