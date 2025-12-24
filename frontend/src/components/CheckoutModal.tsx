import { useState } from "react";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useStore } from "../store/store";

const checkoutSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  email: z.string().email("Invalid email"),
});
// Define the TypeScript type for the checkout form data
type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutModal() {
  const { checkoutOpen, closeCheckout } = useStore();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    // Extract form data
    const formData = new FormData(e.currentTarget);
    // Create data object from form inputs
    const data: CheckoutFormData = {
      name: String(formData.get("name") || ""),
      address: String(formData.get("address") || ""),
      email: String(formData.get("email") || ""),
    };
    // Validate form data using zod schema
    try {
      checkoutSchema.parse(data);
      setSuccess(true);
    } catch {
      setError("Please fill all fields correctly");
    }
  };
  // Handle modal close action
  const handleClose = () => {
    setSuccess(false);
    setError(null);
    closeCheckout();
  };
  // Render the checkout modal
  return (
    // Dialog component for the checkout modal
    <Dialog open={checkoutOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md rounded-xl">
        {success ? (
          <div className="space-y-4 text-center">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">
                Order placed successfully
              </DialogTitle>
            </DialogHeader>

            <p className="text-sm text-gray-600">
              Thank you for your purchase. Your order has been confirmed.
            </p>

            <button
              onClick={handleClose}
              className="w-full rounded-lg bg-black py-2 text-white hover:bg-gray-800 active:scale-[0.98]"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">
                Checkout
              </DialogTitle>
            </DialogHeader>
            {/* Form inputs for checkout */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="name"
                placeholder="Full name"
                className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-black"
              />

              <input
                name="address"
                placeholder="Delivery address"
                className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-black"
              />

              <input
                name="email"
                placeholder="Email address"
                className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-black"
              />

              {error && <p className="text-sm text-red-500">{error}</p>}

              <button
                type="submit"
                className="w-full rounded-lg bg-black py-2 text-white hover:bg-gray-800 active:scale-[0.98]"
              >
                Place Order
              </button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
