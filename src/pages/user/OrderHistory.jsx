import { ArrowRight } from 'lucide-react';

export default function OrderHistory() {
    const orders = [
        { id: 'AJ-9921', date: 'Jan 10, 2026', status: 'In Transit', total: '$240.00', items: 2 },
        { id: 'AJ-8812', date: 'Dec 15, 2025', status: 'Delivered', total: '$1,120.00', items: 5 },
    ];

    return (
        <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto min-h-screen animate-fadeIn">
            <header className="mb-12 border-b border-black/5 pb-8">
                <h1 className="text-4xl font-serif italic text-charcoal mb-2">My Archive</h1>
                <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400">Past Orders & Curations</p>
            </header>

            <div className="space-y-6">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="group flex flex-col md:flex-row justify-between items-start md:items-center p-8 bg-white border border-black/5 hover:border-black/20 transition-all duration-500"
                    >
                        <div className="space-y-1">
                            <span className="text-[10px] text-gray-400 tracking-widest uppercase">{order.date}</span>
                            <h3 className="text-lg font-medium tracking-tight">Order #{order.id}</h3>
                        </div>

                        <div className="mt-4 md:mt-0 flex gap-12 items-center">
                            <div className="text-center">
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Status</p>
                                <p className="text-xs font-medium uppercase tracking-tighter italic">{order.status}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Amount</p>
                                <p className="text-xs font-medium">{order.total}</p>
                            </div>
                            <button className="p-3 bg-charcoal text-white rounded-full hover:scale-110 transition-transform duration-300">
                                <ArrowRight size={16} strokeWidth={1.5} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}