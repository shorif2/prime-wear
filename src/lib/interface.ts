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
