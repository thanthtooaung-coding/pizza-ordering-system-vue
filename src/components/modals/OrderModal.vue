<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    @click.self="$emit('close')"
  >
    <div class="w-full max-w-md rounded-lg border bg-card p-6 shadow-lg">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-medium">
          {{ editingOrder ? 'Edit Order' : 'Create New Order' }}
        </h3>
        <button
          @click="$emit('close')"
          class="rounded-md p-2 hover:bg-accent"
        >
          <Icon icon="radix-icons:cross-2" class="h-4 w-4" />
        </button>
      </div>

      <OrderForm
        :initial-data="initialFormData"
        @submit="handleSubmit"
        @cancel="$emit('close')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import OrderForm from '../OrderForm.vue'
import type { Order, OrderForm as OrderFormType } from '../../types'

interface Props {
  show: boolean
  editingOrder: Order | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
  save: [orderData: OrderFormType]
}>()

const initialFormData = computed(() => {
  if (props.editingOrder) {
    return {
      customerName: props.editingOrder.customer?.name || props.editingOrder.customerInfo?.name || '',
      customerEmail: props.editingOrder.customer?.email || props.editingOrder.customerInfo?.email || '',
      total: props.editingOrder.total || props.editingOrder.totalAmount || 0,
      status: (['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(props.editingOrder.status) 
        ? props.editingOrder.status 
        : 'pending') as 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
    }
  }
  return {
    customerName: '',
    customerEmail: '',
    total: 0,
    status: 'pending' as const
  }
})

const handleSubmit = (formData: OrderFormType) => {
  emit('save', formData)
}
</script>
