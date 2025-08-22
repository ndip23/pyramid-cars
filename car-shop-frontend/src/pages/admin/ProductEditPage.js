// src/pages/admin/ProductEditPage.jsx

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../utils/axiosConfig.js';
import { useCart } from '../../context/CartContext.js';
import toast from 'react-hot-toast';

const ProductEditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useCart();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [isNew, setIsNew] = useState(false);

    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/api/products/${id}`);
                setName(data.name);
                setPrice(data.price);
                setImage(data.image);
                setCategory(data.category);
                setIsNew(data.isNew);
            } catch (error) {
                toast.error("Could not fetch product details.");
                navigate('/admin/products');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id, navigate]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const uploadFormData = new FormData();
        uploadFormData.append('image', file);
        setUploading(true);

        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            const { data } = await api.post('/api/upload', uploadFormData, config);
            setImage(data.image);
            toast.success(data.message);
        } catch (error) {
            const message = error.response?.data?.message || "Image upload failed.";
            toast.error(message);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        };

        const updatedProduct = { name, price, image, category, isNew };

        try {
            await api.put(`/api/products/${id}`, updatedProduct, config);
            toast.success("Product updated successfully!");
            navigate('/admin/products');
        } catch (error) {
            toast.error("Failed to update product.");
            console.error(error);
        }
    };

    if (loading) return <p className="p-8 text-center text-xl text-secondary-text">Loading product for editing...</p>;

    return (
        <div className="p-4 md:p-8">
            <Link to="/admin/products" className="text-secondary-text hover:text-light-text mb-6 inline-block">&larr; Back to Product List</Link>
            <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
                <div>
                    <label htmlFor="name" className="block mb-1 text-secondary-text">Product Name</label>
                    <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-2 bg-dark-bg border border-gray-700 rounded-md"/>
                </div>
                <div>
                    <label htmlFor="price" className="block mb-1 text-secondary-text">Price</label>
                    <input type="number" id="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full px-4 py-2 bg-dark-bg border border-gray-700 rounded-md"/>
                </div>
                <div>
                    <label htmlFor="image" className="block mb-1 text-secondary-text">Image Path</label>
                    <input type="text" id="image" name="image" value={image} onChange={(e) => setImage(e.target.value)} required className="w-full px-4 py-2 bg-dark-bg border border-gray-700 rounded-md"/>
                </div>
                <div>
                    <label htmlFor="image-file" className="block mb-1 text-secondary-text">Upload New Image (optional)</label>
                    <input type="file" id="image-file" onChange={uploadFileHandler} className="w-full text-sm text-secondary-text file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-600 file:text-white hover:file:bg-gray-500"/>
                    {uploading && <p className="text-blue-400 mt-2">Uploading...</p>}
                </div>
                <div>
                    <label htmlFor="category" className="block mb-1 text-secondary-text">Category</label>
                    <input type="text" id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full px-4 py-2 bg-dark-bg border border-gray-700 rounded-md"/>
                </div>
                <div className="flex items-center gap-3 pt-2">
                    <input type="checkbox" id="isNew" name="isNew" checked={isNew} onChange={(e) => setIsNew(e.target.checked)} className="h-5 w-5 bg-dark-bg rounded border-gray-600 text-primary-red focus:ring-primary-red"/>
                    <label htmlFor="isNew" className="text-light-text">Mark as New Product</label>
                </div>
                <button type="submit" className="w-full py-3 mt-4 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">Update Product</button>
            </form>
        </div>
    );
};

export default ProductEditPage;