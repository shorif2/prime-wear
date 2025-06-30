import { useStore } from "@nanostores/react";
// import styles from "./CartFlyout.module.css";
import styles from "../../styles/CartFlyout.module.css";
import { cartItems, isCartOpen } from "../../store/cart";

export default function CartFlyout() {
  const $isCartOpen = useStore(isCartOpen);
  const $cartItems = useStore(cartItems);
  return (
    <>
      {$isCartOpen && (
        <div
          className={styles.overlay}
          onClick={() => isCartOpen.set(false)} // clicking outside closes modal
        />
      )}
      <aside hidden={!$isCartOpen} className={styles.container}>
        {Object.values($cartItems).length ? (
          <ul className={styles.list} role="list">
            {Object.values($cartItems).map((cartItem) => (
              <li className={styles.listItem} key={cartItem.id}>
                <img
                  className={styles.listItemImg}
                  src={cartItem.imageSrc}
                  alt={cartItem.name}
                />
                <div>
                  <h3>{cartItem.name}</h3>
                  <p>Quantity: {cartItem.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex">
            <p>Your cart is empty!</p>
            <button onClick={() => isCartOpen.set(false)}>X</button>
          </div>
        )}
      </aside>
    </>
  );
}
