import { useAuthStore } from '../../store/useAuthStore';
import { Link } from 'react-router-dom';

// Placeholder icons - in a real app, you'd use an icon library like react-icons
const OrderIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

export default function UserDashboard() {
    const user = useAuthStore((state) => state.user);

    if (!user) {
        return (
            <div className="text-center py-20">
                <p>Loading user data...</p>
                <Link to="/auth" className="text-blue-600 hover:underline">Or login here</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 font-serif">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Welcome Back, {user.name}</h1>
                <p className="text-gray-500 mt-2">Here's your account overview. Manage your orders, settings, and more.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content: Left Column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Recent Orders */}
                    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-700">Recent Orders</h2>
                            <Link to="/orders" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
                                View All
                            </Link>
                        </div>
                        {/* Placeholder for recent orders list */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                <div>
                                    <p className="font-semibold text-gray-800">Order #12345</p>
                                    <p className="text-sm text-gray-500">Placed on: 2024-07-28</p>
                                </div>
                                <span className="text-sm font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">Shipped</span>
                            </div>
                            <div className="text-center text-gray-500 py-4">
                                You have no other recent orders.
                            </div>
                        </div>
                    </div>
                </div>

                {/* Side Content: Right Column */}
                <div className="space-y-8">
                    {/* Profile Information */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Profile Information</h2>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-500">Full Name</p>
                                <p className="font-medium text-gray-800">{user.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Email Address</p>
                                <p className="font-medium text-gray-800">{user.email}</p>
                            </div>
                             <div>
                                <p className="text-sm text-gray-500">User Role</p>
                                <p className="font-medium text-gray-800 capitalize">{user.role}</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Account Actions</h2>
                        <div className="space-y-3">
                            <Link to="/orders" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 transition-colors w-full">
                                <OrderIcon />
                                <span className="font-medium">My Orders</span>
                            </Link>
                            <Link to="/settings" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 transition-colors w-full">
                                <SettingsIcon />
                                <span className="font-medium">Profile Settings</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}