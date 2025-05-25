<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold tracking-tight">Customers</h2>
      <p class="text-muted-foreground">Manage your customer database and relationships.</p>
    </div>

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <CustomerCard v-for="customer in customers" :key="customer.id" :customer="customer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomerCard from '../CustomerCard.vue'
import type { Customer } from '../../types'

interface Props {
  customers: Customer[]
}

defineProps<Props>()
</script>
