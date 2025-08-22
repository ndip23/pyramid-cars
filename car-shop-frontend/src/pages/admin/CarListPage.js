// src/pages/admin/CarListPage.jsx

import { useState, useEffect } from 'react';
import api from '../../utils/axiosConfig.js';
import { useCart } from '../../context/CartContext.js';
import toast from 'react-hot-toast';
import { FaTrashAlt } from 'react-icons/fa';

const CarListPage = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ 
        make: '', 
        model: '', 
        year: '', 
        price: '', 
        mileage: '', 
        transmission: 'Automatic', // Default value
        fuelType: '', 
        description: '', 
        image: '' 
    });
    const [uploading, setUploading] = useState(false);
    const { token } = useCart();

    const fetchCars = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/api/cars');
            setCars(data);
        } catch (error) {
            toast.error("Could not fetch the car list.");
            console.error("Fetch cars error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { 
        fetchCars(); 
    }, []);

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const uploadFileHandler = async e => {
        const file = e.target.files[0];
        if (!file) return;
        const uploadFormData = new FormData();
        uploadFormData.append('image', file);
        setUploading(true);
        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            const { data } = await api.post('/api/upload', uploadFormData, config);
            setFormData({ ...formData, image: data.image });
            toast.success('Image uploaded successfully');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Image upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!formData.image) {
            return toast.error("Please upload an image for the car.");
        }
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await api.post('/api/cars', formData, config);
            toast.success("Car listed for sale successfully!");
            fetchCars(); // Refresh the list
            // Reset form fields after successful submission
            setFormData({ make: '', model: '', year: '', price: '', mileage: '', transmission: 'Automatic', fuelType: '', description: '', image: '' });
            document.getElementById('image-file').value = ''; // Clear file input
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to list car.");
            console.error("Create car error:", error);
        }
    };

    const deleteHandler = async (id, title) => {
        if (window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
            try {
                const config = { headers: { Authorization: `Bearer ${token}` } };
                await api.delete(`/api/cars/${id}`, config);
                toast.success("Car listing deleted successfully.");
                fetchCars(); // Refresh the list
            } catch (error) {
                toast.error("Failed to delete car listing.");
                console.error("Delete car error:", error);
            }
        }
    };

    return (
        <div className="p-4 md:p-8 grid lg:grid-cols-5 gap-8">
            {/* --- Create Form --- */}
            <div className="lg:col-span-2">
                <h1 className="text-3xl font-bold mb-6">List a New Car for Sale</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="make" placeholder="Make (e.g., Toyota)" value={formData.make} onChange={handleChange} required className="w-full px-4 py-2 bg-dark-bg border border-gray-700 rounded-md"/>
                    <input type="text" name="model" placeholder="Model (e.g., RAV4)" value={formData.model} onChange={handleChange} required className="w-full px-4 py-2 bg-dark-bg border border-gray-700 rounded-md"/>
                    <input type="number" name="year" placeholder="Year (e.g., 2018)" value={formData.year} onChange={handleChange} required className="w-full px-4 py-2 bg-dark-bg border border-gray-700 rounded-md"/>
                    <input type="number" name="price" placeholder="Price (in FCFA)" value={formData.price} onChange={handleChange} required className="w-full px-4 py-2 bg-dark-bg border border-gray-700 rounded-md"/>
                    <input type="number" name="mileage" placeholder="Mileage (in km)" value={formData.mileage} onChange={handleChange} required className="w-full px-4 py-2 bg-dark-bg border border-gray-700 rounded-md"/>
                    <select name="transmission" value={formData.transmission} onChange={handleChange} className="w-full px-4 py-2 bg-dark-bg border border-gray-700 rounded-md">
                        <option>Automatic</option>
                        <option>Manual</option>
                    </select>
                    <input type="text" name="fuelType" placeholder="Fuel Type (e.g., Petrol)" value={formData.fuelType} onChange={handleChange} required className="w-full px-4 py-2 bg-dark-bg border border-gray-700 rounded-md"/>
                    <textarea name="description" placeholder="Description" value={formData.description} rows="4" onChange={handleChange} required className="w-full px-4 py-2 bg-dark-bg border border-gray-700 rounded-md"/>
                    <input type="text" id="image" name="image" value={formData.image} readOnly placeholder="Upload an image to get path..." className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-secondary-text"/>
                    <input type="file" id="image-file" onChange={uploadFileHandler} className="w-full text-sm text-secondary-text file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0"/>
                    {uploading && <p className="text-blue-400">Uploading image...</p>}
                    <button type="submit" className="w-full py-3 font-bold text-white bg-primary-red rounded-md hover:bg-red-700 transition-colors">Add Car to Listings</button>
                </form>
            </div>
            
            {/* --- Car List --- */}
            <div className="lg:col-span-3">
                <h2 className="text-2xl font-bold mb-6">Current Car Listings</h2>
                {loading ? <p>Loading listings...</p> : (
                    <div className="space-y-3 max-h-[80vh] overflow-y-auto pr-2">
                        {cars.length > 0 ? cars.map(car => (
                            <div key={car._id} className="bg-dark-card p-3 rounded-lg flex items-center justify-between gap-4">
                                <img src={`${process.env.REACT_APP_API_BASE_URL}${car.image}`} alt={car.title} className="w-20 h-20 object-cover rounded-md"/>
                                <div className="flex-grow">
                                    <p className="font-semibold">{car.year} {car.make} {car.model}</p>
                                    <p className="text-sm text-secondary-text">{car.price.toLocaleString('fr-FR')} FCFA</p>
                                </div>
                                <button onClick={() => deleteHandler(car._id, `${car.year} ${car.make} ${car.model}`)} className="text-primary-red hover:text-red-400 text-xl transition-colors p-2">
                                    <FaTrashAlt/>
                                </button>
                            </div>
                        )) : <p className="text-secondary-text">No cars listed yet. Add one using the form.</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CarListPage;