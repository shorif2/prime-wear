import { atom, map } from "nanostores";

export const isCartOpen = atom(false);

export type CartItem = {
  id: string;
  name: string;
  imageSrc: string;
  quantity: number;
  price: number;
  slug?: string;
};

export type CartItemDisplayInfo = Pick<CartItem, "id" | "name" | "imageSrc">;

// Initialize cart items from localStorage if available
const getInitialCartItems = (): Record<string, CartItem> => {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem("cart-items");
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.warn("Failed to load cart from localStorage:", error);
      return {};
    }
  }
  return {};
};

export const cartItems = map<Record<string, CartItem>>(getInitialCartItems());

// Save cart items to localStorage whenever they change
cartItems.subscribe((items) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("cart-items", JSON.stringify(items));
    } catch (error) {
      console.warn("Failed to save cart to localStorage:", error);
    }
  }
});

export function addCartItem(
  item: Omit<CartItem, "quantity"> & { quantity?: number },
) {
  const id = item.id;
  const existingEntry = cartItems.get()[id];
  const quantity = item.quantity || 1;

  if (existingEntry) {
    cartItems.setKey(id, {
      ...existingEntry,
      quantity: existingEntry.quantity + quantity,
    });
  } else {
    cartItems.setKey(id, {
      ...item,
      quantity: quantity,
    });
  }
}

export function removeCartItem(id: string) {
  const currentItems = cartItems.get();
  const newItems = { ...currentItems };
  delete newItems[id];
  cartItems.set(newItems);
}

export function updateCartItemQuantity(id: string, quantity: number) {
  const existingEntry = cartItems.get()[id];
  if (existingEntry) {
    if (quantity <= 0) {
      removeCartItem(id);
    } else {
      cartItems.setKey(id, {
        ...existingEntry,
        quantity: quantity,
      });
    }
  }
}

export function clearCart() {
  cartItems.set({});
}

export function getCartTotal() {
  const items = cartItems.get();
  return Object.values(items).reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}

export function getCartItemCount() {
  const items = cartItems.get();
  return Object.values(items).reduce((total, item) => {
    return total + item.quantity;
  }, 0);
}
