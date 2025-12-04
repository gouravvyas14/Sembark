import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import type { Product } from '../services/api';
import { getCategories, getProducts } from '../services/api';

const Home = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    // Dynamic Text State
    const [textIndex, setTextIndex] = useState(0);
    const phrases = [
        "Curating requirements with our products",
        "Elevating lifestyles with premium quality",
        "Discovering excellence in every detail"
    ];

    const [searchParams, setSearchParams] = useSearchParams();
    const selectedCats = searchParams.getAll('category');
    const sortOrder = searchParams.get('sort') || 'asc';
    const searchQuery = searchParams.get('search') || '';

    // Effect for rotating text
    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % phrases.length);
        }, 4000); // Slower rotation (4s) for elegance
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        getCategories().then(setCategories);
    }, []);

    useEffect(() => {
        setLoading(true);
        getProducts(selectedCats, sortOrder)
            .then(setProducts)
            .finally(() => setLoading(false));
    }, [searchParams]);

    useEffect(() => {
        if (searchQuery) {
            const filtered = products.filter(p =>
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }, [products, searchQuery]);

    const handleCategoryChange = (cat: string) => {
        const newParams = new URLSearchParams(searchParams);
        const current = newParams.getAll('category');

        if (current.includes(cat)) {
            newParams.delete('category');
            current.filter(c => c !== cat).forEach(c => newParams.append('category', c));
        } else {
            newParams.append('category', cat);
        }
        setSearchParams(newParams);
    };

    const clearFilters = () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete('category');
        setSearchParams(newParams);
    };

    return (
        <div className="page-container animate-fade-in">
            {/* ENHANCED HERO SECTION */}
            <div
                className="section-hero"
                style={{
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'var(--bg-secondary)',
                    padding: '8rem 1rem',
                    borderBottom: '1px solid var(--border)'
                }}
            >
                {/* Subtle Spotlight Effect Background */}
                <div
                    style={{
                        position: 'absolute',
                        top: '0',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '100%',
                        maxWidth: '800px',
                        height: '100%',
                        background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
                        pointerEvents: 'none'
                    }}
                />

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h1
                        className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-white"
                        style={{ letterSpacing: '-0.03em' }}
                    >
                        Sembark Collection
                    </h1>

                    {/* Elegant Dynamic Text Container */}
                    <div className="h-20 flex items-center justify-center">
                        <p
                            key={textIndex}
                            className="text-xl md:text-2xl font-light animate-fade-in"
                            style={{
                                color: 'var(--text-secondary)',
                                letterSpacing: '0.02em',
                                opacity: 0.9
                            }}
                        >
                            {phrases[textIndex]}
                        </p>
                    </div>
                </div>
            </div>

            {/* Products Layout */}
            <div className="section-content">
                <div className="layout-split">

                    {/* Sidebar Filters */}
                    <aside className="sidebar-wrapper" style={{ minWidth: '260px' }}>
                        <div
                            className="sidebar-filters sticky top-24"
                            style={{
                                background: 'var(--surface)',
                                border: '1px solid var(--border)',
                                borderRadius: '1rem',
                                padding: '1.5rem',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h3 className="font-semibold text-white" style={{ fontSize: '1.1rem', letterSpacing: '-0.01em' }}>
                                    Filters
                                </h3>
                                {selectedCats.length > 0 && (
                                    <button
                                        onClick={clearFilters}
                                        className="text-xs font-medium transition-colors hover:text-white"
                                        style={{
                                            color: 'var(--accent)',
                                            background: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: '4px 8px'
                                        }}
                                    >
                                        Reset All
                                    </button>
                                )}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>
                                    Categories
                                </p>
                                {categories.map((cat) => {
                                    const isSelected = selectedCats.includes(cat);
                                    return (
                                        <label
                                            key={cat}
                                            className="group cursor-pointer transition-all duration-200"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.75rem',
                                                padding: '0.75rem',
                                                borderRadius: '0.5rem',
                                                background: isSelected ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isSelected) e.currentTarget.style.background = 'var(--surface-hover)';
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isSelected) e.currentTarget.style.background = 'transparent';
                                            }}
                                        >
                                            {/* Custom Checkbox - No Tick, Just Fill */}
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={() => handleCategoryChange(cat)}
                                                style={{
                                                    appearance: 'none',
                                                    width: '1.125rem',
                                                    height: '1.125rem',
                                                    border: `1.5px solid ${isSelected ? 'var(--accent)' : 'var(--text-tertiary)'}`,
                                                    borderRadius: '4px',
                                                    background: isSelected ? 'var(--accent)' : 'transparent',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s ease'
                                                }}
                                            />

                                            <span
                                                className="capitalize text-sm select-none"
                                                style={{
                                                    color: isSelected ? 'white' : 'var(--text-secondary)',
                                                    fontWeight: isSelected ? 500 : 400,
                                                    transition: 'color 0.2s'
                                                }}
                                            >
                                                {cat}
                                            </span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <main className="flex-1">
                        {loading ? (
                            <div className="state-empty">
                                <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <div>Loading products...</div>
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="state-empty">
                                <div className="text-xl font-medium mb-2 text-white">No products found</div>
                                <p>Try adjusting your filters</p>
                            </div>
                        ) : (
                            <>
                                <div className="products-scroll">
                                    <div className="card-grid">
                                        {filteredProducts.map((p, index) => (
                                            <div
                                                key={p.id}
                                                className="product-card animate-fade-in"
                                                style={{ animationDelay: `${index * 50}ms` }}
                                            >
                                                <div className="card-image-container">
                                                    <img
                                                        src={p.image}
                                                        alt={p.title}
                                                        className="card-image transition-transform duration-300 hover:scale-105"
                                                    />
                                                </div>
                                                <div className="card-body">
                                                    <h2 className="font-medium text-sm mb-2 line-clamp-2 h-10 text-white">
                                                        {p.title}
                                                    </h2>
                                                    <p className="text-xl font-semibold mb-4 text-indigo-400">
                                                        ${p.price.toFixed(2)}
                                                    </p>
                                                    <Link
                                                        to={`/product/${p.id}`}
                                                        className="block w-full text-center py-2 px-4 rounded bg-gray-800 hover:bg-gray-700 text-sm font-medium transition-colors text-white"
                                                    >
                                                        View Details
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Home;