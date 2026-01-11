import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react'; // Import lazy and Suspense
import ProtectedRoute from './routes/ProtectedRoute';
import Navbar from './components/Navbar';

// Lazy load the components
const Auth = lazy(() => import('./pages/public/Auth'));
const Home = lazy(() => import('./pages/public/Home'));
const Collections = lazy(() => import('./pages/public/Collections'));
const UserDashboard = lazy(() => import('./pages/user/Dashboard'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AffiliateDashboard = lazy(() => import('./pages/affiliate/Dashboard'));
const NotFound = lazy(() => import('./pages/public/NotFound'));

export default function App() {
  const user = { role: 'guest' };

  return (
    <>
      <Navbar userRole={user.role} />
      {/* Suspense shows a loader while the specific page code is being downloaded */}
      <Suspense fallback={<div>Loading Page...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/welcome" element={<WelcomePage />} />

          {/* ADD THIS LINE: The path to your Login/Signup page */}
          <Route path="/auth" element={<Auth />} />

          {/* Admin and other roles only load their code when needed */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} userRole={user.role} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['affiliate', 'admin']} userRole={user.role} />}>
            <Route path="/affiliate" element={<AffiliateDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['user', 'admin', 'affiliate']} userRole={user.role} />}>
            <Route path="/dashboard" element={<UserDashboard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}