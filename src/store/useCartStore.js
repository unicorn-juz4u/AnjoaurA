import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      
      addToCart: (product) => {
        const cart = get().cart;
        const productExists = cart.find((p) => p._id === product._id);
        if (productExists) {
          // If product exists, update quantity
          const updatedCart = cart.map((p) =>
            p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
          );
          set({ cart: updatedCart });
        } else {
          // If product doesn't exist, add it to the cart with quantity 1
          set({ cart: [...cart, { ...product, quantity: 1 }] });
        }
      },

      removeFromCart: (productId) => {
        set({
          cart: get().cart.filter((p) => p._id !== productId),
        });
      },

      clearCart: () => {
        set({ cart: [] });
      },

      // Example of a computed value
      getCartTotal: () => {
        return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getItemCount: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0);
      }
    }),
    {
      name: 'anjoaura-cart', // name of the item in the storage (must be unique)
    }
  )
);