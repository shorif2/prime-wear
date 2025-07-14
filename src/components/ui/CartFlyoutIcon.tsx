import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { cartStore, isCartOpen as isOpenCart } from "@/store/cart2";

export default function CartFlyoutIcon() {
  const $isOpen = useStore(isOpenCart);
  const { items, totalAmount, totalItems } = useStore(cartStore);

  // Add mounted state to ensure client-only rendering for cart count
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <button
      onClick={() => isOpenCart.set(!$isOpen)}
      id="cartButton"
      className="flex justify-end items-center space-x-4"
    >
      <i className="fa-solid fa-bag-shopping text-xl"></i>
      {mounted && totalItems > 0 && (
        <span id="cartCount" className="ml-4 text-sm font-medium">
          {totalItems}
        </span>
      )}
    </button>
  );
}
