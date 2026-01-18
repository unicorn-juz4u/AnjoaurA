import { motion } from 'framer-motion';

export default function StatusCard({ title, value, subtitle, icon: Icon }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="p-8 bg-white border border-black/5 flex flex-col justify-between h-48 group transition-all hover:border-anjo-gold/30"
        >
            <div className="flex justify-between items-start">
                <div className="p-3 rounded-full bg-anjo-cream text-anjo-gold">
                    <Icon size={20} strokeWidth={1.2} />
                </div>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest">{subtitle}</span>
            </div>
            <div>
                <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-1">{title}</p>
                <p className="text-3xl font-serif text-charcoal group-hover:italic transition-all">{value}</p>
            </div>
        </motion.div>
    );
}