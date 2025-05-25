<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label class="text-sm font-medium">Customer Name</label>
      <input
        v-model="form.customerName"
        type="text"
        required
        class="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>

    <div>
      <label class="text-sm font-medium">Customer Email</label>
      <input
        v-model="form.customerEmail"
        type="email"
        required
        class="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>

    <div>
      <label class="text-sm font-medium">Total Amount</label>
      <input
        v-model.number="form.total"
        type="number"
        step="0.01"
        required
        class="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>

    <div>
      <label class="text-sm font-medium">Status</label>
      <select
        v-model="form.status"
        class="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <option value="pending">Pending</option>
        <option value="processing">Processing</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </div>

    <div class="flex justify-end space-x-2 pt-4">
      <button
        type="button"
        @click="$emit('cancel')"
        class="rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-accent"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
      >
        {{ initialData.customerName ? 'Update' : 'Create' }} Order
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { OrderForm } from '../types'

interface Props {
  initialData: OrderForm
}

const props = defineProps<Props>()

const emit = defineEmits<{
  submit: [formData: OrderForm]
  cancel: []
}>()

const form = reactive<OrderForm>({
  customerName: '',
  customerEmail: '',
  total: 0,
  status: 'pending',
})

// Watch for changes in initialData and update form
watch(
  () => props.initialData,
  (newData) => {
    Object.assign(form, newData)
  },
  { immediate: true },
)

const handleSubmit = () => {
  emit('submit', { ...form })
}
</script>
