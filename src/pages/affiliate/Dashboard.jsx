import { useAuthStore } from '../../store/useAuthStore';
import { Link } from 'react-router-dom';
import { Copy, DollarSign, Users, Gift } from 'lucide-react';

export default function AffiliateDashboard() {
    const user = useAuthStore((state) => state.user);

    const referralLink = `https://anjoaura.com/ref/${user?.affiliateCode}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        alert('Referral link copied to clipboard!');
    };

    if (!user) {
        return <div className="text-center py-20">Loading affiliate data...</div>;
    }

    // Placeholder stats
    const stats = {
        earnings: 150.75,
        referrals: 25,
        conversionRate: '5.2'
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-serif text-charcoal font-bold">Affiliate Dashboard</h1>
                    <p className="text-gray-500 mt-2">Track your earnings and grow your influence with AnjoaurA.</p>
                </div>

                {/* Referral Link Section */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Referral Link</h2>
                    <div className="flex items-center gap-4 p-4 border rounded-md bg-gray-50">
                        <input
                            type="text"
                            readOnly
                            value={referralLink}
                            className="flex-grow p-2 border-none bg-transparent focus:ring-0"
                        />
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-2 px-4 py-2 bg-charcoal text-white rounded-md hover:bg-opacity-80 transition-colors"
                        >
                            <Copy size={16} />
                            <span>Copy</span>
                        </button>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard icon={<DollarSign />} title="Total Earnings" value={`$${stats.earnings.toFixed(2)}`} />
                    <StatCard icon={<Users />} title="Total Referrals" value={stats.referrals} />
                    <StatCard icon={<Gift />} title="Conversion Rate" value={`${stats.conversionRate}%`} />
                </div>
                
                {/* Placeholder for future content */}
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                     <h2 className="text-xl font-semibold text-gray-700 mb-2">Your Referred Users</h2>
                     <p className="text-gray-500">A list of users you've referred will appear here soon.</p>
                </div>
            </div>
        </div>
    );
}

const StatCard = ({ icon, title, value }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-6">
        <div className="bg-anjo-gold/10 text-anjo-gold p-4 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-charcoal">{value}</p>
        </div>
    </div>
);