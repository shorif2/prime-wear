import { useStore } from "@nanostores/react";
import styles from "../../styles/CartFlyout.module.css";
import { Button } from "./button";
import { X } from "lucide-react";
import {
  cartStore,
  isCartOpen as isOpenCart,
  updateQuantity,
} from "@/store/cart2";

export default function CartFlyout() {
  const $isOpen = useStore(isOpenCart);

  const { items, totalAmount, totalItems } = useStore(cartStore);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    updateQuantity(id, "default", newQuantity);
  };

  const handleRemoveItem = (id: string) => {
    // removeCartItem(id);
  };

  // Don't render anything if cart is not open
  if (!$isOpen) {
    return null;
  }

  return (
    <>
      <div className={styles.overlay} onClick={() => isOpenCart.set(false)} />
      <aside className={styles.container}>
        <div className={styles.header}>
          <h2>Shopping Cart</h2>
          <button
            onClick={() => isOpenCart.set(false)}
            className={styles.closeButton}
          >
            ×
          </button>
        </div>

        {Object.values(items).length ? (
          <>
            <ul className={styles.list} role="list">
              {Object.values(items).map((cartItem) => (
                <li className={styles.listItem} key={cartItem.id}>
                  <img
                    className={styles.listItemImg}
                    src={cartItem.image}
                    alt={cartItem.name}
                  />
                  <div className={styles.itemDetails}>
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm">{cartItem.name}</h3>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full -mt-1 -mr-1"
                        onClick={() => handleRemoveItem(cartItem.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
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
                  </div>
                </li>
              ))}
            </ul>
            <div className={styles.cartFooter}>
              <div className={styles.total}>
                <strong>Total: ${totalAmount.toFixed(2)}</strong>
              </div>
              <button
                className={styles.checkoutButton}
                onClick={() => {
                  isOpenCart.set(false);
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
              onClick={() => isOpenCart.set(false)}
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
