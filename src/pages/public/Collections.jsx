import { useEffect } from 'react';
import { useCollectionStore } from '../../store/useCollectionStore';
import PerfumeCard from '../../components/perfumes/PerfumeCard';

export default function Collections() {
    const { perfumes, loading, fetchPerfumes } = useCollectionStore();

    useEffect(() => {
        fetchPerfumes();
    }, [fetchPerfumes]);

    if (loading) return (
        <div className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
                <SkeletonGrid />
            </div>
        </div>
    );

    return (
        <div className="py-24 px-6 bg-anjo-cream">
            <div className="max-w-7xl mx-auto">
                 <div className="text-center mb-16">
                    <h1 className="text-5xl font-serif text-charcoal">Our Collection</h1>
                    <p className="text-gray-500 mt-4 max-w-xl mx-auto">Inspired by moments, created for memories. Explore the full range of Christian Dean's imported femme perfumes.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {perfumes.map(perfume => {
                        return <PerfumeCard key={perfume._id} perfume={perfume} />;
                    })}
                </div>
            </div>
        </div>
    );
}

function SkeletonGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-pulse">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-[4/5] bg-gray-200" />
            ))}
        </div>
    );
}