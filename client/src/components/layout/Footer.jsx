import './Footer.css';

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>E-Shop</h3>
                        <p>Your trusted online marketplace</p>
                    </div>

                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="/products">Products</a></li>
                            <li><a href="/contact">Contact</a></li>
                            <li><a href="/about">About Us</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Contact</h4>
                        <p>Email: info@eshop.com</p>
                        <p>Phone: (123) 456-7890</p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2025 E-Shop. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
