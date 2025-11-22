import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <h1>Welcome to E-Shop</h1>
                        <p>Discover amazing products at unbeatable prices</p>
                        <Link to="/products">
                            <Button size="large">Shop Now</Button>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="features">
                <div className="container">
                    <h2>Why Choose Us</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🚚</div>
                            <h3>Free Shipping</h3>
                            <p>On orders over $50</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🔒</div>
                            <h3>Secure Payment</h3>
                            <p>100% secure transactions</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">↩️</div>
                            <h3>Easy Returns</h3>
                            <p>30-day return policy</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">💬</div>
                            <h3>24/7 Support</h3>
                            <p>Always here to help</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
