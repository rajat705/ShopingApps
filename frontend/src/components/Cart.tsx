import { useStore } from "../store/store"

export default function Cart() {
  const { items, increment, decrement, remove, totalPrice, openCheckout } = useStore()

  if (items.length === 0) return null

  return (
    <div className="mb-6 rounded-lg border bg-white p-4">
      <h2 className="mb-3 font-medium">Cart</h2>

      <div className="space-y-3">
        {/* Cart items */}
        {items.map(i => (
          <div key={i.id} className="flex items-center justify-between">
            <span>{i.name}</span>
            {/* Quantity controls */}
            <div className="flex items-center gap-2">
              <button onClick={() => decrement(i.id)} className="px-2 border">-</button>
              <span>{i.quantity}</span>
              <button onClick={() => increment(i.id)} className="px-2 border">+</button>
              <button
                onClick={() => remove(i.id)}
                className="text-sm text-red-500"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
        
      <div className="mt-4 flex justify-between items-center">
        <p className="font-medium">Total: ₹{totalPrice()}</p>
        <button
          onClick={openCheckout}
          className="rounded bg-black px-4 py-2 text-white"
        >
          {/* Checkout option */}
          Checkout
        </button>
      </div>
    </div>
  )
}

