import type { StateCreator } from "zustand"
import type { Product } from "./productSlice"

type CartItem = Product & { quantity: number }
// Slice for managing the shopping cart state
export type CartSlice = {
  items: CartItem[]
  addToCart: (product: Product) => void
  increment: (id: string) => void
  decrement: (id: string) => void
  remove: (id: string) => void
  totalPrice: () => number
}
// Implementation of the cart slice
export const cartSlice: StateCreator<CartSlice> = (set, get) => ({
  items: [],

  addToCart: (product) => {
    const items = get().items
    const existing = items.find(i => i.id === product.id)

    if (existing) {
      set({
        items: items.map(i =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      })
    } else {
      set({ items: [...items, { ...product, quantity: 1 }] })
    }
  },

  increment: (id) => {
    set({
      items: get().items.map(i =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
      )
    })
  },

  decrement: (id) => {
    set({
      items: get().items
        .map(i =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter(i => i.quantity > 0)
    })
  },

  remove: (id) => {
    set({ items: get().items.filter(i => i.id !== id) })
  },

  totalPrice: () =>
    get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
})
