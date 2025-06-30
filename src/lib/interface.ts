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
