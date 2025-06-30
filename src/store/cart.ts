import { atom, map } from "nanostores";

export const isCartOpen = atom(false);

export type CartItem = {
  id: string;
  name: string;
  imageSrc: string;
  quantity: number;
};

export type CartItemDisplayInfo = Pick<CartItem, "id" | "name" | "imageSrc">;

export const cartItems = map<Record<string, CartItem>>({});

export function addCartItem(number: Number) {
  const id = 1;
  const existingEntry = cartItems.get()[id];
  if (existingEntry) {
    cartItems.setKey(id, {
      ...existingEntry,
      quantity: existingEntry.quantity + parseInt(number),
    });
  } else {
    cartItems.setKey(id, {
      id,
      quantity: parseInt(number),
    });
  }
}
