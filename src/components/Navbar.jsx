import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useUIStore } from '../store/useUIStore'; // Import the UI store

export default function Navbar() {
    // Component State
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    // Auth State from Zustand
    const { isAuthenticated, user, logout } = useAuthStore();
    const userRole = user ? user.role : 'guest';

    // UI State from Zustand
    const setNavbarHeight = useUIStore((state) => state.setNavbarHeight);

    // Hooks
    const location = useLocation();
    const navigate = useNavigate();

    // Close overlays on navigation
    useEffect(() => {
        setIsMenuOpen(false);
        setIsProfileDropdownOpen(false);
    }, [location.pathname]);

    // Scroll listener for glass effect and dynamic height
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            setScrolled(isScrolled);
            setNavbarHeight(isScrolled ? 64 : 96); // h-16 (64px) or h-24 (96px)
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [setNavbarHeight]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // --- Navigation Links ---
    const navLinks = [
        { name: 'Home', path: '/', roles: ['guest', 'user', 'admin', 'affiliate'] },
        { name: 'Collections', path: '/collections', roles: ['guest', 'user', 'admin', 'affiliate'] },
        { name: 'Dashboard', path: '/dashboard', roles: ['user'] },
        { name: 'Affiliate', path: '/affiliate', roles: ['affiliate'] },
        { name: 'Admin', path: '/admin', roles: ['admin'] },
    ];
    const filteredLinks = navLinks.filter(link => link.roles.includes(userRole));
    
    // --- Dynamic Profile Path ---
    const getProfilePath = () => {
        if (!isAuthenticated) return '/auth';
        if (userRole === 'admin') return '/admin';
        if (userRole === 'affiliate') return '/affiliate';
        return '/dashboard';
    };

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
            ? 'h-16 bg-white/80 backdrop-blur-xl border-b border-black/5 shadow-sm'
            : 'h-24 bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">

                {/* LEFT: Hamburger & Brand */}
                <div className="flex items-center gap-6">
                    <button
                        className="lg:hidden p-2 hover:bg-black/5 rounded-full transition-all active:scale-95"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={22} strokeWidth={1} /> : <Menu size={22} strokeWidth={1} />}
                    </button>

                    <Link to="/" className="group flex flex-col">
                        <span className="text-gray-800 font-serif text-3xl tracking-tighter leading-none">
                            AnjoaurA
                        </span>
                    </Link>
                </div>

                {/* CENTER: Desktop Links */}
                <ul className="hidden lg:flex items-center gap-10">
                    {filteredLinks.map((link) => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className={`text-[11px] uppercase tracking-[0.25em] font-medium transition-all hover:text-gray-900 ${location.pathname === link.path ? 'text-black' : 'text-gray-500'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* RIGHT: Cart & Profile */}
                <div className="flex items-center gap-4">
                    <Link to="/cart" className="p-2 text-gray-600 hover:text-black transition-colors relative">
                        <ShoppingBag size={20} strokeWidth={1.2} />
                        {/* Add cart count logic here if available */}
                    </Link>

                    <div className="relative">
                        <button onClick={() => setIsProfileDropdownOpen(prev => !prev)} className="relative group">
                             <div className={`w-10 h-10 rounded-full border transition-all duration-500 flex items-center justify-center overflow-hidden ${!isAuthenticated ? 'border-dashed border-gray-300' : 'border-black/10 p-[2px] group-hover:border-gray-400'
                            }`}>
                                {!isAuthenticated ? (
                                    <User size={18} strokeWidth={1} className="text-gray-400" />
                                ) : (
                                    <img
                                        src={user.profilePic || `https://api.dicebear.com/7.x/micah/svg?seed=${user.email}`}
                                        alt="Profile"
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                )}
                            </div>
                        </button>
                        
                        {/* Profile Dropdown */}
                        {isProfileDropdownOpen && isAuthenticated && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                                <div className="px-4 py-2 border-b">
                                    <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                </div>
                                <Link to={getProfilePath()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</Link>
                                <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                                    Logout
                                </button>
                            </div>
                        )}

                         {isProfileDropdownOpen && !isAuthenticated && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                                <Link to="/auth" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Login / Sign Up</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* MOBILE NAVIGATION OVERLAY */}
            <div className={`fixed inset-0 bg-white/95 backdrop-blur-2xl z-[-1] flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}>
                <div className="flex flex-col items-center gap-8">
                    {filteredLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className="text-4xl font-serif text-charcoal hover:italic hover:text-gray-900 transition-all duration-300"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        to={getProfilePath()}
                        className="mt-8 px-8 py-3 border border-black text-[11px] uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                    >
                        {isAuthenticated ? 'My Account' : 'Login'}
                    </Link>
                     {isAuthenticated && (
                         <button onClick={handleLogout} className="mt-4 text-sm text-red-600">Logout</button>
                    )}
                </div>
            </div>
        </nav>
    );
}