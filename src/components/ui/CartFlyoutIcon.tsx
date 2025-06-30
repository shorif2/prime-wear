import { useStore } from "@nanostores/react";
import { cartItems, isCartOpen } from "../../store/cart";

export default function CartFlyoutIcon() {
  const $cartItems = useStore(cartItems);
  const $isCartOpen = useStore(isCartOpen);

  // Calculate total quantity
  const totalQuantity = Object.values($cartItems).reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  // console.log(
  //   "Quantities:",
  //   Object.values($cartItems).map((item) => item.quantity),
  // );
  // console.log("Total quantity:", totalQuantity);

  return (
    <button
      onClick={() => isCartOpen.set(!$isCartOpen)}
      id="cartButton"
      className="flex justify-end items-center space-x-4"
    >
      <i className="fa-solid fa-bag-shopping text-xl"></i>
      <span id="cartCount" className="ml-1 text-sm font-medium">
        {totalQuantity}
      </span>
      <span className="sr-only">items in cart, view bag</span>
    </button>
  );
}
