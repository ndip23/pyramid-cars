// src/pages/admin/CarListPage.jsx

import { useState, useEffect } from 'react';
import api from '../../utils/axiosConfig.jsx';
import { useCart } from '../../context/CartContext.jsx';
import toast from 'react-hot-toast';
import { FaTrashAlt } from 'react-icons/fa';

const CarListPage = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ 
        make: '', model: '', year: '', price: '', mileage: '', 
        transmission: 'Automatic', fuelType: '', description: '', image: '' 
    });
    const [uploading, setUploading] = useState(false);
    const { token } = useCart();

    const fetchCars = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/api/cars');

            // --- THIS IS THE FIX ---
            // We need to access the 'cars' array inside the response data object.
            if (data && Array.isArray(data.cars)) {
                setCars(data.cars);
            } else {
                setCars([]); // Set to empty array if the format is wrong
            }

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
            setFormData({ make: '', model: '', year: '', price: '', mileage: '', transmission: 'Automatic', fuelType: '', description: '', image: '' });
            document.getElementById('image-file').value = '';
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to list car.");
        }
    };

    const deleteHandler = async (id, title) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            try {
                const config = { headers: { Authorization: `Bearer ${token}` } };
                await api.delete(`/api/cars/${id}`, config);
                toast.success("Car listing deleted.");
                fetchCars();
            } catch (error) {
                toast.error("Failed to delete car listing.");
            }
        }
    };

    return (
        <div className="p-4 md:p-8 grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">List a New Car for Sale</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* ... Your form JSX is correct and does not need changes ... */}
                </form>
            </div>
            
            <div className="lg:col-span-3">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Current Car Listings</h2>
                {loading ? <p>Loading listings...</p> : (
                    <div className="space-y-3 max-h-[80vh] overflow-y-auto pr-2">
                        {cars.length > 0 ? cars.map(car => (
                            <div key={car._id} className="bg-white shadow p-3 rounded-lg flex items-center justify-between gap-4">
                                <img src={car.image.startsWith('http') ? car.image : `${process.env.REACT_APP_API_BASE_URL}${car.image}`} alt={`${car.make} ${car.model}`} className="w-20 h-20 object-cover rounded-md"/>
                                <div className="flex-grow">
                                    <p className="font-semibold text-gray-800">{car.year} {car.make} {car.model}</p>
                                    <p className="text-sm text-gray-500">{car.price.toLocaleString('fr-FR')} FCFA</p>
                                </div>
                                <button onClick={() => deleteHandler(car._id, `${car.year} ${car.make} ${car.model}`)} className="text-primary-red hover:text-red-400 text-xl transition-colors p-2">
                                    <FaTrashAlt/>
                                </button>
                            </div>
                        )) : <p className="text-gray-500">No cars listed yet. Add one using the form.</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CarListPage;