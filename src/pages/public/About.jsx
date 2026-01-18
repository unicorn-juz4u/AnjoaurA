export default function About() {
    return (
        <section className="pt-32 pb-20 px-6 bg-[#F9F8F6] min-h-screen">
            <div className="max-w-4xl mx-auto text-center">
                <span className="text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-4 block">
                    Heritage & Vision
                </span>
                <h1 className="text-5xl font-serif italic mb-12 text-charcoal">
                    The Soul of AnjoaurA
                </h1>
                <div className="grid md:grid-cols-2 gap-12 text-left items-center">
                    <p className="text-sm leading-relaxed text-gray-600 tracking-wide">
                        Born from the intersection of traditional Korean aesthetics and modern
                        minimalism, AnjoaurA curates pieces that aren't just worn—they are lived.
                    </p>
                    <div className="aspect-[3/4] bg-gray-200 overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                        <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80" alt="Minimalist Fashion" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </section>
    );
}