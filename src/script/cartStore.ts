import { atom } from "nanostores";

export const isCartOpen = atom(false);

// Optionally: helper functions
export function openCart() {
  isCartOpen.set(true);
}

export function closeCart() {
  isCartOpen.set(false);
}

export function toggleCart() {
  isCartOpen.set(!isCartOpen.get());
}
