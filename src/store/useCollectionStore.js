import { create } from 'zustand';
import apiClient from '../api/client';

export const useCollectionStore = create((set) => ({
    perfumes: [],
    loading: false,
    error: null,

    // The Main Product Fetcher
    fetchPerfumes: async () => {
        set({ loading: true, error: null });
        try {
            const response = await apiClient.get('/products'); // Your backend endpoint
            set({ perfumes: response.data, loading: false });
        } catch (err) {
            set({
                error: err.response?.data?.message || "Luxury is worth the wait. Error loading scents.",
                loading: false
            });
        }
    },

    // Admin/Role Feature: Update Stock for PAN India Delivery
    updateStock: async (id, newStock) => {
        try {
            await apiClient.patch(`/products/${id}`, { stock: newStock });
            set((state) => ({
                perfumes: state.perfumes.map(p => p.id === id ? { ...p, stock: newStock } : p)
            }));
        } catch (err) {
            console.error("Stock update failed", err);
        }
    }
}));