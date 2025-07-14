import { Button } from "@/components/ui/button";
import { clearCart } from "@/store/cart2";
import { useEffect, useState } from "react";

export default function OrderSuccessButtons() {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Clear the cart when the component mounts
    console.log("Order success page loaded, clearing cart");
    clearCart();

    // Trigger animation after a short delay
    setTimeout(() => {
      setIsAnimated(true);
    }, 300);
  }, []);

  const handleContinueShopping = () => {
    window.location.href = "/?clearCart=true";
  };

  const handlePrintOrder = () => {
    window.print();
  };

  return (
    <div
      className={`flex flex-col items-center space-y-6 transition-opacity duration-500 ${isAnimated ? "opacity-100" : "opacity-0"} no-print`}
    >
      <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md mt-6">
        <Button
          variant="outline"
          className="border-2 border-black text-black font-medium py-3 px-6 rounded-xl hover:bg-gray-50 transition-all duration-200 flex-1"
          onClick={handleContinueShopping}
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Continue Shopping
        </Button>
        <Button
          className="bg-black text-white font-medium py-3 px-6 rounded-xl hover:bg-gray-800 transition-all duration-200 flex-1"
          onClick={handlePrintOrder}
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          Print Receipt
        </Button>
      </div>
    </div>
  );
}
