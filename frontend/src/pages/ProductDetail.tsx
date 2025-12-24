import { useParams } from "react-router-dom"
import { useStore } from "../store/store"
// Component to display the details of a specific product
export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const { products, addToCart } = useStore()
// Find the product by ID
  const product = products.find(p => p.id === id)
  if (!product) return <p>Not found</p>
// Display product details
  return (
  <div className="grid gap-6 md:grid-cols-2">
    <img
      src={product.image}
      className="w-full rounded-lg border"
    />

    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{product.name}</h1>
      <p className="text-lg">₹{product.price}</p>

      <button
        onClick={() => addToCart(product)}
        className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
      >
        Add to Cart
      </button>
    </div>
  </div>
)
}