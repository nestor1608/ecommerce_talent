import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';

// Pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Products from '../pages/Products';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Contact from '../pages/Contact';
import Profile from '../pages/Profile';
import About from '../pages/About';
import AdminDashboard from '../pages/admin/AdminDashboard';
import NotFound from '../pages/NotFound';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />

            {/* Private Routes */}
            <Route
                path="/cart"
                element={
                    <PrivateRoute>
                        <Cart />
                    </PrivateRoute>
                }
            />
            <Route
                path="/checkout"
                element={
                    <PrivateRoute>
                        <Checkout />
                    </PrivateRoute>
                }
            />
            <Route
                path="/profile"
                element={
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                }
            />
            <Route
                path="/admin"
                element={
                    <PrivateRoute>
                        <AdminDashboard />
                    </PrivateRoute>
                }
            />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
