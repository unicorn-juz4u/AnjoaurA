import { Camera, ShieldCheck, Bell, CreditCard } from 'lucide-react';

export default function ProfileSettings() {
    return (
        <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-screen animate-fadeIn">
            <header className="mb-16">
                <h1 className="text-4xl font-serif italic text-charcoal mb-3">Account Atelier</h1>
                <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400">Personalize your AnjoaurA experience</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                {/* Sidebar Navigation */}
                <nav className="space-y-8">
                    <button className="block text-[11px] uppercase tracking-widest font-bold border-b border-black pb-1">General Profile</button>
                    <button className="block text-[11px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors">Security & Privacy</button>
                    <button className="block text-[11px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors">Order Preferences</button>
                    <button className="block text-[11px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors">Payment Methods</button>
                </nav>

                {/* Form Area */}
                <div className="md:col-span-2 space-y-12">
                    {/* Avatar Edit */}
                    <div className="flex items-center gap-8 group">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border border-black/5 p-1 transition-all group-hover:border-black/20">
                            <img src="https://via.placeholder.com/150" alt="Profile" className="w-full h-full object-cover rounded-full bg-gray-50" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer text-white">
                                <Camera size={20} strokeWidth={1.5} />
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium mb-1 uppercase tracking-tight">Profile Portrait</h4>
                            <p className="text-[11px] text-gray-400 leading-relaxed uppercase tracking-tighter">Recommended size: 1000 x 1000px</p>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <form className="grid grid-cols-1 gap-10">
                        <div className="relative group">
                            <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 block mb-2">Display Name</label>
                            <input type="text" className="w-full bg-transparent border-b border-black/10 py-2 text-sm focus:outline-none focus:border-black transition-all" placeholder="Enter name..." />
                        </div>

                        <div className="relative group">
                            <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 block mb-2">Email Address</label>
                            <input type="email" className="w-full bg-transparent border-b border-black/10 py-2 text-sm focus:outline-none focus:border-black transition-all" placeholder="email@anjoaura.shop" />
                        </div>

                        <button className="mt-6 w-full md:w-max px-12 py-4 bg-charcoal text-white text-[11px] uppercase tracking-[0.3em] hover:bg-black transition-all">
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}