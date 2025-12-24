import { create } from "zustand"
import { productSlice, type ProductSlice } from "./productSlice"
import { cartSlice, type CartSlice } from "./cartSlice"
import { uiSlice, type UiSlice } from "./uiSlice"

export type StoreState = ProductSlice & CartSlice & UiSlice
// Combine different slices to create the complete store
export const useStore = create<StoreState>()((...a) => ({
  ...productSlice(...a),
  ...cartSlice(...a),
  ...uiSlice(...a),
}))
