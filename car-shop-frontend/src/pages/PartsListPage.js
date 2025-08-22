// src/pages/PartsListPage.jsx

import { useState, useEffect } from 'react';
import api from '../utils/axiosConfig.js';
import ProductCard from '../components/ProductCard.js';

const PartsListPage = () => {
    const [parts, setParts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchParts = async () => {
            try {
                // We fetch from the same /api/products endpoint.
                // In a more complex app, you might have /api/parts or a category filter.
                const { data } = await api.get('/api/products');
                setParts(data);
            } catch (err) {
                setError("Could not load spare parts. Please try again later.");
                console.error("Error fetching parts:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchParts();
    }, []);

    if (loading) return <p className="text-center text-2xl py-20 text-secondary-text">Loading Spare Parts...</p>;
    if (error) return <p className="text-center text-2xl py-20 text-primary-red">{error}</p>;

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-black text-center mb-12">
                Genuine <span className="text-primary-red">Spare Parts</span>
            </h1>
            
            {parts.length === 0 ? (
                <p className="text-center text-xl text-secondary-text">No spare parts are currently listed.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {/* We can reuse the ProductCard component perfectly here */}
                    {parts.map(part => (
                        <ProductCard key={part._id} product={part} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default PartsListPage;