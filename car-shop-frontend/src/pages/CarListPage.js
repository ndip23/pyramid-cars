// src/pages/CarListPage.js

import { useState, useEffect, useCallback } from 'react';
import api from '../utils/axiosConfig.js';
import CarCard from '../components/CarCard.js';
import { useNavigate, useLocation } from 'react-router-dom';

const CarListPage = () => {
    const [cars, setCars] = useState([]);
    const [makes, setMakes] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // We get the initial filters from the URL's query parameters
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);

    const [filters, setFilters] = useState({
        keyword: searchParams.get('keyword') || '',
        make: searchParams.get('make') || '',
        transmission: searchParams.get('transmission') || '',
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || ''
    });

    // --- REFACTORED DATA FETCHING LOGIC ---
    // useCallback prevents this function from being recreated on every render
    const fetchCars = useCallback(async () => {
        setLoading(true);
        try {
            // Build the query string directly from the current filters
            const params = new URLSearchParams(filters);
            // Remove empty filters so the URL is clean
            for(let key of params.keys()) {
                if(!params.get(key)) {
                    params.delete(key);
                }
            }
            
            // Update the URL in the browser
            navigate(`${location.pathname}?${params.toString()}`, { replace: true });

            const { data } = await api.get(`/api/cars?${params.toString()}`);
            setCars(data.cars);
            // Only update makes if the list is empty to avoid it changing on every filter
            if (makes.length === 0) {
                setMakes(data.makes);
            }
        } catch (err) { 
            console.error("Error fetching cars:", err); 
        } finally { 
            setLoading(false); 
        }
    }, [filters, navigate, location.pathname, makes.length]); // Dependencies for the fetch function

    // --- This effect now simply calls the fetch function ---
    useEffect(() => {
        fetchCars();
    }, [fetchCars]); // This runs once on load, and again if `fetchCars` changes (due to filters)

    const handleFilterChange = (e) => {
        setFilters(prevFilters => ({ ...prevFilters, [e.target.name]: e.target.value }));
    };

    const clearFilters = () => {
        setFilters({ keyword: '', make: '', transmission: '', minPrice: '', maxPrice: '' });
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-black text-center mb-6 text-gray-800">Cars For Sale</h1>
            
            <div className="bg-white p-4 rounded-lg shadow-md mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
                <input type="text" name="keyword" placeholder="Search Make/Model..." value={filters.keyword} onChange={handleFilterChange} className="lg:col-span-2 w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md"/>
                
                <select name="make" value={filters.make} onChange={handleFilterChange} className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md">
                    <option value="">All Makes</option>
                    {makes.map(make => <option key={make} value={make}>{make}</option>)}
                </select>

                <select name="transmission" value={filters.transmission} onChange={handleFilterChange} className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md">
                    <option value="">All Transmissions</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                </select>

                <input type="number" name="minPrice" placeholder="Min Price (FCFA)" value={filters.minPrice} onChange={handleFilterChange} className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md"/>

                <button onClick={clearFilters} className="bg-gray-600 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-700">Clear</button>
            </div>

            {loading ? (
                <p className="text-center text-2xl py-20 text-gray-500">Searching for Cars...</p>
            ) : (
                cars && cars.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cars.map(car => <CarCard key={car._id} car={car} />)}
                    </div>
                ) : (
                    <p className="text-center text-2xl py-20 text-gray-500">No cars found matching your criteria.</p>
                )
            )}
        </div>
    );
};

export default CarListPage;