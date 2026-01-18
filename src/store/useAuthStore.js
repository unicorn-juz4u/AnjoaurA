import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            // Action to handle successful login
            login: (userData, token) => set({
                user: userData,
                token: token,
                isAuthenticated: true
            }),

            // Action to handle logout
            logout: () => {
                localStorage.removeItem('token'); // Clear local token
                set({ user: null, token: null, isAuthenticated: false });
            },
        }),
        { name: 'anjoaura-auth' } // Key for localStorage
    )
);