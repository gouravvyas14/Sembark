import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
    const { cart, removeFromCart, updateQuantity } = useCart();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // EMPTY CART STATE
    if (cart.length === 0) {
        return (
            <div className="page-container" style={{ padding: '2rem' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '600', marginBottom: '3rem', color: 'var(--text-primary)' }}>
                        Shopping Cart
                    </h1>

                    <div style={{
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '1rem',
                        padding: '5rem 2rem',
                        textAlign: 'center'
                    }}>
                        {/* FIXED: Explicit width and height ensures it never gets huge */}
                        <svg
                            style={{
                                width: '64px',
                                height: '64px',
                                margin: '0 auto 1.5rem auto',
                                color: 'var(--text-tertiary)',
                                display: 'block'
                            }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>

                        <p style={{ fontSize: '1.25rem', fontWeight: '500', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                            Your cart is empty
                        </p>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            Start adding items to your cart to see them here
                        </p>

                        <Link
                            to="/"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                backgroundColor: 'var(--accent)',
                                color: 'white',
                                padding: '0.75rem 2rem',
                                borderRadius: '0.5rem',
                                fontWeight: '600',
                                textDecoration: 'none',
                                transition: 'transform 0.2s'
                            }}
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // FILLED CART STATE
    return (
        <div className="page-container" style={{ padding: '2rem 1rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '600', marginBottom: '2rem', color: 'var(--text-primary)' }}>
                    Shopping Cart
                </h1>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                    {/* Items List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                style={{
                                    background: 'var(--surface)',
                                    border: '1px solid var(--border)',
                                    padding: '1.5rem',
                                    borderRadius: '0.75rem',
                                    display: 'flex',
                                    gap: '1.5rem',
                                    alignItems: 'center'
                                }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    style={{ width: '80px', height: '80px', objectFit: 'contain', background: 'white', padding: '0.5rem', borderRadius: '0.5rem' }}
                                />
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                                        {item.title}
                                    </h3>
                                    <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--accent-light)', marginBottom: '1rem' }}>
                                        ${item.price.toFixed(2)}
                                    </p>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <button
                                                onClick={() => {
                                                    if (item.quantity <= 1) {
                                                        removeFromCart(item.id);
                                                    } else {
                                                        updateQuantity(item.id, item.quantity - 1);
                                                    }
                                                }}
                                                style={{ width: '30px', height: '30px', background: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                            >
                                                −
                                            </button>
                                            <span style={{ minWidth: '30px', textAlign: 'center', color: 'var(--text-primary)' }}>{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                style={{ width: '30px', height: '30px', background: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            style={{ color: '#ef4444', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div>
                        <div style={{
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                            borderRadius: '0.75rem',
                            padding: '1.5rem',
                            position: 'sticky',
                            top: '100px'
                        }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Order Summary</h2>
                            <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                    <span>Subtotal</span>
                                    <span style={{ color: 'var(--text-primary)' }}>${total.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                                    <span>Shipping</span>
                                    <span style={{ color: 'var(--success)' }}>Free</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                                <span>Total</span>
                                <span style={{ color: 'var(--accent)' }}>${total.toFixed(2)}</span>
                            </div>
                            <button
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    background: 'var(--accent)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    marginBottom: '1rem'
                                }}
                            >
                                Checkout
                            </button>
                            <Link
                                to="/"
                                style={{ display: 'block', textAlign: 'center', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}