import React, { useState } from "react";
import { addCartItem, isCartOpen } from "../../store/cart";

interface CardActionProps {
  product?: {
    id: string;
    name: string;
    price: number;
    imageSrc?: string;
    slug?: string;
  };
}

const CardAction = ({ product }: CardActionProps) => {
  const [inputNumber, setInputNumber] = useState(1);

  // Function to increase quantity
  const increaseQuantity = () => {
    setInputNumber((prev) => prev + 1);
  };

  // Function to decrease quantity, ensuring it doesn't go below 1
  const decreaseQuantity = () => {
    setInputNumber((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // Optional: Handle manual input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setInputNumber(value);
  };

  const handleAddToCart = () => {
    if (product) {
      addCartItem({
        id: product.id,
        name: product.name,
        price: product.price,
        imageSrc: product.imageSrc || "/images/products/product1.jpg", // fallback image
        slug: product.slug,
        quantity: inputNumber,
      });

      // Open the cart after adding
      isCartOpen.set(true);
    }
  };

  return (
    <>
      <div className="mt-4">
        <h3 className="text-sm text-gray-800 uppercase mb-1">Quantity</h3>
        <label htmlFor="quantity" className="sr-only">
          Product quantity
        </label>
        <div className="flex text-gray-600 divide-x divide-gray-300 w-max">
          <button
            type="button"
            id="quantity-minus"
            onClick={decreaseQuantity}
            className="h-8 w-8 border border-gray-300 text-xl flex items-center justify-center cursor-pointer select-none"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min={1}
            value={inputNumber}
            onChange={handleInputChange}
            aria-label="Product quantity"
            className="h-8 w-10 text-center text-base flex items-center justify-center no-spinner"
          />
          <button
            type="button"
            id="quantity-plus"
            onClick={increaseQuantity}
            className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none border border-gray-300"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* cart action */}
      <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
        <button
          onClick={handleAddToCart}
          className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition"
        >
          <i className="fa-solid fa-bag-shopping"></i> Add to cart
        </button>
        <a
          href="#"
          className="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition"
        >
          <i className="fa-solid fa-heart"></i> Wishlist
        </a>
      </div>
    </>
  );
};

export default CardAction;
