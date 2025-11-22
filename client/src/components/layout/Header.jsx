import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import './Header.css';

export const Header = () => {
    const { user, logout } = useAuth();
    const { getCartItemsCount } = useCart();

    return (
        <header className="header">
            <div className="container">
                <Link to="/" className="logo">
                    <h1>E-Shop</h1>
                </Link>

                <nav className="nav">
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                </nav>

                <div className="header-actions">
                    {user ? (
                        <>
                            <Link to="/cart" className="cart-link">
                                🛒 Cart ({getCartItemsCount()})
                            </Link>
                            <Link to="/profile">Profile</Link>
                            {user.role === 'admin' && (
                                <Link to="/admin" className="admin-link">
                                    Admin
                                </Link>
                            )}
                            <button onClick={logout} className="btn-logout">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register" className="btn-register">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};
