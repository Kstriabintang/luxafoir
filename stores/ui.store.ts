import { create } from "zustand";

interface UIState {
  cartOpen: boolean;
  searchOpen: boolean;
  mobileMenuOpen: boolean;
  quickViewSlug: string | null;

  openCart: () => void;
  closeCart: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  openQuickView: (slug: string) => void;
  closeQuickView: () => void;
}

/**
 * Global UI state for overlays (cart drawer, search, mobile menu, quick view).
 * Opening one overlay closes others to avoid stacking.
 */
export const useUIStore = create<UIState>((set) => ({
  cartOpen: false,
  searchOpen: false,
  mobileMenuOpen: false,
  quickViewSlug: null,

  openCart: () => set({ cartOpen: true, searchOpen: false, mobileMenuOpen: false }),
  closeCart: () => set({ cartOpen: false }),
  openSearch: () => set({ searchOpen: true, cartOpen: false, mobileMenuOpen: false }),
  closeSearch: () => set({ searchOpen: false }),
  toggleMobileMenu: () =>
    set((s) => ({ mobileMenuOpen: !s.mobileMenuOpen, cartOpen: false, searchOpen: false })),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
  openQuickView: (slug) => set({ quickViewSlug: slug }),
  closeQuickView: () => set({ quickViewSlug: null }),
}));
