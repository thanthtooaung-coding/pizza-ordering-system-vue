import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Pizza, CartItem } from '../types'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const totalItems = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  const totalAmount = computed(() => {
    return items.value.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0)
  })

  const addItem = (pizza: Pizza) => {
    const cartItem: CartItem = {
      ...pizza,
      cartId: `cart-${Date.now()}-${Math.random()}`,
    }
    items.value.push(cartItem)
  }

  const removeItem = (cartId: string) => {
    const index = items.value.findIndex((item) => item.cartId === cartId)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  const updateQuantity = (cartId: string, quantity: number) => {
    const item = items.value.find((item) => item.cartId === cartId)
    if (item && quantity > 0) {
      item.quantity = quantity
    } else if (item && quantity <= 0) {
      removeItem(cartId)
    }
  }

  const clearCart = () => {
    items.value = []
  }

  return {
    items,
    totalItems,
    totalAmount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }
})
