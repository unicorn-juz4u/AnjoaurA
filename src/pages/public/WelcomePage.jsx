import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WelcomePage() {
    return (
        <div className="relative min-h-screen bg-anjo-cream overflow-hidden">
            {/* Background Aesthetic Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
                <h1 className="text-[15vw] font-serif italic text-black/[0.02] whitespace-nowrap">
                    Sophistication Defined
                </h1>
            </div>

            <div className="relative z-10 pt-32 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[90vh]">

                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <span className="text-anjo-gold text-[10px] tracking-[0.5em] uppercase mb-4 block">
                        New Collection 2026
                    </span>
                    <h2 className="text-6xl md:text-8xl font-serif leading-tight text-charcoal mb-8">
                        The Art of <br />
                        <span className="italic">Presence.</span>
                    </h2>
                    <p className="text-gray-500 max-w-md text-sm leading-relaxed mb-10 tracking-wide">
                        Explore a curated selection of pieces designed to elevate your everyday ritual.
                        Korean-inspired minimalism meets Parisian structural elegance.
                    </p>

                    <div className="flex flex-wrap gap-6">
                        <Link to="/collections" className="group relative px-10 py-4 bg-charcoal text-white text-[11px] uppercase tracking-[0.3em] overflow-hidden">
                            <span className="relative z-10">Explore Collection</span>
                            <motion.div className="absolute inset-0 bg-anjo-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </Link>
                        <Link to="/auth" className="px-10 py-4 border border-black/10 text-[11px] uppercase tracking-[0.3em] hover:border-black transition-colors">
                            Join the Atelier
                        </Link>
                    </div>
                </motion.div>

                {/* Right Visuals */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    className="relative aspect-[4/5] bg-gray-100 overflow-hidden shadow-2xl"
                >
                    <img
                        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80"
                        alt="Luxury Fashion"
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
                    />
                    <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-md p-6 border border-white/20 text-white">
                        <p className="text-[10px] uppercase tracking-widest mb-1">Featured Item</p>
                        <p className="font-serif italic text-xl">L'ombre Coat</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}