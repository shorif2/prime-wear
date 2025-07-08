import { useStore } from "@nanostores/react";
import { cartItems, isCartOpen } from "../../store/cart";

export default function CartFlyoutIcon() {
  const $isCartOpen = useStore(isCartOpen);
  const $cartItems = useStore(cartItems);

  // Calculate cart item count
  const cartItemCount = Object.values($cartItems).reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  return (
    <button
      onClick={() => isCartOpen.set(!$isCartOpen)}
      className="relative p-2 text-black hover:text-red-500 transition-colors"
      aria-label="Shopping cart"
    >
      <i className="fa-solid fa-shopping-cart text-xl"></i>
      {cartItemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {cartItemCount}
        </span>
      )}
    </button>
  );
}
