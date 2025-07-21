import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { cartStore, isCartOpen as isOpenCart } from "@/store/cart2";
import { ShoppingBagIcon, ShoppingCart, ShoppingCartIcon } from "lucide-react";

export default function CartFlyoutIcon() {
  const $isOpen = useStore(isOpenCart);
  const { items, totalAmount, totalItems } = useStore(cartStore);

  // Add mounted state to ensure client-only rendering for cart count
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <button
      onClick={() => isOpenCart.set(!$isOpen)}
      className="relative flex items-center justify-center bg-white"
    >
      <ShoppingCart />
      {mounted && totalItems > 0 && (
        <span className="absolute -top-2 left-4 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-xs text-red-50">
          {totalItems}
        </span>
      )}
    </button>
  );
}
