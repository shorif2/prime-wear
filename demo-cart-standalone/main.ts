// Demo product data (replace with your own as needed)
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const demoProducts: Product[] = [
  {
    id: 1,
    name: "Modern Chair",
    price: 2500,
    image: "/public/images/products/product1.jpg",
  },
  {
    id: 2,
    name: "Classic Sofa",
    price: 8000,
    image: "/public/images/products/product2.jpg",
  },
  {
    id: 3,
    name: "Wooden Table",
    price: 4500,
    image: "/public/images/products/product3.jpg",
  },
];

const cartKey = "demoCart";
const discountKey = "demoDiscount";

function getCart(): CartItem[] {
  const data = localStorage.getItem(cartKey);
  return data ? JSON.parse(data) : [];
}
function setCart(cart: CartItem[]) {
  localStorage.setItem(cartKey, JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-updated"));
}
function getDiscount(): string {
  return localStorage.getItem(discountKey) || "";
}
function setDiscount(code: string) {
  localStorage.setItem(discountKey, code);
}
function removeDiscount() {
  localStorage.removeItem(discountKey);
}

function renderCart() {
  const cartItems = getCart();
  const cartItemsDiv = document.getElementById("cartItems")!;
  cartItemsDiv.innerHTML = "";
  if (cartItems.length === 0) {
    cartItemsDiv.innerHTML =
      '<div style="padding:12px;color:#888;">Your cart is empty</div>';
  } else {
    cartItems.forEach((item, idx) => {
      const div = document.createElement("div");
      div.className = "cart-item-row";
      div.style.display = "flex";
      div.style.alignItems = "center";
      div.style.gap = "10px";
      div.style.padding = "8px 0";
      div.innerHTML = `
        <img src="${item.product.image}" alt="${item.product.name}" style="width:48px;height:48px;border-radius:6px;object-fit:cover;" />
        <div style="flex:1;">
          <div style="font-weight:500;">${item.product.name}</div>
          <div style="font-size:0.95rem;color:#666;">৳${item.product.price}</div>
        </div>
        <input type="number" min="1" value="${item.quantity}" data-idx="${idx}" class="cart-qty-input" style="width:48px;" />
        <button data-idx="${idx}" class="remove-btn" style="background:#dc2626;color:#fff;border:none;border-radius:4px;padding:4px 8px;cursor:pointer;">Remove</button>
      `;
      cartItemsDiv.appendChild(div);
    });
  }
  updateCartSummary();
}

function updateCartSummary() {
  const cartItems = getCart();
  let subtotal = 0;
  cartItems.forEach((item) => {
    subtotal += item.product.price * item.quantity;
  });
  let shipping = subtotal > 0 ? 100 : 0;
  let discountCode = getDiscount();
  let discount = 0;
  if (discountCode === "SAVE10") discount = Math.floor(subtotal * 0.1);
  const total = subtotal + shipping - discount;
  (document.getElementById("subtotal") as HTMLElement).textContent =
    `৳${subtotal}`;
  (document.getElementById("shippingCost") as HTMLElement).textContent =
    `৳${shipping}`;
  (document.getElementById("discountAmount") as HTMLElement).textContent =
    `-৳${discount}`;
  (document.getElementById("appliedDiscountCode") as HTMLElement).textContent =
    discountCode;
  (document.getElementById("total") as HTMLElement).textContent = `৳${total}`;
  // Update hidden inputs
  (document.getElementById("cartItemsInput") as HTMLInputElement).value =
    JSON.stringify(cartItems);
  (document.getElementById("discountCodeHidden") as HTMLInputElement).value =
    discountCode;
  // Show/hide discount row
  (document.getElementById("discountRow") as HTMLElement).style.display =
    discount > 0 ? "" : "none";
}

function showAlert(type: "error" | "success", message: string) {
  const alertContainer = document.getElementById("alertContainer")!;
  const div = document.createElement("div");
  div.className = type;
  div.textContent = message;
  alertContainer.appendChild(div);
  setTimeout(() => {
    div.remove();
  }, 3500);
}

function setupCartEvents() {
  const cartItemsDiv = document.getElementById("cartItems")!;
  cartItemsDiv.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement;
    if (target.classList.contains("cart-qty-input")) {
      const idx = parseInt(target.dataset.idx!);
      let cart = getCart();
      let qty = Math.max(1, parseInt(target.value));
      cart[idx].quantity = qty;
      setCart(cart);
      renderCart();
    }
  });
  cartItemsDiv.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("remove-btn")) {
      const idx = parseInt(target.dataset.idx!);
      let cart = getCart();
      cart.splice(idx, 1);
      setCart(cart);
      renderCart();
    }
  });
}

