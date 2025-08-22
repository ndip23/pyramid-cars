// src/pages/admin/ProductListPage.jsx
import { useState, useEffect } from 'react';
import api from '../../utils/axiosConfig.js';
import { useCart } from '../../context/CartContext.js';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaTrashAlt, FaEdit, FaPlus } from 'react-icons/fa';

const ProductListPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useCart();

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/api/products');
            setProducts(data);
            setError(null);
        } catch (err) {
            setError("Could not fetch products.");
            toast.error("Could not fetch products.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchProducts(); }, []);

    const deleteHandler = async (id, name) => {
        if (window.confirm(`Are you sure you want to delete: "${name}"?`)) {
            try {
                const config = { headers: { Authorization: `Bearer ${token}` } };
                await api.delete(`/api/products/${id}`, config);
                toast.success('Product deleted');
                fetchProducts();
            } catch (err) {
                toast.error('Failed to delete product.');
            }
        }
    };

    if (loading) return <div className="p-8 text-center text-xl text-secondary-text">Loading Products...</div>;
    if (error) return <div className="p-8 text-center text-xl text-primary-red">{error}</div>;

    return (
        <div className="p-4 md:p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-black">Manage Products</h1>
                <Link to="/admin/products/create" className="flex items-center gap-2 bg-primary-red text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition-colors">
                    <FaPlus /><span>Add Product</span>
                </Link>
            </div>
            <div className="bg-dark-card rounded-lg shadow-lg overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="border-b border-gray-700">
                        <tr>
                            <th className="p-4 uppercase text-sm text-secondary-text">Image</th>
                            <th className="p-4 uppercase text-sm text-secondary-text">Name</th>
                            <th className="p-4 uppercase text-sm text-secondary-text">Price</th>
                            <th className="p-4 uppercase text-sm text-secondary-text">Category</th>
                            <th className="p-4 uppercase text-sm text-secondary-text text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map(product => (
                                <tr key={product._id} className="border-b border-gray-800 hover:bg-gray-800/50">
                                    <td className="p-2">
                                        <img src={product.image.startsWith('http') ? product.image : `${process.env.REACT_APP_API_BASE_URL}${product.image}`} alt={product.name} className="w-16 h-16 object-contain rounded-md bg-white p-1" />
                                    </td>
                                    <td className="p-4 font-semibold">{product.name}</td>
                                    <td className="p-4">${product.price.toFixed(2)}</td>
                                    <td className="p-4 text-secondary-text">{product.category}</td>
                                    <td className="p-4 text-center">
                                        <div className="flex justify-center gap-4">
                                            <Link to={`/admin/products/${product._id}/edit`} className="text-blue-400 hover:text-blue-300 text-lg" title="Edit"><FaEdit /></Link>
                                            <button onClick={() => deleteHandler(product._id, product.name)} className="text-primary-red hover:text-red-400 text-lg" title="Delete"><FaTrashAlt /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center p-8 text-secondary-text">No products found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductListPage;