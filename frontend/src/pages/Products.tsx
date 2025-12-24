import { useEffect } from "react"
import { useStore } from "../store/store"
import ProductCard from "../components/ProductCard"

export default function Products() {
  const {
    search,
    setSearch,
    sortBy,
    setSortBy,
    setPriceFilter,
    filteredProducts,
    loadProducts,
    loading,
    error,
  } = useStore()

  useEffect(() => {
    loadProducts()
  }, [loadProducts])
// Handle loading and error states
  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading products...
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        {error}
      </div>
    )
  }

  const products = filteredProducts()

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Products</h2>

      {/* Search + Sort */}
      <div className="flex flex-wrap gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products"
          className="flex-1 rounded border p-2"
        />

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value as typeof sortBy)
          }
          className="rounded border p-2"
        >
          <option value="name">Sort by Name</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {/* Price Filters */}
      <div className="flex gap-2">
        <button
          onClick={() => setPriceFilter(0, 2000)}
          className="rounded border px-3 py-1 text-sm"
        >
          Under ₹2000
        </button>

        <button
          onClick={() => setPriceFilter(0, Infinity)}
          className="rounded border px-3 py-1 text-sm"
        >
          All Prices
        </button>
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <p className="text-gray-500">No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
