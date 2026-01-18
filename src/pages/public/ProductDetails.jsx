import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';
import apiClient from '../../api/client';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product", error);
        // Handle error state, maybe show a not found component
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      // Optional: Show a toast notification or confirmation
    }
  };

  if (loading || !product) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-anjo-cream z-50">
        <div className="text-xl font-serif tracking-[0.5em] uppercase animate-pulse opacity-50">
          AnjoaurA
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-anjo-cream text-charcoal min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-sm tracking-widest uppercase mb-8">
          <Link to="/collections" className="hover:underline opacity-70">Collections</Link>
          <span className="mx-2">/</span>
          <span>{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="w-full aspect-w-1 aspect-h-1 bg-white rounded-lg overflow-hidden">
            <img 
              src={product.imageUrl || '/placeholder.svg'} 
              alt={product.name} 
              className="w-full h-full object-cover" 
            />
          </div>

          <div className="pt-8">
            <h1 className="text-4xl lg:text-5xl font-serif italic mb-4">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold text-gray-800 mb-6">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              {product.description}
            </p>
            
            <button
              onClick={handleAddToCart}
              className="w-full bg-charcoal text-white uppercase tracking-widest text-sm py-4 rounded-full hover:bg-opacity-90 transition-all duration-300"
            >
              Add to Cart
            </button>
            
            <div className="mt-8 text-xs uppercase tracking-wider text-gray-500">
              <p>Category: {product.category}</p>
              <p className="mt-1">Item No. {product._id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}