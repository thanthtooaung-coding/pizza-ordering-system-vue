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


export interface PizzaSize {
  name: string
  price: number
  description: string
}

export interface CrustType {
  name: string
  price: number
  description: string
}

export interface Topping {
  name: string
  price: number
  description: string
  icon: string
}

export interface Pizza {
  id: string
  size: PizzaSize
  crust: CrustType
  toppings: Topping[]
  quantity: number
  totalPrice: number
}

export interface CustomerInfo {
  name: string
  email: string
  phone: string
  address: string
}

export interface CartItem extends Pizza {
  cartId: string
}

// Unified Order interface that works for both systems
export interface Order {
  id: string | number
  pizzas?: Pizza[] // For pizza ordering system
  totalAmount?: number // For pizza ordering system
  customerInfo?: CustomerInfo // For pizza ordering system

  // Legacy order management fields
  customer?: {
    name: string
    email: string
  }
  total?: number

  // Unified status that supports both systems
  status: "pending" | "confirmed" | "preparing" | "ready" | "delivered" | "processing" | "shipped" | "cancelled"
  createdAt: Date
}

// Order form interface with unified status
export interface OrderForm {
  customerName: string
  customerEmail: string
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
}

// Rest of the interfaces remain the same...
export interface NavigationItem {
  id: string
  name: string
  icon: string
}

export interface DashboardStat {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: string
}

export interface OrderStatusStat {
  name: string
  count: number
  percentage: number
}

export interface Customer {
  id: number
  name: string
  email: string
  totalOrders: number
  totalSpent: number
}

export interface Feature {
  icon: string
  title: string
  description: string
}

export interface StepConfig {
  id: string
  label: string
  icon: string
}

export interface NotificationConfig {
  id: string
  type: "success" | "error" | "warning" | "info"
  title: string
  message: string
  duration?: number
}

export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: any) => boolean | string
}

export interface FormField {
  name: string
  label: string
  type: "text" | "email" | "tel" | "textarea" | "select" | "number"
  placeholder?: string
  rules?: ValidationRule[]
  options?: { value: string; label: string }[]
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginationMeta {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta
}

export interface CartState {
  items: CartItem[]
  totalItems: number
  totalAmount: number
  isLoading: boolean
}

export interface OrderState {
  orders: Order[]
  currentOrder: Order | null
  isLoading: boolean
  error: string | null
}

export interface UserState {
  currentUser: CustomerInfo | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface BaseComponentProps {
  class?: string
  style?: Record<string, any>
}

export interface ButtonProps extends BaseComponentProps {
  variant?: "primary" | "secondary" | "destructive" | "ghost" | "link"
  size?: "sm" | "md" | "lg" | "icon"
  disabled?: boolean
  loading?: boolean
}

export interface InputProps extends BaseComponentProps {
  modelValue?: string | number
  type?: "text" | "email" | "password" | "tel" | "number"
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  error?: string
}

export interface SelectProps extends BaseComponentProps {
  modelValue?: string | number
  options: { value: string | number; label: string; disabled?: boolean }[]
  placeholder?: string
  disabled?: boolean
  error?: string
}

export interface ThemeConfig {
  isDark: boolean
  primaryColor: string
  accentColor: string
  borderRadius: "none" | "sm" | "md" | "lg" | "xl"
}

export interface ColorPalette {
  primary: string
  secondary: string
  accent: string
  background: string
  foreground: string
  muted: string
  border: string
  destructive: string
  success: string
  warning: string
  info: string
}

export interface AnimationConfig {
  duration: number
  easing: string
  delay?: number
}

export interface TransitionConfig {
  name: string
  enterActiveClass?: string
  leaveActiveClass?: string
  enterFromClass?: string
  leaveToClass?: string
  duration?: number | { enter: number; leave: number }
}

export interface PizzaConfigurationEvent {
  step: "size" | "crust" | "toppings"
  data: {
    size?: PizzaSize
    crust?: CrustType
    toppings?: Topping[]
  }
}

export interface CartEvent {
  type: "add" | "remove" | "update" | "clear"
  item?: CartItem
  quantity?: number
}

export interface OrderEvent {
  type: "created" | "updated" | "cancelled" | "completed"
  order: Order
  timestamp: Date
}

export type PizzaStatus = "pending" | "confirmed" | "preparing" | "ready" | "delivered"
export type ToppingName = "CHEESE" | "PEPPERONI" | "MUSHROOM" | "OLIVES" | "ONION" | "BACON"
export type PizzaSizeName = "SMALL" | "MEDIUM" | "LARGE"
export type CrustTypeName = "THIN" | "THICK" | "STUFFED"

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type EventHandler<T = any> = (event: T) => void | Promise<void>
export type ValidationFunction = (value: any) => boolean | string
export type FilterFunction<T> = (item: T) => boolean
export type SortFunction<T> = (a: T, b: T) => number
export type MapFunction<T, U> = (item: T, index: number) => U

export interface AppConfig {
  apiBaseUrl: string
  enableDevtools: boolean
  theme: ThemeConfig
  features: {
    darkMode: boolean
    animations: boolean
    notifications: boolean
    analytics: boolean
  }
  pizza: {
    maxToppings: number
    minToppings: number
    defaultSize: PizzaSizeName
    defaultCrust: CrustTypeName
  }
}

export interface AppError {
  code: string
  message: string
  details?: any
  timestamp: Date
}

export interface ValidationError extends AppError {
  field: string
  value: any
}

export interface NetworkError extends AppError {
  status: number
  url: string
}

export interface RouteConfig {
  path: string
  name: string
  component: any
  meta?: {
    title?: string
    requiresAuth?: boolean
    roles?: string[]
  }
}

export interface PluginOptions {
  [key: string]: any
}

export interface Plugin {
  install: (app: any, options?: PluginOptions) => void
}
