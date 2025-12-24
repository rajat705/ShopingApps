import type { StateCreator } from "zustand"

export type UiSlice = {
  checkoutOpen: boolean
  openCheckout: () => void
  closeCheckout: () => void
}
// Implementation of the UI slice
export const uiSlice: StateCreator<UiSlice> = (set) => ({
  checkoutOpen: false,
  openCheckout: () => set({ checkoutOpen: true }),
  closeCheckout: () => set({ checkoutOpen: false }),
})
