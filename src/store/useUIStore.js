import { create } from 'zustand';

const INITIAL_NAVBAR_HEIGHT = 96; // Corresponds to h-24 in Tailwind CSS

export const useUIStore = create((set) => ({
    theme: 'light', // light, dark, or luxury
    toggleTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light'
    })),

    isCartOpen: false,
    toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
    
    navbarHeight: INITIAL_NAVBAR_HEIGHT,
    setNavbarHeight: (height) => set({ navbarHeight: height }),
}));