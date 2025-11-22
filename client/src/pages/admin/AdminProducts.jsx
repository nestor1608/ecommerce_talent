import { useState, useEffect } from 'react';
import { productsApi } from '../../api/productsApi';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Modal } from '../../components/common/Modal';
import { Loader } from '../../components/common/Loader';
import { formatPrice } from '../../utils/formatters';
import { CATEGORIES } from '../../utils/constants';
import './AdminProducts.css';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        images: [''],
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await productsApi.getProducts({});
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (index, value) => {
        const newImages = [...formData.images];
        newImages[index] = value;
        setFormData({ ...formData, images: newImages });
    };

    const addImageField = () => {
        setFormData({ ...formData, images: [...formData.images, ''] });
    };

    const removeImageField = (index) => {
        const newImages = formData.images.filter((_, i) => i !== index);
        setFormData({ ...formData, images: newImages });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const productData = {
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                images: formData.images.filter((img) => img.trim() !== ''),
            };

            if (editingProduct) {
                await productsApi.updateProduct(editingProduct._id, productData);
                alert('Product updated successfully!');
            } else {
                await productsApi.createProduct(productData);
                alert('Product created successfully!');
            }

            setShowModal(false);
            resetForm();
            fetchProducts();
        } catch (error) {
            alert('Error saving product: ' + error.message);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price.toString(),
            category: product.category,
            stock: product.stock.toString(),
            images: product.images.length > 0 ? product.images : [''],
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;

        try {
            await productsApi.deleteProduct(id);
            alert('Product deleted successfully!');
            fetchProducts();
        } catch (error) {
            alert('Error deleting product: ' + error.message);
        }
    };

    const resetForm = () => {
        setEditingProduct(null);
        setFormData({
            name: '',
            description: '',
            price: '',
            category: '',
            stock: '',
            images: [''],
        });
    };

    const handleAddNew = () => {
        resetForm();
        setShowModal(true);
    };

    if (loading) return <Loader />;

    return (
        <div className="admin-products">
            <div className="admin-header">
                <h1>Products Management</h1>
                <Button onClick={handleAddNew}>+ Add New Product</Button>
            </div>

            <div className="products-table">
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Rating</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>
                                    <img
                                        src={product.images[0] || 'https://via.placeholder.com/50'}
                                        alt={product.name}
                                        className="product-thumb"
                                    />
                                </td>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>{formatPrice(product.price)}</td>
                                <td>
                                    <span className={product.stock > 0 ? 'in-stock' : 'out-stock'}>
                                        {product.stock}
                                    </span>
                                </td>
                                <td>⭐ {product.rating.toFixed(1)}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button onClick={() => handleEdit(product)} className="btn-edit">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(product._id)} className="btn-delete">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <Modal onClose={() => setShowModal(false)} title={editingProduct ? 'Edit Product' : 'Add New Product'}>
                    <form onSubmit={handleSubmit} className="product-form">
                        <Input
                            label="Product Name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />

                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-row">
                            <Input
                                label="Price"
                                name="price"
                                type="number"
                                step="0.01"
                                value={formData.price}
                                onChange={handleInputChange}
                                required
                            />
                            <Input
                                label="Stock"
                                name="stock"
                                type="number"
                                value={formData.stock}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Category</label>
                            <select name="category" value={formData.category} onChange={handleInputChange} required>
                                <option value="">Select Category</option>
                                {CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Images (URLs)</label>
                            {formData.images.map((img, index) => (
                                <div key={index} className="image-input-group">
                                    <input
                                        type="url"
                                        value={img}
                                        onChange={(e) => handleImageChange(index, e.target.value)}
                                        placeholder="https://example.com/image.jpg"
                                    />
                                    {formData.images.length > 1 && (
                                        <button type="button" onClick={() => removeImageField(index)} className="btn-remove">
                                            ✕
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button type="button" onClick={addImageField} className="btn-add-image">
                                + Add Image
                            </button>
                        </div>

                        <div className="form-actions">
                            <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">{editingProduct ? 'Update' : 'Create'} Product</Button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
};

export default AdminProducts;
