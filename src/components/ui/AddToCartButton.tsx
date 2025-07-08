import { addCartItem, isCartOpen } from "../../store/cart";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    imageSrc: string;
    slug?: string;
  };
  quantity?: number;
  className?: string;
}

export default function AddToCartButton({
  product,
  quantity = 1,
  className = "",
}: AddToCartButtonProps) {
  const handleAddToCart = () => {
    addCartItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageSrc: product.imageSrc,
      slug: product.slug,
      quantity: quantity,
    });

    // Optionally open the cart after adding
    isCartOpen.set(true);
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors ${className}`}
    >
      <i className="fa-solid fa-cart-plus mr-2"></i>
      Add to Cart
    </button>
  );
}
