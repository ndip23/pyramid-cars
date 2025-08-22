// src/pages/CarListPage.jsx
import { useState, useEffect } from 'react';
import api from '../utils/axiosConfig.js';
import CarCard from '../components/CarCard.js';
import { useNavigate, useLocation } from 'react-router-dom';

const CarListPage = () => {
    const [cars, setCars] = useState([]);
    const [makes, setMakes] = useState([]); // To populate the 'make' dropdown
    const [loading, setLoading] = useState(true);
    
    // --- State for our filters ---
    const [filters, setFilters] = useState({
        keyword: '',
        make: '',
        transmission: '',
        minPrice: '',
        maxPrice: ''
    });

    const navigate = useNavigate();
    const location = useLocation();

    // This effect will run whenever the filters change
    useEffect(() => {
        // Construct the query string from the filters state
        const params = new URLSearchParams();
        if (filters.keyword) params.append('keyword', filters.keyword);
        if (filters.make) params.append('make', filters.make);
        if (filters.transmission) params.append('transmission', filters.transmission);
        if (filters.minPrice) params.append('minPrice', filters.minPrice);
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

        // Update the URL in the browser (good for sharing links)
        navigate(`${location.pathname}?${params.toString()}`);

        const fetchCars = async () => {
            setLoading(true);
            try {
                const { data } = await api.get(`/api/cars?${params.toString()}`);
                setCars(data.cars);
                setMakes(data.makes); // Get the list of makes for the dropdown
            } catch (err) { console.error(err); } 
            finally { setLoading(false); }
        };
        fetchCars();
    }, [filters, navigate, location.pathname]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const clearFilters = () => {
        setFilters({ keyword: '', make: '', transmission: '', minPrice: '', maxPrice: '' });
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-black text-center mb-6">Cars For Sale</h1>
            
            {/* --- FILTER AND SEARCH UI --- */}
            <div className="bg-dark-card p-4 rounded-lg mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
                {/* Search by Keyword */}
                <input type="text" name="keyword" placeholder="Search Make/Model..." value={filters.keyword} onChange={handleFilterChange} className="lg:col-span-2 w-full px-4 py-2 bg-dark-bg border border-gray-700 rounded-md"/>
                
                {/* Filter by Make */}
                <select name="make" value={filters.make} onChange={handleFilterChange} className="w-full px-4 py-2 bg-dark-bg border border-gray-700 rounded-md">
                    <option value="">All Makes</option>
                    {makes.map(make => <option key={make} value={make}>{make}</option>)}
                </select>

                {/* Filter by Transmission */}
                <select name="transmission" value={filters.transmission} onChange={handleFilterChange} className="w-full px-4 py-2 bg-dark-bg border border-gray-700 rounded-md">
                    <option value="">All Transmissions</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                </select>

                {/* Price Range (Simplified) */}
                <input type="number" name="minPrice" placeholder="Min Price (FCFA)" value={filters.minPrice} onChange={handleFilterChange} className="w-full px-4 py-2 bg-dark-bg border border-gray-700 rounded-md"/>

                {/* Clear Button */}
                <button onClick={clearFilters} className="bg-secondary-text text-white font-bold py-2 px-4 rounded-md">Clear</button>
            </div>

            {loading ? (
                <p className="text-center text-2xl py-20">Searching for Cars...</p>
            ) : (
                cars.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cars.map(car => <CarCard key={car._id} car={car} />)}
                    </div>
                ) : (
                    <p className="text-center text-2xl py-20 text-secondary-text">No cars found matching your criteria.</p>
                )
            )}
        </div>
    );
};
export default CarListPage;