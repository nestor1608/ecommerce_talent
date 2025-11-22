import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsApi } from '../api/productsApi';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Loader } from '../components/common/Loader';
import { formatPrice } from '../utils/formatters';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { user } = useAuth();

    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [review, setReview] = useState({ rating: 5, comment: '' });

    useEffect(() => {
        fetchProduct();
        fetchRelatedProducts();
    }, [id]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const data = await productsApi.getProduct(id);
            setProduct(data);
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRelatedProducts = async () => {
        try {
            const data = await productsApi.getRelatedProducts(id);
            setRelatedProducts(data);
        } catch (error) {
            console.error('Error fetching related products:', error);
        }
    };

    const handleAddToCart = async () => {
        try {
            await addToCart(product._id, quantity);
            alert('Product added to cart!');
        } catch (error) {
            alert('Please login to add items to cart');
        }
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (!user) {
            alert('Please login to submit a review');
            return;
        }

        try {
            await productsApi.addReview(product._id, review);
            alert('Review submitted successfully!');
            setReview({ rating: 5, comment: '' });
            fetchProduct();
        } catch (error) {
            alert('Error submitting review');
        }
    };

    if (loading) return <Loader />;
    if (!product) return <div className="container">Product not found</div>;

    return (
        <div className="product-detail-page">
            <div className="container">
                <button onClick={() => navigate(-1)} className="back-button">
                    ← Back to Products
                </button>

                <div className="product-detail-grid">
                    {/* Images Section */}
                    <div className="product-images">
                        <div className="main-image">
                            <img
                                src={product.images[selectedImage] || 'https://via.placeholder.com/600'}
                                alt={product.name}
                            />
                        </div>
                        {product.images.length > 1 && (
                            <div className="image-thumbnails">
                                {product.images.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`${product.name} ${index + 1}`}
                                        className={selectedImage === index ? 'active' : ''}
                                        onClick={() => setSelectedImage(index)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="product-details">
                        <h1>{product.name}</h1>
                        <div className="product-meta">
                            <span className="category">{product.category}</span>
                            <div className="rating">
                                ⭐ {product.rating.toFixed(1)} ({product.reviews.length} reviews)
                            </div>
                        </div>

                        <p className="price">{formatPrice(product.price)}</p>

                        <div className="stock-info">
                            {product.stock > 0 ? (
                                <span className="in-stock">✓ In Stock ({product.stock} available)</span>
                            ) : (
                                <span className="out-of-stock">✗ Out of Stock</span>
                            )}
                        </div>

                        <p className="description">{product.description}</p>

                        {product.stock > 0 && (
                            <div className="purchase-section">
                                <div className="quantity-selector">
                                    <label>Quantity:</label>
                                    <div className="quantity-controls">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            disabled={quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span>{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                            disabled={quantity >= product.stock}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <Button size="large" fullWidth onClick={handleAddToCart}>
                                    Add to Cart
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Reviews Section */}
                <Card className="reviews-section">
                    <h2>Customer Reviews</h2>

                    {user && (
                        <form onSubmit={handleSubmitReview} className="review-form">
                            <h3>Write a Review</h3>
                            <div className="rating-input">
                                <label>Rating:</label>
                                <select
                                    value={review.rating}
                                    onChange={(e) => setReview({ ...review, rating: Number(e.target.value) })}
                                >
                                    {[5, 4, 3, 2, 1].map((num) => (
                                        <option key={num} value={num}>
                                            {num} Star{num !== 1 && 's'}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <textarea
                                placeholder="Write your review..."
                                value={review.comment}
                                onChange={(e) => setReview({ ...review, comment: e.target.value })}
                                required
                            />
                            <Button type="submit">Submit Review</Button>
                        </form>
                    )}

                    <div className="reviews-list">
                        {product.reviews.length === 0 ? (
                            <p>No reviews yet. Be the first to review!</p>
                        ) : (
                            product.reviews.map((rev, index) => (
                                <div key={index} className="review-item">
                                    <div className="review-header">
                                        <strong>{rev.userName}</strong>
                                        <span className="review-rating">{'⭐'.repeat(rev.rating)}</span>
                                    </div>
                                    <p>{rev.comment}</p>
                                    <small>{new Date(rev.createdAt).toLocaleDateString()}</small>
                                </div>
                            ))
                        )}
                    </div>
                </Card>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="related-products">
                        <h2>Related Products</h2>
                        <div className="related-grid">
                            {relatedProducts.map((prod) => (
                                <Card
                                    key={prod._id}
                                    className="related-product"
                                    onClick={() => navigate(`/products/${prod._id}`)}
                                >
                                    <img src={prod.images[0] || 'https://via.placeholder.com/200'} alt={prod.name} />
                                    <h4>{prod.name}</h4>
                                    <p>{formatPrice(prod.price)}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
