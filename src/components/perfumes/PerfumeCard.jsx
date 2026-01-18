import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function PerfumeCard({ perfume }) {
    const productId = perfume._id;

    return (
        <Link to={`/product/${productId}`}>
            <motion.div
                whileHover={{ y: -10 }}
                className="group relative bg-white border border-black/[0.03] overflow-hidden"
            >
                {/* Batch Badge */}
                {perfume.batchDate && (
                    <div className="absolute top-4 right-4 z-10">
                        <span className="text-[8px] tracking-[0.2em] bg-charcoal text-white px-2 py-1 uppercase">
                            Imported Batch: {perfume.batchDate}
                        </span>
                    </div>
                )}

                {/* Product Image Space */}
                <div className="aspect-[4/5] bg-[#F3F3F3] relative overflow-hidden">
                    <img
                        src={perfume.imageUrl || `https://via.placeholder.com/400x500?text=${perfume.name}`}
                        alt={perfume.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                        onError={(e) => e.target.src = `https://via.placeholder.com/400x500?text=${perfume.name}`}
                    />
                </div>

                {/* Product Info */}
                <div className="p-6 text-center">
                    <h3 className="font-serif italic text-xl text-charcoal mb-1">{perfume.name}</h3>
                    {perfume.notes && <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-4">{perfume.notes}</p>}

                    <div className="flex items-center justify-center gap-4 pt-4 border-t border-black/5">
                        <span className="text-sm font-medium">₹{perfume.price}</span>
                        <div className="text-[10px] uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-anjo-gold hover:border-anjo-gold transition-colors">
                            View Details
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}