import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsApi } from '../api/productsApi';
import { useCart } from '../hooks/useCart';
import { useDebounce } from '../hooks/useDebounce';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Loader } from '../components/common/Loader';
import { formatPrice } from '../utils/formatters';
import { CATEGORIES, SORT_OPTIONS } from '../utils/constants';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        category: '',
        minPrice: '',
        maxPrice: '',
        sort: 'newest',
    });

    const { addToCart } = useCart();
    const debouncedSearch = useDebounce(filters.search, 500);

    useEffect(() => {
        fetchProducts();
    }, [debouncedSearch, filters.category, filters.minPrice, filters.maxPrice, filters.sort]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const params = {
                search: debouncedSearch,
                category: filters.category,
                minPrice: filters.minPrice,
                maxPrice: filters.maxPrice,
                sort: filters.sort,
            };
            const data = await productsApi.getProducts(params);
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddToCart = async (productId) => {
        try {
            await addToCart(productId, 1);
            alert('Product added to cart!');
        } catch (error) {
            alert('Please login to add items to cart');
        }
    };

    return (
        <div className="products-page">
            <div className="container">
                <h1>Our Products</h1>

                <div className="products-layout">
                    {/* Filters Sidebar */}
                    <aside className="filters-sidebar">
                        <Card>
                            <h3>Filters</h3>

                            <div className="filter-group">
                                <label>Search</label>
                                <input
                                    type="text"
                                    name="search"
                                    placeholder="Search products..."
                                    value={filters.search}
                                    onChange={handleFilterChange}
                                    className="filter-input"
                                />
                            </div>

                            <div className="filter-group">
                                <label>Category</label>
                                <select
                                    name="category"
                                    value={filters.category}
                                    onChange={handleFilterChange}
                                    className="filter-select"
                                >
                                    <option value="">All Categories</option>
                                    {CATEGORIES.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="filter-group">
                                <label>Price Range</label>
                                <div className="price-inputs">
                                    <input
                                        type="number"
                                        name="minPrice"
                                        placeholder="Min"
                                        value={filters.minPrice}
                                        onChange={handleFilterChange}
                                        className="filter-input"
                                    />
                                    <span>-</span>
                                    <input
                                        type="number"
                                        name="maxPrice"
                                        placeholder="Max"
                                        value={filters.maxPrice}
                                        onChange={handleFilterChange}
                                        className="filter-input"
                                    />
                                </div>
                            </div>

                            <div className="filter-group">
                                <label>Sort By</label>
                                <select
                                    name="sort"
                                    value={filters.sort}
                                    onChange={handleFilterChange}
                                    className="filter-select"
                                >
                                    {SORT_OPTIONS.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </Card>
                    </aside>

                    {/* Products Grid */}
                    <div className="products-content">
                        {loading ? (
                            <Loader />
                        ) : products.length === 0 ? (
                            <div className="no-products">
                                <p>No products found</p>
                            </div>
                        ) : (
                            <div className="products-grid">
                                {products.map((product) => (
                                    <Card key={product._id} className="product-card">
                                        <div className="product-image">
                                            <img
                                                src={product.images[0] || 'https://via.placeholder.com/300'}
                                                alt={product.name}
                                            />
                                            {product.stock === 0 && (
                                                <div className="out-of-stock-badge">Out of Stock</div>
                                            )}
                                        </div>
                                        <div className="product-info">
                                            <h3>{product.name}</h3>
                                            <p className="product-category">{product.category}</p>
                                            <div className="product-rating">
                                                ⭐ {product.rating.toFixed(1)} ({product.reviews.length} reviews)
                                            </div>
                                            <p className="product-price">{formatPrice(product.price)}</p>
                                            <div className="product-actions">
                                                <Link to={`/products/${product._id}`}>
                                                    <Button variant="secondary" size="small">
                                                        View Details
                                                    </Button>
                                                </Link>
                                                <Button
                                                    size="small"
                                                    onClick={() => handleAddToCart(product._id)}
                                                    disabled={product.stock === 0}
                                                >
                                                    Add to Cart
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
