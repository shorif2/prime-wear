import React, { useState } from "react";
import { useStore } from "@nanostores/react";
import styles from "./OrderCart.module.css";

const shippingCost = 60;

const CartPage: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const subtotal = 0;
  const total = 0;

  if (submitted) {
    return (
      <div
        className={styles.container}
        style={{
          maxWidth: 600,
          margin: "2rem auto",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <h2 className={styles.orderPlaced}>Order Placed!</h2>
        <p>Thank you for your purchase, {form.name}.</p>
      </div>
    );
  }

  // return (
  //   <div className={styles.container}>
  //     <div className={styles.card}>
  //       <div className={styles.header}>
  //         <h1>Shopping Cart</h1>
  //         <a href="/shop" className={styles.actionLink}>
  //           Continue Shopping
  //         </a>
  //       </div>
  //       {Object.values($cartItems).length === 0 ? (
  //         <p className={styles.emptyCart}>Your cart is empty.</p>
  //       ) : (
  //         <>
  //           {Object.values($cartItems).map((item) => (
  //             <div className={styles.productItem} key={item.id}>
  //               <div className={styles.productImage}>
  //                 <img
  //                   src={item.imageSrc}
  //                   alt={item.name}
  //                   className={styles.productImg}
  //                 />
  //               </div>
  //               <div className={styles.productDetails}>
  //                 <h3 className={styles.productTitle}>{item.name}</h3>
  //                 <p className={styles.productPrice}>
  //                   ${item.price.toFixed(2)} each
  //                 </p>
  //               </div>
  //               <div className={styles.productControls}>
  //                 <span>Qty: {item.quantity}</span>
  //                 <div className={styles.priceDisplay}>
  //                   <div className={styles.pricePrimary}>
  //                     ${(item.price * item.quantity).toFixed(2)}
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           ))}
  //           <div className={styles.summary}>
  //             <div className={styles.summaryItem}>
  //               <span className={styles.summaryLabel}>Subtotal</span>
  //               <span className={styles.summaryValue}>
  //                 ${subtotal.toFixed(2)}
  //               </span>
  //             </div>
  //             <div className={styles.summaryItem}>
  //               <span className={styles.summaryLabel}>Shipping</span>
  //               <span className={styles.summaryValue}>
  //                 ${shippingCost.toFixed(2)}
  //               </span>
  //             </div>
  //             <div className={styles.summaryItemTotal}>
  //               <span className={styles.summaryLabel}>Total</span>
  //               <span className={styles.summaryValue}>${total.toFixed(2)}</span>
  //             </div>
  //           </div>
  //           <form className={styles.orderForm} onSubmit={handleSubmit}>
  //             <h2 className={styles.orderInfoTitle}>Order Information</h2>
  //             <div className={styles.formFields}>
  //               <input
  //                 name="name"
  //                 required
  //                 placeholder="Name"
  //                 value={form.name}
  //                 onChange={handleInput}
  //                 className={styles.input}
  //               />
  //               <input
  //                 name="address"
  //                 required
  //                 placeholder="Address"
  //                 value={form.address}
  //                 onChange={handleInput}
  //                 className={styles.input}
  //               />
  //               <input
  //                 name="email"
  //                 type="email"
  //                 required
  //                 placeholder="Email"
  //                 value={form.email}
  //                 onChange={handleInput}
  //                 className={styles.input}
  //               />
  //               <input
  //                 name="phone"
  //                 required
  //                 placeholder="Phone"
  //                 value={form.phone}
  //                 onChange={handleInput}
  //                 className={styles.input}
  //               />
  //             </div>
  //             <button type="submit" className={styles.btnPrimary}>
  //               Process Order
  //             </button>
  //           </form>
  //         </>
  //       )}
  //     </div>
  //   </div>
  // );
};

export default CartPage;
