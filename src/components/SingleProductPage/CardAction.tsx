import React, { useState } from "react";
import { addToCart, isCartOpen } from "@/store/cart2";
import { Check, Minus, Plus, ShoppingCart } from "lucide-react";

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

  const validate = () => {
    if (!product.variants.length) return { valid: true };

    const needsSize = product.variants.some((v) => v.size);
    const needsColor = product.variants.some((v) => v.color);

    if (needsSize && !product.selectedSize)
      return { valid: false, error: "Please select all options" };
    if (needsColor && !product.selectedColor)
      return { valid: false, error: "Please select all options" };

    const variant = product.variants.find(
      (v) =>
        (!product.selectedSize || v.size === product.selectedSize) &&
        (!product.selectedColor || v.color === product.selectedColor),
    );

    if (!variant)
      return { valid: false, error: "Selected combination not available" };
    if (variant.stock <= 0)
      return { valid: false, error: "Selected option out of stock" };

    return { valid: true, variant };
  };

  const validation = validate();
  const variant = validation.variant;

  const handleAddToCart = () => {
    const itemData = {
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.imageSrc,
      quantity: inputNumber,
      variantId: variant?.id,
      size: product?.selectedSize,
      color: product.selectedColor,
    };
    if (itemData) {
      addToCart(itemData);

      // Open the cart after adding
      isCartOpen.set(true);
    }
  };

  const handleBuyNow = () => {
    const itemData = {
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.imageSrc,
      quantity: inputNumber,
      variantId: variant?.id,
      size: product?.selectedSize,
      color: product.selectedColor,
    };
    if (itemData) {
      addToCart(itemData);
      window.location.href = "/cart";
    }
  };

  return (
    <>
      <div className="my-4">
        <h3 className="text-sm text-gray-800 uppercase mb-4">Quantity</h3>
        <label htmlFor="quantity" className="sr-only">
          Product quantity
        </label>

        <div className="flex items-center">
          <button
            type="button"
            id="quantity-minus"
            onClick={decreaseQuantity}
            className="inline-flex h-8 w-8 items-center justify-center rounded-l-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100 shadow-sm transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min={1}
            value={inputNumber}
            onChange={handleInputChange}
            aria-label="Product quantity"
            className="h-8 w-14 border-y border-gray-300 text-center text-sm [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
          />
          <button
            type="button"
            id="quantity-plus"
            onClick={increaseQuantity}
            className="inline-flex h-8 w-8 items-center justify-center rounded-r-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100 shadow-sm transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* cart action */}
      <div className=" flex gap-3 border-b border-gray-200 pb-5 ">
        <button
          onClick={handleAddToCart}
          className="bg-primary border border-primary text-white text-xs px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition"
        >
          <ShoppingCart /> Add to cart
        </button>
        <a
          href="#"
          className="border border-gray-300 text-gray-600 text-xs px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition"
          onClick={(e) => {
            e.preventDefault();
            handleBuyNow();
          }}
        >
          <Check /> Buy Now
        </a>
      </div>
    </>
  );
};

export default CardAction;
