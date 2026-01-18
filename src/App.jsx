import { Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import ProtectedRoute from './routes/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// --- Stores ---
import { useAuthStore } from './store/useAuthStore';
import { useUIStore } from './store/useUIStore';

// --- Lazy Loaded Pages ---
const Home = lazy(() => import('./pages/public/Home'));
const Collections = lazy(() => import('./pages/public/Collections'));
const ProductDetails = lazy(() => import('./pages/public/ProductDetails'));
const Auth = lazy(() => import('./pages/public/Auth'));
const WelcomePage = lazy(() => import('./pages/public/WelcomePage'));
const About = lazy(() => import('./pages/public/About'));
const Contact = lazy(() => import('./pages/public/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/public/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/public/TermsOfService'));
const UserDashboard = lazy(() => import('./pages/user/Dashboard'));
const OrderHistory = lazy(() => import('./pages/user/OrderHistory'));
const ProfileSettings = lazy(() => import('./pages/user/ProfileSettings'));
const Cart = lazy(() => import('./pages/public/Cart'));
const Checkout = lazy(() => import('./pages/public/Checkout'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AffiliateDashboard = lazy(() => import('./pages/affiliate/Dashboard'));
const NotFound = lazy(() => import('./pages/public/NotFound'));

export default function App() {
  const user = useAuthStore((state) => state.user);
  const navbarHeight = useUIStore((state) => state.navbarHeight);
  const location = useLocation();

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const userRole = user ? user.role : 'guest';

  return (
    <div className="min-h-screen flex flex-col bg-anjo-cream">
      <Navbar />

      <main 
        className="grow transition-all duration-300"
        style={{ paddingTop: `${navbarHeight}px` }}
      >
        <Suspense fallback={<LuxuryLoader />}>
          <Routes location={location} key={location.pathname}>

            {/* PUBLIC ROUTES */}
            <Route path="/" element={<Home />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />

            {/* PROTECTED: CUSTOMER/USER */}
            <Route element={<ProtectedRoute allowedRoles={['user', 'admin', 'affiliate']} userRole={userRole} />}>
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/orders" element={<OrderHistory />} />
              <Route path="/settings" element={<ProfileSettings />} />
              <Route path="/checkout" element={<Checkout />} />
            </Route>

            {/* PROTECTED: AFFILIATE */}
            <Route element={<ProtectedRoute allowedRoles={['affiliate', 'admin']} userRole={userRole} />}>
              <Route path="/affiliate" element={<AffiliateDashboard />} />
            </Route>

            {/* PROTECTED: ADMIN */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} userRole={userRole} />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

// Minimalist Luxury Loader Component
const LuxuryLoader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-anjo-cream z-50">
    <div className="text-xl font-serif tracking-[0.5em] uppercase animate-pulse opacity-50">
      AnjoaurA
    </div>
  </div>
);