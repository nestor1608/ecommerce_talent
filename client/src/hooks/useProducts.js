import { useState, useEffect } from 'react';
import { productsApi } from '../api/productsApi';

export const useProducts = (filters = {}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await productsApi.getProducts(filters);
                setProducts(data);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [JSON.stringify(filters)]);

    return { products, loading, error };
};
