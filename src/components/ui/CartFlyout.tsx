import { useStore } from "@nanostores/react";
// import styles from "./CartFlyout.module.css";
import styles from "../../styles/CartFlyout.module.css";
import {
  cartItems,
  isCartOpen,
  removeCartItem,
  updateCartItemQuantity,
  getCartTotal,
} from "../../store/cart";

export default function CartFlyout() {
  const $isCartOpen = useStore(isCartOpen);
  const $cartItems = useStore(cartItems);

  // Calculate cart total from the cart items
  const cartTotal = Object.values($cartItems).reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    updateCartItemQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: string) => {
    removeCartItem(id);
  };

  // Don't render anything if cart is not open
  if (!$isCartOpen) {
    return null;
  }

  return (
    <>
      <div className={styles.overlay} onClick={() => isCartOpen.set(false)} />
      <aside className={styles.container}>
        <div className={styles.header}>
          <h2>Shopping Cart</h2>
          <button
            onClick={() => isCartOpen.set(false)}
            className={styles.closeButton}
          >
            ×
          </button>
        </div>

        {Object.values($cartItems).length ? (
          <>
            <ul className={styles.list} role="list">
              {Object.values($cartItems).map((cartItem) => (
                <li className={styles.listItem} key={cartItem.id}>
                  <img
                    className={styles.listItemImg}
                    src={cartItem.imageSrc}
                    alt={cartItem.name}
                  />
                  <div className={styles.itemDetails}>
                    <h3 className={styles.itemName}>{cartItem.name}</h3>
                    <p className={styles.itemPrice}>
                      ${cartItem.price.toFixed(2)}
                    </p>
                    <div className={styles.quantityControls}>
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            cartItem.id,
                            cartItem.quantity - 1,
                          )
                        }
                        className={styles.quantityBtn}
                        disabled={cartItem.quantity <= 1}
                      >
                        -
                      </button>
                      <span className={styles.quantity}>
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            cartItem.id,
                            cartItem.quantity + 1,
                          )
                        }
                        className={styles.quantityBtn}
                      >
                        +
                      </button>
                    </div>
                    <p className={styles.itemTotal}>
                      Total: ${(cartItem.price * cartItem.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleRemoveItem(cartItem.id)}
                      className={styles.removeButton}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className={styles.cartFooter}>
              <div className={styles.total}>
                <strong>Total: ${cartTotal.toFixed(2)}</strong>
              </div>
              <button
                className={styles.checkoutButton}
                onClick={() => {
                  isCartOpen.set(false);
                  window.location.href = "/cart";
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        ) : (
          <div className={styles.emptyCart}>
            <p>Your cart is empty!</p>
            <button
              onClick={() => isCartOpen.set(false)}
              className={styles.continueShopping}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
