import { Link } from "react-router-dom"
import type { Product } from "../store/productSlice"

export default function ProductCard({ product }: { product: Product }) {
  return (
    // Link to product detail page
    <Link
      to={`/product/${product.id}`}
      className="rounded-lg border bg-white p-4 transition hover:shadow-md"
    >
      {/* Product image */}
      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-full object-cover rounded"
      />
      {/* Product name and price */}
      <div className="mt-3 space-y-1">
        <h2 className="font-medium">{product.name}</h2>
        <p className="text-sm text-gray-600">₹{product.price}</p>
      </div>
    </Link>
  )
}
