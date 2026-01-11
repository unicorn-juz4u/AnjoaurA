export default function Collections() {
    const categories = ["Best Sellers", "New Arrivals", "Premium", "Budget"];

    return (
        <div className="container">
            <h1>Our Collections</h1>
            <div className="filter-bar">
                {categories.map(cat => <button key={cat} className="filter-btn">{cat}</button>)}
            </div>
            <div className="product-grid">
                {/* Placeholder for real products later */}
                <div className="product-card">Product 1</div>
                <div className="product-card">Product 2</div>
            </div>
        </div>
    );
}