import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./components/Cart";
import CheckoutModal from "./components/CheckoutModal";

export default function App() {
  return (
    // Set up routing for the application
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <header className="sticky top-0 z-10 border-b bg-white">
          <div className="mx-auto max-w-5xl px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-bold tracking-tight text-rose-900">
              Shopping App
            </h1>
          </div>
        </header>

        <main className="mx-auto max-w-5xl p-4">
          <Cart />
          <CheckoutModal />
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
