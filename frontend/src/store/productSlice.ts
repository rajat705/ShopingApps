import type { StateCreator } from "zustand"
import productsData from "../data/products.json"

export type Product = {
  id: string
  name: string
  price: number
  image: string
}

export type SortOption = "name" | "price-asc" | "price-desc"

export type ProductSlice = {
  products: Product[]

  search: string
  sortBy: SortOption
  minPrice: number
  maxPrice: number

  loading: boolean
  error: string | null

  loadProducts: () => Promise<void>

  setSearch: (value: string) => void
  setSortBy: (value: SortOption) => void
  setPriceFilter: (min: number, max: number) => void

  filteredProducts: () => Product[]
}

export const productSlice: StateCreator<ProductSlice> = (set, get) => ({
  products: [],

  search: "",
  sortBy: "name",
  minPrice: 0,
  maxPrice: Infinity,

  loading: false,
  error: null,

  // Simulated async load
  loadProducts: async () => {
    try {
      set({ loading: true, error: null })

      // simulate API delay
      await new Promise((res) => setTimeout(res, 800))

      set({ products: productsData, loading: false })
    } catch {
      set({
        error: "Failed to load products",
        loading: false,
      })
    }
  },

  setSearch: (value) => set({ search: value }),
  setSortBy: (value) => set({ sortBy: value }),
  setPriceFilter: (min, max) =>
    set({ minPrice: min, maxPrice: max }),

  filteredProducts: () => {
    const { products, search, sortBy, minPrice, maxPrice } = get()

    let result = products.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) &&
        p.price >= minPrice &&
        p.price <= maxPrice
    )

    if (sortBy === "price-asc") {
      result = [...result].sort((a, b) => a.price - b.price)
    }

    if (sortBy === "price-desc") {
      result = [...result].sort((a, b) => b.price - a.price)
    }

    if (sortBy === "name") {
      result = [...result].sort((a, b) =>
        a.name.localeCompare(b.name)
      )
    }

    return result
  },
})