function setupDiscountForm() {
  const discountForm = document.getElementById("discountForm")!;
  const discountInput = document.getElementById(
    "discountCodeInput",
  ) as HTMLInputElement;
  const applyBtn = document.getElementById("applyDiscountBtn")!;
  const removeBtn = document.getElementById("removeDiscountBtn")!;
  const discountMsg = document.getElementById("discountMessage")!;
  function updateButtons() {
    if (getDiscount()) {
      applyBtn.style.display = "none";
      removeBtn.style.display = "";
      discountInput.value = getDiscount();
      discountInput.disabled = true;
    } else {
      applyBtn.style.display = "";
      removeBtn.style.display = "none";
      discountInput.value = "";
      discountInput.disabled = false;
    }
  }
  discountForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const code = discountInput.value.trim();
    if (code === "SAVE10") {
      setDiscount(code);
      showAlert("success", "Discount code applied!");
      updateCartSummary();
      updateButtons();
      discountMsg.style.display = "none";
    } else {
      discountMsg.textContent = "Invalid discount code. Try SAVE10.";
      discountMsg.style.display = "";
    }
  });
  removeBtn.addEventListener("click", () => {
    removeDiscount();
    showAlert("success", "Discount removed.");
    updateCartSummary();
    updateButtons();
    discountMsg.style.display = "none";
  });
  updateButtons();
}

function setupCheckoutForm() {
  const form = document.getElementById("checkoutForm") as HTMLFormElement;
  const submitButton = document.getElementById(
    "submitButton",
  ) as HTMLButtonElement;
  const loadingOverlay = document.getElementById(
    "loadingOverlay",
  ) as HTMLElement;
  const progressBar = document.getElementById(
    "loadingProgressBar",
  ) as HTMLElement;
  function isCartEmpty() {
    return getCart().length === 0;
  }
  function updateCheckoutButtonState() {
    if (submitButton) {
      const empty = isCartEmpty();
      submitButton.disabled = empty;
      submitButton.title = empty
        ? "Your cart is empty. Please add items to your cart before placing an order."
        : "";
      if (empty) {
        submitButton.classList.add("opacity-50", "cursor-not-allowed");
      } else {
        submitButton.classList.remove("opacity-50", "cursor-not-allowed");
      }
    }
  }
  updateCheckoutButtonState();
  window.addEventListener("cart-updated", updateCheckoutButtonState);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (isCartEmpty()) {
      showAlert(
        "error",
        "Your cart is empty. Please add items to your cart before placing an order.",
      );
      return;
    }
    // Check required fields
    const requiredFields = [
      "customerName",
      "customerPhone",
      "shippingAddress",
      "shippingLocation",
      "city",
      "zone",
    ];
    let missingFields: string[] = [];
    for (const field of requiredFields) {
      const element = form.querySelector(`[name="${field}"]`) as
        | HTMLInputElement
        | HTMLTextAreaElement
        | null;
      if (!element || !element.value) {
        missingFields.push(field);
      }
    }
    if (missingFields.length > 0) {
      showAlert(
        "error",
        `Please fill in all required fields: ${missingFields.join(", ")}`,
      );
      return;
    }
    // Show loading state
    submitButton.disabled = true;
    submitButton.textContent = "Processing...";
    loadingOverlay.style.display = "flex";
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    progressBar.style.width = "0%";
    setTimeout(() => {
      progressBar.style.width = "30%";
    }, 300);
    setTimeout(() => {
      progressBar.style.width = "60%";
    }, 1000);
    setTimeout(() => {
      progressBar.style.width = "80%";
    }, 2000);
    setTimeout(() => {
      progressBar.style.width = "100%";
      setTimeout(() => {
        loadingOverlay.style.display = "none";
        document.body.style.overflow = "";
        submitButton.disabled = false;
        submitButton.textContent = "Place Order";
        // Clear cart and form
        setCart([]);
        renderCart();
        form.reset();
        showAlert("success", "Your order has been placed successfully!");
      }, 800);
    }, 2500);
  });
}

function setupDemoAddToCart() {
  // For demo: add all products to cart if empty
  if (getCart().length === 0) {
    setCart(demoProducts.map((p) => ({ product: p, quantity: 1 })));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupDemoAddToCart();
  renderCart();
  setupCartEvents();
  setupDiscountForm();
  setupCheckoutForm();
});
