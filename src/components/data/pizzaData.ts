import type { PizzaSize, CrustType, Topping } from '../../types'

export const pizzaSizes: PizzaSize[] = [
  {
    name: 'SMALL',
    price: 8.0,
    description: 'Perfect for 1-2 people • 10 inch',
  },
  {
    name: 'MEDIUM',
    price: 10.0,
    description: 'Great for 2-3 people • 12 inch',
  },
  {
    name: 'LARGE',
    price: 12.0,
    description: 'Ideal for 3-4 people • 14 inch',
  },
]

export const crustTypes: CrustType[] = [
  {
    name: 'THIN',
    price: 0.0,
    description: 'Crispy and light • Classic Italian style',
  },
  {
    name: 'THICK',
    price: 1.0,
    description: 'Fluffy and hearty • Deep dish style',
  },
  {
    name: 'STUFFED',
    price: 2.0,
    description: 'Cheese-filled crust • Ultimate indulgence',
  },
]

export const availableToppings: Topping[] = [
  {
    name: 'CHEESE',
    price: 1.0,
    description: 'Extra mozzarella cheese',
    icon: 'radix-icons:component-2',
  },
  {
    name: 'PEPPERONI',
    price: 1.5,
    description: 'Spicy Italian pepperoni',
    icon: 'radix-icons:dot-filled',
  },
  {
    name: 'MUSHROOM',
    price: 1.2,
    description: 'Fresh button mushrooms',
    icon: 'radix-icons:component-1',
  },
  {
    name: 'OLIVES',
    price: 1.3,
    description: 'Mediterranean black olives',
    icon: 'radix-icons:circle',
  },
  {
    name: 'ONION',
    price: 0.8,
    description: 'Sweet red onions',
    icon: 'radix-icons:target',
  },
  {
    name: 'BACON',
    price: 1.3,
    description: 'Crispy smoked bacon',
    icon: 'radix-icons:minus',
  },
]

// Helper functions for working with pizza data
export const getPizzaSizeByName = (name: string): PizzaSize | undefined => {
  return pizzaSizes.find((size) => size.name === name)
}

export const getCrustTypeByName = (name: string): CrustType | undefined => {
  return crustTypes.find((crust) => crust.name === name)
}

export const getToppingByName = (name: string): Topping | undefined => {
  return availableToppings.find((topping) => topping.name === name)
}

export const calculatePizzaPrice = (
  size: PizzaSize,
  crust: CrustType,
  toppings: Topping[],
): number => {
  const basePrice = size.price + crust.price
  const toppingsPrice = toppings.reduce((sum, topping) => sum + topping.price, 0)
  return basePrice + toppingsPrice
}

export const formatPizzaDescription = (
  size: PizzaSize,
  crust: CrustType,
  toppings: Topping[],
): string => {
  const toppingNames = toppings.map((t) => t.name).join(', ')
  return `${size.name} ${crust.name} pizza with ${toppingNames}`
}

// Validation functions
export const isValidPizzaConfiguration = (
  size: PizzaSize | null,
  crust: CrustType | null,
  toppings: Topping[],
  minToppings: number = 1,
): boolean => {
  return !!(size && crust && toppings.length >= minToppings)
}

export const getMaxToppingsForSize = (sizeName: string): number => {
  switch (sizeName) {
    case 'SMALL':
      return 4
    case 'MEDIUM':
      return 6
    case 'LARGE':
      return 8
    default:
      return 4
  }
}

// Default configurations
export const DEFAULT_PIZZA_CONFIG = {
  size: pizzaSizes[1], // Medium
  crust: crustTypes[0], // Thin
  toppings: [availableToppings[0]], // Cheese
}

export const PIZZA_CATEGORIES = {
  VEGETARIAN: ['CHEESE', 'MUSHROOM', 'OLIVES', 'ONION'],
  MEAT_LOVERS: ['PEPPERONI', 'BACON'],
  CLASSIC: ['CHEESE', 'PEPPERONI'],
} as const

export const getPizzaCategory = (toppings: Topping[]): string => {
  const toppingNames = toppings.map((t) => t.name)

  if (toppingNames.every((name) => PIZZA_CATEGORIES.VEGETARIAN.includes(name as any))) {
    return 'Vegetarian'
  }

  if (toppingNames.some((name) => PIZZA_CATEGORIES.MEAT_LOVERS.includes(name as any))) {
    return 'Meat Lovers'
  }

  if (toppingNames.every((name) => PIZZA_CATEGORIES.CLASSIC.includes(name as any))) {
    return 'Classic'
  }

  return 'Custom'
}
