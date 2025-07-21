import { useStore } from "@nanostores/react";
import styles from "../../styles/CartFlyout.module.css";
import { Button } from "./button";
import {
  X,
  Minus,
  ShoppingCart,
  Plus,
  Delete,
  Trash,
  Trash2,
} from "lucide-react";
import {
  cartStore,
  isCartOpen as isOpenCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} from "@/store/cart2";

export default function CartFlyout() {
  const $isOpen = useStore(isOpenCart);

  const { items, totalAmount, totalItems } = useStore(cartStore);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    updateQuantity(id, "default", newQuantity);
  };

  const handleRemoveItem = (id: string, variantId?: string) => {
    removeFromCart(id, variantId);
  };

  // Don't render anything if cart is not open
  if (!$isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black  opacity-70"
        onClick={() => isOpenCart.set(false)}
      />
      <div className="relative z-10 bg-white w-full max-w-92 h-full flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <h2 className="font-medium text-lg">Your Cart ({totalItems})</h2>
          </div>
          <button
            onClick={() => isOpenCart.set(false)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {Object.values(items).length ? (
            <div className="space-y-4 p-4">
              {Object.values(items).map((cartItem) => (
                <div
                  key={cartItem.id}
                  className="border border-gray-200 rounded p-3 bg-gray-50"
                >
                  <div className="flex gap-4">
                    <div className="relative">
                      <div className="w-12 h-14 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
                        <img
                          src={cartItem.image}
                          alt={cartItem.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-xs">
                            {cartItem?.name}
                          </h3>
                        </div>
                        <button
                          onClick={() =>
                            handleRemoveItem(cartItem.id, cartItem.variantId)
                          }
                          className="text-gray-400 hover:text-red-500 text-sm ml-2"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex justify-between  h-10">
                        <div className="flex flex-col items-start">
                          <span className="font-semibold text-gray-900 text-sm">
                            ₹{cartItem?.price * cartItem.quantity}
                          </span>
                          {cartItem?.quantity > 1 && (
                            <p className="text-xs text-gray-500">
                              ₹{cartItem?.price} each
                            </p>
                          )}
                        </div>

                        <div className="flex items-end gap-1">
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                cartItem.id,
                                cartItem.quantity - 1,
                              )
                            }
                            disabled={cartItem.quantity <= 1}
                            // onClick={() => updateQuantity(item.id, -1)}
                            className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-sm font-medium ">
                            {cartItem?.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                cartItem.id,
                                cartItem.quantity + 1,
                              )
                            }
                            className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <ShoppingCart className="w-16 h-16 mb-4 text-gray-300" />
              <p className="text-lg">Your cart is empty</p>
              <button
                onClick={() => isOpenCart.set(false)}
                className="mt-6 bg-white text-gray-700 py-2 px-4 text-sm rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {Object.values(items).length > 0 && (
          <div className="border-t border-gray-200 p-4 space-y-4">
            {/* Totals */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Subtotal</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Shipping</span>
                <span>₹120</span>
              </div>
              <div className="flex justify-between text-sm font-semibold  border-t border-gray-200 pt-2">
                <span>Total</span>
                <span>₹{(totalAmount + 120).toLocaleString()}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                className="w-full bg-black text-white py-2 text-xs px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                onClick={() => {
                  isOpenCart.set(false);
                  setTimeout(() => {
                    window.location.href = "/cart";
                  }, 150); // Small delay to allow flyout to close
                }}
              >
                Checkout
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <button
                onClick={() => isOpenCart.set(false)}
                className="w-full bg-white text-gray-700 text-xs py-2 px-4 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Continue Shopping
              </button>

              <button
                className="w-full text-red-500 py-2 px-4 text-xs rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                onClick={clearCart}
              >
                <Trash2 size={16} /> Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
