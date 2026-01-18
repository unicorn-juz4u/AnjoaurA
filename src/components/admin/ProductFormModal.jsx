import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ProductFormModal({ isOpen, onClose, onSave, product }) {
    const [form, setForm] = useState({ name: '', price: '', description: '' });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        if (product) {
            setForm({
                name: product.name || '',
                price: product.price || '',
                description: product.description || ''
            });
        } else {
            setForm({ name: '', price: '', description: '' });
        }
        // Reset file input whenever the modal opens or product changes
        setImageFile(null);
    }, [product, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('price', form.price);
        formData.append('description', form.description);
        if (imageFile) {
            formData.append('image', imageFile);
        }
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="bg-anjo-cream p-8 rounded-lg shadow-2xl w-full max-w-lg relative"
            >
                <h2 className="text-3xl font-serif italic text-charcoal mb-6">{product ? 'Edit Perfume' : 'New Perfume'}</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <input
                        className="w-full p-3 bg-white/70 border border-black/10 rounded-md focus:ring-1 focus:ring-anjo-gold focus:outline-none transition"
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="w-full p-3 bg-white/70 border border-black/10 rounded-md focus:ring-1 focus:ring-anjo-gold focus:outline-none transition"
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={form.price}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        className="w-full p-3 bg-white/70 border border-black/10 rounded-md focus:ring-1 focus:ring-anjo-gold focus:outline-none transition"
                        name="description"
                        placeholder="Product Description"
                        rows="4"
                        value={form.description}
                        onChange={handleChange}
                    />
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                            Product Image
                        </label>
                        <input
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-charcoal/10 file:text-charcoal hover:file:bg-charcoal/20 transition"
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        {product && product.imageUrl && !imageFile && (
                            <div className="mt-3">
                                <p className="text-xs text-gray-500 mb-1">Current image:</p>
                                <img src={product.imageUrl} alt="Current product" className="w-20 h-24 object-cover rounded-md" />
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end gap-4 mt-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 rounded-full text-xs uppercase tracking-widest text-gray-600 hover:bg-black/5 transition">Cancel</button>
                        <button type="submit" className="px-8 py-2 rounded-full bg-charcoal text-white text-xs uppercase tracking-widest hover:bg-opacity-90 transition">Save</button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}

