import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, ShoppingBag, LayoutDashboard, Settings, LogOut } from 'lucide-react';

export default function Navbar({ userRole, userProfilePic }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Handle scroll effect for glassmorphism
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/', roles: ['guest', 'user', 'admin', 'affiliate'] },
        { name: 'Collections', path: '/collections', roles: ['guest', 'user', 'admin', 'affiliate'] },
        { name: 'Dashboard', path: '/dashboard', roles: ['user', 'admin', 'affiliate'] },
        { name: 'Affiliate', path: '/affiliate', roles: ['affiliate', 'admin'] },
        { name: 'Admin', path: '/admin', roles: ['admin'] },
    ];

    const filteredLinks = navLinks.filter(link => link.roles.includes(userRole));

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'h-16 bg-white/70 backdrop-blur-md border-b border-white/20' : 'h-24 bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">

                {/* LEFT: Mobile Toggle & Brand Identity */}
                <div className="flex items-center gap-8">
                    <button
                        className="lg:hidden p-2 hover:bg-black/5 rounded-full transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
                    </button>

                    <Link to="/" className="text-anjo-gold font-serif text-4xl font-bold tracking-tight sm:text-4xl group">
                        AnjoaurA
                        <span className="block h-px w-0 group-hover:w-full bg-black transition-all duration-500"></span>
                    </Link>
                </div>

                {/* CENTER: Desktop Navigation */}
                <ul className="hidden lg:flex items-center gap-10">
                    {filteredLinks.map((link) => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className={`text-[13px] uppercase tracking-[0.2em] font-medium transition-all hover:opacity-50 ${location.pathname === link.path ? 'text-black underline underline-offset-8' : 'text-gray-500'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* RIGHT: Actions */}
                <div className="flex items-center gap-5">
                    <button className="p-2 hover:opacity-50 transition-opacity">
                        <ShoppingBag size={20} strokeWidth={1.2} />
                    </button>

                    <div className="relative group">
                        <Link to="/dashboard" className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-full border border-black/10 overflow-hidden group-hover:border-black transition-all p-[2px]">
                                <img
                                    src={userProfilePic || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'}
                                    alt="Profile"
                                    className="w-full h-full object-cover rounded-full bg-gray-100"
                                />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* MOBILE OVERLAY MENU */}
            <div className={`fixed inset-0 bg-white z-[-1] flex flex-col pt-32 px-10 transition-transform duration-700 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                {filteredLinks.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-3xl font-serif mb-8 hover:italic transition-all"
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
        </nav>
    );
}