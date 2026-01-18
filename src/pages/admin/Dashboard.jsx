import { useState, useEffect } from 'react';
import { useCollectionStore } from '../../store/useCollectionStore';
import { useAuthStore } from '../../store/useAuthStore';
import apiClient from '../../api/client';
import ProductFormModal from '../../components/admin/ProductFormModal';
import { AnimatePresence } from 'framer-motion';

export default function AdminDashboard() {
    const { perfumes, fetchPerfumes, loading } = useCollectionStore();
    const { token } = useAuthStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetchPerfumes();
    }, [fetchPerfumes]);
    
    const getAuthConfig = (headers = {}) => ({
        headers: {
            ...headers,
            Authorization: `Bearer ${token}`,
        },
    });

    const handleSaveProduct = async (productData) => {
        // productData is now FormData
        try {
            const config = getAuthConfig({ 'Content-Type': 'multipart/form-data' });
            if (selectedProduct) {
                await apiClient.put(`/products/${selectedProduct._id}`, productData, config);
            } else {
                await apiClient.post('/products', productData, config);
            }
            fetchPerfumes();
        } catch (error) {
            alert('Failed to save product. ' + (error.response?.data?.message || error.message));
        } finally {
            setIsModalOpen(false);
            setSelectedProduct(null);
        }
    };

    const handleDeleteProduct = async (productId) => {
        if (window.confirm('Are you sure you want to delete this exquisite item?')) {
            try {
                await apiClient.delete(`/products/${productId}`, getAuthConfig());
                fetchPerfumes();
            } catch (error) {
                alert('Failed to delete product. ' + (error.response?.data?.message || ''));
            }
        }
    };

    return (
        <div className="py-20 px-4 sm:px-6 lg:px-8 bg-anjo-cream min-h-screen">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-12 border-b border-black/10 pb-6">
                    <h1 className="text-4xl font-serif italic text-charcoal">
                        Product Atelier
                    </h1>
                    <button
                        onClick={() => {
                            setSelectedProduct(null);
                            setIsModalOpen(true);
                        }}
                        className="inline-block bg-charcoal text-white uppercase tracking-widest text-xs px-8 py-3 rounded-full hover:bg-opacity-90 transition-colors duration-300"
                    >
                        Add New Perfume
                    </button>
                </header>

                {loading ? <p>Loading masterpieces...</p> : (
                    <div className="bg-white/50 shadow-sm rounded-lg overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200/50">
                            <thead className="bg-transparent">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-[10px] font-medium text-gray-400 uppercase tracking-[0.2em]">Image</th>
                                    <th scope="col" className="px-6 py-4 text-left text-[10px] font-medium text-gray-400 uppercase tracking-[0.2em]">Name</th>
                                    <th scope="col" className="px-6 py-4 text-left text-[10px] font-medium text-gray-400 uppercase tracking-[0.2em]">Price</th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-transparent divide-y divide-gray-200/50">
                                {perfumes.map((perfume) => (
                                    <tr key={perfume._id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <img src={perfume.imageUrl || 'https://via.placeholder.com/40'} alt={perfume.name} className="w-12 h-16 object-cover rounded-sm" />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap font-serif italic text-lg text-gray-800">{perfume.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{perfume.price}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => {
                                                    setSelectedProduct(perfume);
                                                    setIsModalOpen(true);
                                                }}
                                                className="text-gray-500 hover:text-anjo-gold transition-colors mr-6 text-xs uppercase tracking-widest"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProduct(perfume._id)}
                                                className="text-red-400 hover:text-red-700 transition-colors text-xs uppercase tracking-widest"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                 <AnimatePresence>
                    {isModalOpen && <ProductFormModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSave={handleSaveProduct}
                        product={selectedProduct}
                    />}
                </AnimatePresence>
            </div>
        </div>
    );
}