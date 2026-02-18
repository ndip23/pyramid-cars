import { useState, useEffect } from 'react'; 
import toast from 'react-hot-toast';
import { FaTrashAlt, FaEdit, FaTimes, FaCar, FaImages, FaCloudUploadAlt } from 'react-icons/fa'; 

// Go up 2 levels to reach src/utils
import api from '../../utils/axiosConfig.js'; 
import { useCart } from '../../context/CartContext.js'; 

const CarListPage = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editId, setEditId] = useState(null); 
    
    // UPDATED STATE: Includes imageGallery array
    const [formData, setFormData] = useState({ 
        make: '', model: '', year: '', price: '', mileage: '', 
        transmission: 'Automatic', fuelType: '', description: '', 
        condition: 'Used',
        image: '',          // Main thumbnail
        imageGallery: []    // Array of extra photos
    });
    
    const [uploading, setUploading] = useState(false);
    const { token } = useCart(); 

    // --- FETCH CARS ---
    const fetchCars = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/api/cars');
            if (data && Array.isArray(data.cars)) {
                setCars(data.cars);
            } else if (Array.isArray(data)) {
                setCars(data);
            } else {
                setCars([]); 
            }
        } catch (error) {
            toast.error("Could not fetch the car list.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { 
        fetchCars(); 
        // eslint-disable-next-line
    }, []);

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    // --- EDIT MODE ---
    const startEditHandler = (car) => {
        setEditId(car._id);
        setFormData({
            make: car.make,
            model: car.model,
            year: car.year,
            price: car.price,
            mileage: car.mileage,
            transmission: car.transmission,
            fuelType: car.fuelType,
            description: car.description,
            condition: car.condition || 'Used',
            image: car.image,
            imageGallery: car.imageGallery || [] // Load existing gallery
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEditHandler = () => {
        setEditId(null);
        setFormData({ 
            make: '', model: '', year: '', price: '', mileage: '', 
            transmission: 'Automatic', fuelType: '', description: '', 
            condition: 'Used', image: '', imageGallery: [] 
        });
        // Reset file inputs
        document.getElementById('main-image').value = '';
        document.getElementById('gallery-images').value = '';
    };

    // --- UPLOAD HANDLER (MAIN IMAGE) ---
    const uploadMainHandler = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const uploadFormData = new FormData();
        uploadFormData.append('image', file);
        setUploading(true);
        
        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            const { data } = await api.post('/api/upload', uploadFormData, config);
            const imagePath = data.image || data.filePath || data; 
            setFormData({ ...formData, image: imagePath });
            toast.success('Main image set');
        } catch (error) {
            toast.error('Image upload failed');
        } finally {
            setUploading(false);
        }
    };

    // --- UPLOAD HANDLER (GALLERY) ---
    const uploadGalleryHandler = async (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        const newImages = [];

        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            
            // Loop through selected files
            for (let i = 0; i < files.length; i++) {
                const uploadFormData = new FormData();
                uploadFormData.append('image', files[i]);
                
                const { data } = await api.post('/api/upload', uploadFormData, config);
                const path = data.image || data.filePath || data;
                newImages.push(path);
            }

            // Add new images to existing gallery array
            setFormData(prev => ({
                ...prev,
                imageGallery: [...prev.imageGallery, ...newImages]
            }));
            
            toast.success(`${newImages.length} photos added to gallery`);
        } catch (error) {
            console.error(error);
            toast.error('Gallery upload failed');
        } finally {
            setUploading(false);
            // Clear input so you can select the same files again if needed
            e.target.value = null; 
        }
    };

    // --- REMOVE FROM GALLERY ---
    const removeGalleryImage = (indexToRemove) => {
        setFormData(prev => ({
            ...prev,
            imageGallery: prev.imageGallery.filter((_, index) => index !== indexToRemove)
        }));
    };

    // --- SUBMIT ---
    const handleSubmit = async e => {
        e.preventDefault();
        if (!formData.image) return toast.error("Main image is required.");

        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            
            if (editId) {
                await api.put(`/api/cars/${editId}`, formData, config);
                toast.success("Car updated successfully!");
                cancelEditHandler(); 
            } else {
                await api.post('/api/cars', formData, config);
                toast.success("Car listed successfully!");
                cancelEditHandler(); 
            }
            fetchCars(); 
        } catch (error) {
            const msg = error.response?.data?.message || "Operation failed.";
            toast.error(msg);
        }
    };

    // --- DELETE ---
    const deleteHandler = async (id, title) => {
        if (window.confirm(`Delete "${title}"?`)) {
            try {
                const config = { headers: { Authorization: `Bearer ${token}` } };
                await api.delete(`/api/cars/${id}`, config);
                toast.success("Deleted.");
                fetchCars();
            } catch (error) {
                toast.error("Failed to delete.");
            }
        }
    };

    return (
        <div className="p-4 lg:p-8 flex flex-col lg:grid lg:grid-cols-5 gap-8">
            
            {/* --- LEFT SIDE: FORM --- */}
            <div className="lg:col-span-2 order-1">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <div className="flex justify-between items-center mb-6 border-b pb-4">
                        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                           <FaCar className="text-blue-600"/> 
                           {editId ? 'Edit Car' : 'List New Car'}
                        </h1>
                        {editId && (
                            <button onClick={cancelEditHandler} className="text-red-500 flex items-center gap-1 text-sm font-bold border border-red-500 px-3 py-1 rounded-full hover:bg-red-50">
                                <FaTimes /> Cancel
                            </button>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Basic Info */}
                        <div className="grid grid-cols-2 gap-3">
                            <input type="text" name="make" placeholder="Make" value={formData.make} onChange={handleChange} className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
                            <input type="text" name="model" placeholder="Model" value={formData.model} onChange={handleChange} className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                            <input type="number" name="year" placeholder="Year" value={formData.year} onChange={handleChange} className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
                            <input type="number" name="price" placeholder="Price (FCFA)" value={formData.price} onChange={handleChange} className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                            <input type="number" name="mileage" placeholder="Mileage (km)" value={formData.mileage} onChange={handleChange} className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
                            <select name="condition" value={formData.condition} onChange={handleChange} className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                                <option value="Used">Used</option>
                                <option value="New">Brand New</option>
                            </select>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                            <select name="transmission" value={formData.transmission} onChange={handleChange} className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                                <option value="Automatic">Automatic</option>
                                <option value="Manual">Manual</option>
                            </select>
                            <input type="text" name="fuelType" placeholder="Fuel Type" value={formData.fuelType} onChange={handleChange} className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
                        </div>
                        
                        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" rows="3"></textarea>

                        {/* --- MAIN IMAGE UPLOAD --- */}
                        <div className="border-t pt-4">
                            <label className="block text-gray-700 mb-2 font-bold text-sm">Main Thumbnail (Required)</label>
                            {formData.image && (
                                <div className="mb-2 relative w-32 h-20 bg-gray-100 rounded overflow-hidden border">
                                    <img src={formData.image.startsWith('http') ? formData.image : `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'}${formData.image}`} alt="Main" className="w-full h-full object-cover"/>
                                </div>
                            )}
                            <input type="file" id="main-image" onChange={uploadMainHandler} className="w-full p-2 border rounded-lg text-sm bg-gray-50" />
                        </div>

                        {/* --- GALLERY UPLOAD --- */}
                        <div className="border-t pt-4">
                            <label className="block text-gray-700 mb-2 font-bold text-sm flex items-center gap-2">
                                <FaImages className="text-blue-500"/> Photo Gallery
                            </label>
                            
                            {/* Gallery Preview Grid */}
                            {formData.imageGallery.length > 0 && (
                                <div className="grid grid-cols-4 gap-2 mb-3">
                                    {formData.imageGallery.map((img, index) => (
                                        <div key={index} className="relative h-16 w-full bg-gray-100 rounded border overflow-hidden group">
                                            <img 
                                                src={img.startsWith('http') ? img : `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'}${img}`} 
                                                alt={`Gallery ${index}`} 
                                                className="w-full h-full object-cover"
                                            />
                                            <button 
                                                type="button"
                                                onClick={() => removeGalleryImage(index)}
                                                className="absolute top-0 right-0 bg-red-600 text-white p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                                title="Remove photo"
                                            >
                                                <FaTimes />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <label className="cursor-pointer flex items-center justify-center gap-2 w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 hover:border-red-400 transition-colors">
                                <FaCloudUploadAlt className="text-xl"/>
                                <span className="text-sm">Click to add multiple photos</span>
                                <input 
                                    type="file" 
                                    id="gallery-images"
                                    multiple // Allows multiple selection
                                    onChange={uploadGalleryHandler} 
                                    className="hidden" 
                                />
                            </label>
                            {uploading && <p className="text-blue-500 text-sm mt-1 animate-pulse">Uploading images...</p>}
                        </div>

                        <button type="submit" className={`w-full text-white p-3 rounded-lg font-bold shadow-lg transition-transform active:scale-95 ${editId ? 'bg-red-600 hover:bg-red-700' : 'bg-red-600 hover:bg-red-700'}`}>
                            {editId ? 'Update Car' : 'List Car'}
                        </button>
                    </form>
                </div>
            </div>
            
            {/* --- RIGHT SIDE: LIST --- */}
            <div className="lg:col-span-3 order-2">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Inventory</h2>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{cars.length} Cars</span>
                </div>
                
                {loading ? (
                    <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div></div>
                ) : (
                    <div className="space-y-4 lg:max-h-[85vh] lg:overflow-y-auto lg:pr-2">
                        {cars.length > 0 ? cars.map(car => (
                            <div key={car._id} className={`bg-white shadow-sm p-4 rounded-xl border flex flex-col sm:flex-row gap-4 transition-all hover:shadow-md ${editId === car._id ? 'border-orange-500 ring-1 ring-orange-500 bg-orange-50' : 'border-gray-200'}`}>
                                
                                <div className="w-full sm:w-32 h-48 sm:h-24 flex-shrink-0 relative">
                                    <img 
                                        src={car.image && car.image.startsWith('http') ? car.image : `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'}${car.image}`} 
                                        alt={car.make} 
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                    {/* Badge showing if gallery exists */}
                                    {car.imageGallery && car.imageGallery.length > 0 && (
                                        <span className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-[10px] px-1.5 rounded flex items-center gap-1">
                                            <FaImages /> +{car.imageGallery.length}
                                        </span>
                                    )}
                                </div>

                                <div className="flex-grow flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-gray-800 text-lg">{car.year} {car.make} {car.model}</h3>
                                            <span className="font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded text-sm whitespace-nowrap">
                                                {Number(car.price).toLocaleString('fr-FR')} FCFA
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1 flex gap-3">
                                            <span>{car.mileage} km</span>
                                            <span>•</span>
                                            <span>{car.transmission}</span>
                                            <span>•</span>
                                            <span className={`${car.condition === 'New' ? 'text-green-600 font-bold' : ''}`}>{car.condition || 'Used'}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-end gap-3 mt-4 sm:mt-0">
                                        <button onClick={() => startEditHandler(car)} className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-3 py-1.5 rounded-lg hover:bg-yellow-100 transition-colors text-sm font-medium">
                                            <FaEdit /> Edit
                                        </button>
                                        <button onClick={() => deleteHandler(car._id, `${car.year} ${car.make} ${car.model}`)} className="flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium">
                                            <FaTrashAlt /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                                <FaCar className="mx-auto text-gray-300 text-4xl mb-3"/>
                                <p className="text-gray-500">No cars listed yet.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CarListPage;