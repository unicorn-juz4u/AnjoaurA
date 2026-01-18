import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Data for our featured perfumes
const featuredPerfumes = [
    {
        name: 'Floral Bouquet',
        description: 'A lovely, fresh charm with a girlish allure.',
        style: {
            backgroundPosition: '50% 12%',
        }
    },
    {
        name: 'Love Game',
        description: 'A romantic scent that reminds you of your first love.',
        style: {
            backgroundPosition: '50% 37%',
        }
    },
    {
        name: 'Sweety Charms',
        description: 'A sweet, cute, and lively fragrance that pops.',
        style: {
            backgroundPosition: '50% 62%',
        }
    },
    {
        name: 'Soapy Glow',
        description: 'A pure scent with a gentle, soapy glow.',
        style: {
            backgroundPosition: '50% 87%',
        }
    }
];


export default function Home() {
    return (
        <div className="relative min-h-screen bg-anjo-cream overflow-hidden">
            {/* Background Aesthetic Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
                <h1 className="text-[15vw] font-serif italic text-black/[0.02] whitespace-nowrap">
                    Christian Dean
                </h1>
            </div>

            <div className="relative z-10 pt-32 px-6 max-w-7xl mx-auto flex flex-col items-center text-center min-h-[90vh]">

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <span className="text-anjo-gold text-[10px] tracking-[0.5em] uppercase mb-4 block">
                        Now in India
                    </span>
                    <h2 className="text-6xl md:text-8xl font-serif leading-tight text-charcoal mb-8">
                        Christian Dean
                        <br />
                        <span className="italic">Femme Perfume</span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl text-sm leading-relaxed mb-10 tracking-wide">
                        Experience the essence of luxury with the newly launched Christian Dean collection. Freshly imported, this batch features a range of exquisite perfumes. Discover your signature scent.
                    </p>

                     <div className="flex justify-center">
                        <Link to="/collections" className="group relative px-10 py-4 bg-charcoal text-white text-[11px] uppercase tracking-[0.3em] overflow-hidden">
                            <span className="relative z-10">Shop The Full Collection</span>
                            <motion.div className="absolute inset-0 bg-anjo-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Featured Collection Section */}
            <div className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-center text-4xl font-serif text-charcoal mb-4">The Collection</h3>
                    <p className="text-center text-gray-500 mb-16">Four scents, four stories. Find the one that speaks to you.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredPerfumes.map((perfume, index) => (
                            <motion.div
                                key={perfume.name}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.15 }}
                                className="group"
                            >
                                <div
                                    className="aspect-[4/5] bg-cover bg-no-repeat overflow-hidden relative"
                                    style={{
                                        backgroundImage: `url(/christian_dean_femme_perfume.jpeg)`,
                                        backgroundSize: '300%',
                                        ...perfume.style
                                    }}
                                >
                                     <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                                </div>
                                <div className="text-center mt-6">
                                    <h4 className="font-serif text-2xl text-charcoal mb-2">{perfume.name}</h4>
                                    <p className="text-gray-500 text-sm mb-4 h-10">{perfume.description}</p>
                                    <Link to="/collections" className="text-anjo-gold text-xs tracking-widest uppercase font-bold group-hover:underline flex items-center justify-center gap-2">
                                        Explore <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}