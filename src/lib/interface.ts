export interface CollectionsListData {
  collections: {
    id: string;
    name: string;
    type: "collection1" | "collection2" | "AllCategories";
    categoryId: string | null;
    config: any;
    sortOrder: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }[];
}
// Collection data interfaces
export interface CollectionData {
  collection: {
    id: string;
    name: string;
    type: "collection1" | "collection2" | "AllCategories";
    categoryId: string | null;
    config: any;
    sortOrder: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  products?: {
    id: string;
    name: string;
    price: number;
    discountPercentage: number | null;
    slug: string;
    imageUrl: string | null;
    discountedPrice: number;
  }[];
  featuredProduct?: {
    id: string;
    name: string;
    price: number;
    discountPercentage: number | null;
    slug: string;
    imageUrl: string | null;
    discountedPrice: number;
  } | null;
  categories?: {
    id: string;
    name: string;
    imageUrl: string | null;
    count: number;
  }[];
  previewProducts?: {
    id: string;
    name: string;
    price: number;
    discountPercentage: number | null;
    categoryId: string;
    slug: string;
    discountedPrice: number;
  }[];
}
// Interface for categories list data
export interface CategoriesListData {
  categories: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    imageUrl: string | null;
    createdAt: string;
    metaTitle: string | null;
    metaDescription: string | null;
  }[];
}

// Interface for product page data structure
export interface ProductPageData {
  product: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    categoryId: string;
    slug: string;
    metaTitle: string | null;
    metaDescription: string | null;
    isActive: boolean;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
    discountPercentage: number;
    freeDelivery: boolean;
    features?: string[];
    discountedPrice: number;
  };
  category: {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    imageUrl?: string | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
  } | null;
  images: {
    id: string;
    productId: string;
    url: string;
    alt: string;
    isPrimary: boolean;
    sortOrder: number;
    createdAt: string;
  }[];
  variants: {
    id: string;
    productId: string;
    size: string | null;
    color: string | null;
    weight: number | null;
    sku: string;
    price: number;
    stock: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }[];
  relatedProducts: {
    id: string;
    name: string;
    price: number;
    slug: string;
    discountPercentage: number;
    freeDelivery: boolean;
    imageUrl: string | null;
    discountedPrice: number;
  }[];
}

export type CartItem = {
  id: string;
  slug?: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  variantId?: string;
  size?: string;
  color?: string;
};

export type Discount = {
  id: string;
  code: string;
  type: string;
  valueType: string;
  discountValue: number;
  discountAmount: number;
  combineWithProductDiscounts?: boolean;
  combineWithOrderDiscounts?: boolean;
  combineWithShippingDiscounts?: boolean;
};

export type CartStore = {
  items: Record<string, CartItem>;
  totalItems: number;
  totalAmount: number;
  discount: Discount | null;
};

export interface LocationData {
  id: string;
  name: string;
  type: "city" | "zone" | "area";
  parentId: string | null;
  isActive: boolean;
  sortOrder: number;
}

export interface ShippingMethod {
  id: string;
  name: string;
  fee: number;
  description: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface ShippingMethod {
  id: string;
  name: string;
  fee: number;
  description: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: string | null;
  updatedAt: string | null;
}
export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  shippingAddress: string;
  totalAmount: number;
  shippingCharge: number;
  discountAmount: number | null;
  notes: string | null;
  city: string; // ID
  zone: string; // ID
  area: string | null; // ID
  cityName: string | null;
  zoneName: string | null;
  areaName: string | null;
  status: string;
  createdAt: string | null;
  updatedAt: string | null;
  items: OrderItem[];
  shipments: any[];
  deliveryProviders: any[];
}

export interface OrderItem {
  id: string;
  productId: string;
  variantId: string | null;
  quantity: number;
  price: number;
  productName: string | null;
  productImage: string | null;
  variantSize: string | null;
  variantColor: string | null;
}
export interface CreateOrderPayload {
  customerName: string;
  customerPhone: string;
  customerEmail?: string | null;
  shippingAddress: string;
  city: string;
  zone: string;
  area?: string | null;
  cityName?: string | null;
  zoneName?: string | null;
  areaName?: string | null;
  notes?: string | null;
  items: Array<{
    productId: string;
    variantId?: string | null;
    quantity: number;
    price: number;
  }>;
  shippingCharge: number;
  discountAmount?: number | null;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: {
    code: string;
    message: string;
    details?: any[];
  };
}

export interface ShippingMethod {
  id: string;
  name: string;
  fee: number;
  description: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface SeoSettings {
  siteTitle: string | null;
  homepageTitle: string | null;
  homepageMetaDescription: string | null;
  robotsTxt: string | null;
}

export interface AnalyticsConfig {
  id: string;
  name: string;
  type: string;
  isActive: boolean;
  usePartytown: boolean;
  config: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}

export interface CheckoutLanguageData {
  id: string;
  name: string;
  code: string;
  languageData: {
    pageTitle: string;
    checkoutSectionTitle: string;
    cartSectionTitle: string;
    customerNameLabel: string;
    customerNamePlaceholder: string;
    customerPhoneLabel: string;
    customerPhonePlaceholder: string;
    customerPhoneHelp: string;
    customerEmailLabel: string;
    customerEmailPlaceholder: string;
    shippingAddressLabel: string;
    shippingAddressPlaceholder: string;
    cityLabel: string;
    zoneLabel: string;
    areaLabel: string;
    shippingMethodLabel: string;
    orderNotesLabel: string;
    orderNotesPlaceholder: string;
    continueShoppingText: string;
    subtotalText: string;
    shippingText: string;
    discountText: string;
    totalText: string;
    discountCodePlaceholder: string;
    applyDiscountText: string;
    removeDiscountText: string;
    placeOrderText: string;
    processingText: string;
    emptyCartText: string;
    termsText: string;
    processingOrderTitle: string;
    processingOrderMessage: string;
    requiredFieldIndicator: string;
  };
  fieldVisibility: {
    showEmailField: boolean;
    showOrderNotesField: boolean;
    showAreaField: boolean;
  };
  isActive: boolean;
  isDefault: boolean;
}
export interface DiscountValidationResponse {
  valid: boolean;
  error?: string;
  discount?: Discount;
  discountAmount?: number;
  minPurchaseAmount?: number;
  minQuantity?: number;
}

export interface LocationData {
  id: string;
  name: string;
  type: "city" | "zone" | "area";
  parentId: string | null;
  isActive: boolean;
  sortOrder: number;
}

export interface AddToCartButtonProps {
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
