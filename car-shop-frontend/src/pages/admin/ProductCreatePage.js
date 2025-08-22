// src/pages/admin/ProductCreatePage.jsx

import { useState } from 'react';
import api from '../../utils/axiosConfig.js';
import { useCart } from '../../context/CartContext.js';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProductCreatePage = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        image: '',
        category: '',
        isNew: false
    });
    
    const [uploading, setUploading] = useState(false);
    const { token } = useCart();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const uploadFormData = new FormData();
        uploadFormData.append('image', file);
        setUploading(true);

        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            const { data } = await api.post('/api/upload', uploadFormData, config);
            
            setFormData(prevData => ({ ...prevData, image: data.image }));
            toast.success(data.message);
        } catch (error) {
            const message = error.response?.data?.message || "Image upload failed. Please use jpg, jpeg, or png.";
            toast.error(message);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.image) {
            toast.error("Please upload an image for the product.");
            return;
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        };

        try {
            await api.post('/api/products', formData, config);
            toast.success("Product created successfully!");
            navigate('/admin/products');
        } catch (error) {
            const message = error.response?.data?.message || "Failed to create product. Please check all fields.";
            toast.error(message);
        }
    };

    return (
        <div className="p-4 md:p-8">
            <Link to="/admin/products" className="text-secondary-text hover:text-light-text mb-6 inline-block">&larr; Back to Product List</Link>
            <h1 className="text-3xl font-bold mb-6">Create New Product</h1>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
                <div>
                    <label htmlFor="name" className="block mb-1 text-secondary-text">Product Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 bg-dark-bg border border-gray-700 rounded-md"/>
                </div>
                <div>
                    <label htmlFor="price" className="block mb-1 text-secondary-text">Price</label>
                    <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required className="w-full px-4 py-2 bg-dark-bg border border-gray-700 rounded-md"/>
                </div>
                <div>
                    <label htmlFor="image" className="block mb-1 text-secondary-text">Image Path</label>
                    <input type="text" id="image" name="image" value={formData.image} readOnly placeholder="Upload an image to generate path" className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-secondary-text"/>
                </div>
                <div>
                    <label htmlFor="image-file" className="block mb-1 text-secondary-text">Upload Image</label>
                    <input type="file" id="image-file" onChange={uploadFileHandler} className="w-full text-sm text-secondary-text file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-600 file:text-white hover:file:bg-gray-500"/>
                    {uploading && <p className="text-blue-400 mt-2">Uploading image...</p>}
                </div>
                <div>
                    <label htmlFor="category" className="block mb-1 text-secondary-text">Category</label>
                    <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} required className="w-full px-4 py-2 bg-dark-bg border border-gray-700 rounded-md"/>
                </div>
                <div className="flex items-center gap-3 pt-2">
                    <input type="checkbox" id="isNew" name="isNew" checked={formData.isNew} onChange={handleChange} className="h-5 w-5 bg-dark-bg rounded border-gray-600 text-primary-red focus:ring-primary-red"/>
                    <label htmlFor="isNew" className="text-light-text">Mark as New Product</label>
                </div>
                <button type="submit" className="w-full py-3 mt-4 font-bold text-white bg-primary-red rounded-md hover:bg-red-700 transition-colors">Create Product</button>
            </form>
        </div>
    );
};

export default ProductCreatePage;