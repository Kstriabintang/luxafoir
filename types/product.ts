export interface ProductVariant {
  id: string;
  size: string;
  stock: number;
  sku?: string | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string | null;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  isActive: boolean;
  startDate?: string | null;
  endDate?: string | null;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number | null;
  images: string[];
  categoryId: string;
  category?: Category;
  collectionId?: string | null;
  collection?: Collection | null;
  variants: ProductVariant[];
  tags: string[];
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
}

/** Lightweight shape used by cards, grids, and search results. */
export interface ProductCardData {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number | null;
  images: string[];
  category?: string;
  isNew?: boolean;
  soldOut?: boolean;
}

export type SortOption =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "best-selling";

export interface ProductFilters {
  category?: string;
  sizes?: string[];
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  sort?: SortOption;
}
