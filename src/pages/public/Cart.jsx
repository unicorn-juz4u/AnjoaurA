import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';

export default function Cart() {
  const { cart, removeFromCart, getCartTotal, clearCart } = useCartStore();

  return (
    <div className="bg-[#F9F8F6] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-serif italic text-charcoal">
            Shopping Cart
          </h1>
        </header>
        
        <div className="max-w-4xl mx-auto">
          {cart.length === 0 ? (
            <div className="text-center py-16 px-6 bg-white shadow-sm rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-700 mb-3">
                Your cart is currently empty.
              </h2>
              <p className="text-gray-500 mb-8">
                Explore our exquisite collection and find something you love.
              </p>
              <Link
                to="/collections"
                className="inline-block bg-charcoal text-white uppercase tracking-widest text-sm px-10 py-3 rounded-full hover:bg-opacity-90 transition-colors duration-300"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="bg-white shadow-sm rounded-lg">
              <ul className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <li key={item._id} className="p-6 flex items-center justify-between">
                    <div className="flex items-center">
                      <img src={item.imageUrl || '/placeholder.svg'} alt={item.name} className="w-24 h-24 object-cover rounded-md mr-6"/>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-gray-600">${item.price.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <div className="p-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Total:</h3>
                  <p className="text-2xl font-bold text-charcoal">${getCartTotal().toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                    <button
                        onClick={clearCart}
                        className="text-sm text-gray-500 hover:underline"
                    >
                        Clear Cart
                    </button>
                    <Link
                    to="/checkout"
                    className="inline-block bg-charcoal text-white uppercase tracking-widest text-sm px-10 py-3 rounded-full hover:bg-opacity-90 transition-colors duration-300"
                    >
                    Proceed to Checkout
                    </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}