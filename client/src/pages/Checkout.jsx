import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { ordersApi } from '../api/ordersApi';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { formatPrice } from '../utils/formatters';
import './Checkout.css';

const Checkout = () => {
    const navigate = useNavigate();
    const { cart, getCartTotal, clearCart } = useCart();
    const { user } = useAuth();

    const [shippingAddress, setShippingAddress] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
    });

    const [paymentMethod, setPaymentMethod] = useState('card');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!cart || cart.items.length === 0) {
            navigate('/cart');
        }
    }, [cart, navigate]);

    const handleAddressChange = (e) => {
        setShippingAddress({
            ...shippingAddress,
            [e.target.name]: e.target.value,
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!shippingAddress.street) newErrors.street = 'Street is required';
        if (!shippingAddress.city) newErrors.city = 'City is required';
        if (!shippingAddress.state) newErrors.state = 'State is required';
        if (!shippingAddress.zipCode) newErrors.zipCode = 'Zip code is required';
        if (!shippingAddress.country) newErrors.country = 'Country is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        setErrors({});

        try {
            // Create order
            const order = await ordersApi.createOrder({
                shippingAddress,
                paymentMethod,
            });

            // In a real app, you would integrate with Stripe here
            // For now, we'll simulate payment
            alert('Order placed successfully! Order ID: ' + order._id);

            await clearCart();
            navigate('/profile');
        } catch (error) {
            setErrors({ general: error.response?.data?.message || 'Error placing order' });
        } finally {
            setLoading(false);
        }
    };

    const subtotal = getCartTotal();
    const shipping = subtotal > 50 ? 0 : 10;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    return (
        <div className="checkout-page">
            <div className="container">
                <h1>Checkout</h1>

                {errors.general && (
                    <div className="error-alert">{errors.general}</div>
                )}

                <div className="checkout-grid">
                    {/* Checkout Form */}
                    <div className="checkout-form">
                        <Card>
                            <h2>Shipping Address</h2>
                            <form onSubmit={handleSubmit}>
                                <Input
                                    label="Street Address"
                                    name="street"
                                    value={shippingAddress.street}
                                    onChange={handleAddressChange}
                                    error={errors.street}
                                    required
                                />

                                <div className="form-row">
                                    <Input
                                        label="City"
                                        name="city"
                                        value={shippingAddress.city}
                                        onChange={handleAddressChange}
                                        error={errors.city}
                                        required
                                    />
                                    <Input
                                        label="State"
                                        name="state"
                                        value={shippingAddress.state}
                                        onChange={handleAddressChange}
                                        error={errors.state}
                                        required
                                    />
                                </div>

                                <div className="form-row">
                                    <Input
                                        label="Zip Code"
                                        name="zipCode"
                                        value={shippingAddress.zipCode}
                                        onChange={handleAddressChange}
                                        error={errors.zipCode}
                                        required
                                    />
                                    <Input
                                        label="Country"
                                        name="country"
                                        value={shippingAddress.country}
                                        onChange={handleAddressChange}
                                        error={errors.country}
                                        required
                                    />
                                </div>

                                <div className="payment-method">
                                    <h3>Payment Method</h3>
                                    <div className="payment-options">
                                        <label className="payment-option">
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="card"
                                                checked={paymentMethod === 'card'}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                            />
                                            <span>Credit/Debit Card</span>
                                        </label>
                                        <label className="payment-option">
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="paypal"
                                                checked={paymentMethod === 'paypal'}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                            />
                                            <span>PayPal</span>
                                        </label>
                                    </div>
                                </div>

                                <Button type="submit" size="large" fullWidth disabled={loading}>
                                    {loading ? 'Processing...' : `Place Order - ${formatPrice(total)}`}
                                </Button>
                            </form>
                        </Card>
                    </div>

                    {/* Order Summary */}
                    <div className="order-summary">
                        <Card>
                            <h2>Order Summary</h2>

                            <div className="summary-items">
                                {cart?.items.map((item) => (
                                    <div key={item.productId._id} className="summary-item">
                                        <img
                                            src={item.productId.images?.[0] || 'https://via.placeholder.com/60'}
                                            alt={item.productId.name}
                                        />
                                        <div className="item-details">
                                            <h4>{item.productId.name}</h4>
                                            <p>Qty: {item.quantity}</p>
                                        </div>
                                        <span className="item-price">
                                            {formatPrice(item.price * item.quantity)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="summary-totals">
                                <div className="total-row">
                                    <span>Subtotal:</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="total-row">
                                    <span>Shipping:</span>
                                    <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                                </div>
                                <div className="total-row">
                                    <span>Tax (10%):</span>
                                    <span>{formatPrice(tax)}</span>
                                </div>
                                <div className="total-row total">
                                    <strong>Total:</strong>
                                    <strong>{formatPrice(total)}</strong>
                                </div>
                            </div>

                            {subtotal < 50 && (
                                <div className="shipping-notice">
                                    Add {formatPrice(50 - subtotal)} more for free shipping!
                                </div>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
