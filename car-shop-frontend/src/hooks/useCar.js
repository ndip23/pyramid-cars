// src/hooks/useCar.js
import { useState, useEffect } from 'react';
import api from '../utils/axiosConfig.js';

export const useCar = (carId) => {
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const { data } = await api.get(`/api/cars/${carId}`);
                setCar(data);
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        if (carId) fetchCar();
    }, [carId]);

    return { car, loading };
};