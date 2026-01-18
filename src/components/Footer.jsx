import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, ArrowUpRight } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-black/5 pt-20 pb-10 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">

                    {/* Brand Section */}
                    <div className="md:col-span-1">
                        <Link to="/" className="text-2xl font-serif tracking-[0.3em] uppercase mb-6 block">
                            AnjoaurA
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-[200px]">
                            Curating timeless elegance through a modern Korean lens.
                        </p>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold mb-6 text-gray-400">Shop</h4>
                        <ul className="space-y-4 text-[13px] uppercase tracking-wider">
                            <li><Link to="/collections" className="hover:opacity-50 transition-all">New Arrivals</Link></li>
                            <li><Link to="/collections" className="hover:opacity-50 transition-all">Best Sellers</Link></li>
                            <li><Link to="/collections" className="hover:opacity-50 transition-all">All Collections</Link></li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold mb-6 text-gray-400">Inquiry</h4>
                        <ul className="space-y-4 text-[13px] uppercase tracking-wider">
                            <li><Link to="/about" className="hover:opacity-50 transition-all">Our Story</Link></li>
                            <li><Link to="/contact" className="hover:opacity-50 transition-all">Contact Us</Link></li>
                            <li><Link to="/shipping" className="hover:opacity-50 transition-all">Shipping & Returns</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold mb-6 text-gray-400">Newsletter</h4>
                        <div className="relative group">
                            <input
                                type="email"
                                placeholder="EMAIL ADDRESS"
                                className="w-full bg-transparent border-b border-black/20 pb-2 text-xs focus:outline-none focus:border-black transition-all"
                            />
                            <button className="absolute right-0 bottom-2 group-hover:translate-x-1 transition-transform">
                                <ArrowUpRight size={16} strokeWidth={1} />
                            </button>
                        </div>
                        <div className="flex gap-4 mt-8">
                            <Instagram size={18} strokeWidth={1.2} className="cursor-pointer hover:opacity-50" />
                            <Twitter size={18} strokeWidth={1.2} className="cursor-pointer hover:opacity-50" />
                            <Facebook size={18} strokeWidth={1.2} className="cursor-pointer hover:opacity-50" />
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-black/5 gap-4">
                    <p className="text-[10px] text-gray-400 tracking-widest">
                        © {currentYear} ANJOAURA. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex gap-8 text-[10px] text-gray-400 tracking-widest uppercase">
                        <Link to="/privacy-policy" className="hover:text-black transition-colors">Privacy Policy</Link>
                        <Link to="/terms-of-service" className="hover:text-black transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}