import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Product } from '../services/api';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [isImageLoading, setIsImageLoading] = useState(true);

    useEffect(() => {
        if (id) {
            setProduct(null); // Reset on id change
            getProductById(id).then(setProduct);
        }
    }, [id]);

    // --- SKELETON LOADING STATE ---
    if (!product) return (
        <div className="page-container" style={{ padding: '4rem 2rem', minHeight: '100vh' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ width: '120px', height: '24px', background: 'var(--surface)', borderRadius: '4px', marginBottom: '2rem' }} className="animate-pulse" />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
                    <div style={{ aspectRatio: '1', background: 'var(--surface)', borderRadius: '1rem' }} className="animate-pulse" />
                    <div>
                        <div style={{ width: '60%', height: '40px', background: 'var(--surface)', borderRadius: '8px', marginBottom: '1rem' }} className="animate-pulse" />
                        <div style={{ width: '100%', height: '150px', background: 'var(--surface)', borderRadius: '12px', marginBottom: '2rem' }} className="animate-pulse" />
                        <div style={{ width: '100%', height: '60px', background: 'var(--surface)', borderRadius: '12px' }} className="animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="page-container animate-fade-in" style={{ paddingBottom: '4rem' }}>
            {/* FIX: This style block ensures the image is only sticky on larger screens (desktop/tablet).
                On mobile, it behaves normally (static), preventing the overlap issue.
            */}
            <style>{`
                @media (min-width: 900px) {
                    .desktop-sticky {
                        position: sticky;
                        top: 100px;
                    }
                }
            `}</style>

            <div style={{
                maxWidth: '1280px',
                margin: '0 auto',
                padding: 'clamp(1rem, 3vw, 2rem) clamp(1rem, 3vw, 1.5rem)'
            }}>

                {/* Navigation Header */}
                <nav style={{ marginBottom: 'clamp(1.5rem, 4vw, 2rem)' }}>
                    <button
                        onClick={() => navigate(-1)}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: 'var(--text-secondary)',
                            background: 'transparent',
                            border: 'none',
                            fontSize: '0.95rem',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'color 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                        onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                    >
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Browsing
                    </button>
                </nav>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
                    gap: 'clamp(2rem, 5vw, 5rem)',
                    alignItems: 'start'
                }}>
                    {/* LEFT COLUMN: Product Image */}
                    {/* FIX: Applied the 'desktop-sticky' class instead of inline style */}
                    <div className="desktop-sticky">
                        <div
                            style={{
                                background: '#FFFFFF',
                                borderRadius: '1.5rem',
                                padding: 'clamp(1.5rem, 4vw, 3rem)',
                                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)',
                                position: 'relative',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                aspectRatio: '1/1'
                            }}
                        >
                            <img
                                src={product.image}
                                alt={product.title}
                                onLoad={() => setIsImageLoading(false)}
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    objectFit: 'contain',
                                    opacity: isImageLoading ? 0 : 1,
                                    transform: isImageLoading ? 'scale(0.95)' : 'scale(1)',
                                    transition: 'opacity 0.5s ease, transform 0.5s ease',
                                    filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))'
                                }}
                            />
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Product Info */}
                    <div style={{ paddingTop: '1rem' }}>

                        {/* Category Tag */}
                        <span
                            style={{
                                display: 'inline-block',
                                padding: '0.5rem 1rem',
                                borderRadius: '100px',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                                background: 'var(--surface)',
                                border: '1px solid var(--border)',
                                color: 'var(--accent-light)',
                                marginBottom: '1.5rem'
                            }}
                        >
                            {product.category}
                        </span>

                        <h1
                            style={{
                                fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                                fontWeight: '700',
                                lineHeight: '1.1',
                                color: 'var(--text-primary)',
                                marginBottom: '1.5rem'
                            }}
                        >
                            {product.title}
                        </h1>

                        <div style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap' }}>
                            <p style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--accent)' }}>
                                ${product.price.toFixed(2)}
                            </p>
                            <span style={{ color: 'var(--success)', fontSize: '0.9rem', fontWeight: '500' }}>In Stock & Ready to Ship</span>
                        </div>

                        {/* Description Box */}
                        <div
                            style={{
                                background: 'var(--surface)',
                                border: '1px solid var(--border)',
                                borderRadius: '1rem',
                                padding: 'clamp(1.5rem, 3vw, 2rem)',
                                marginBottom: '2.5rem'
                            }}
                        >
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                                About this item
                            </h3>
                            <p style={{ fontSize: '1.05rem', lineHeight: '1.75', color: 'var(--text-secondary)' }}>
                                {product.description}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                            <button
                                onClick={() => addToCart(product)}
                                style={{
                                    width: '100%',
                                    padding: '1.25rem',
                                    borderRadius: '0.75rem',
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    background: 'var(--accent)',
                                    color: 'white',
                                    border: 'none',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                                    transition: 'transform 0.2s, background 0.2s',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '0.75rem'
                                }}
                                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                Add to Cart
                            </button>

                            <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-tertiary)', marginTop: '1rem' }}>
                                Free standard shipping on all orders
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;