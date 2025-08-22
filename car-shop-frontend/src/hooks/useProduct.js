// src/hooks/useProduct.js

import { useState, useEffect } from 'react';
import api from '../utils/axiosConfig.js';

export const useProduct = (productId) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!productId) {
            setLoading(false);
            return;
        }

        const fetchProduct = async () => {
            try {
                setLoading(true);
                const { data } = await api.get(`/api/products/${productId}`);
                setProduct(data);
                setError(null);
            } catch (err) {
                setError("Failed to fetch product details. It may not exist.");
                console.error("Error fetching single product:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    return { product, loading, error };
};