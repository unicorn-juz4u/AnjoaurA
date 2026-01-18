import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const ProtectedRoute = ({ allowedRoles, userRole }) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/welcome" replace />;
    }

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/" replace />; // Or a dedicated "Unauthorized" page
    }

    return <Outlet />;
};

export default ProtectedRoute;