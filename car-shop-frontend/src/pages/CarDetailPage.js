// src/pages/CarDetailPage.jsx

import { useParams, Link } from 'react-router-dom';
import { useCar } from '../hooks/useCar.js';
import { FaWhatsapp } from 'react-icons/fa';

const CarDetailPage = () => {
    const { id } = useParams();
    const { car, loading, error } = useCar(id);

    const handleWhatsAppInquiry = () => {
        if (!car) return;

        const imageUrl = car.image.startsWith('http') 
            ? car.image 
            : `${process.env.REACT_APP_API_BASE_URL}${car.image}`;
            
        const phoneNumber = "+237679323583".replace(/\s/g, '').replace('+', '');
        
        const message = `Hello Pyramid Cars, I am interested in this vehicle:\n\n` +
                        `*Vehicle:* ${car.year} ${car.make} ${car.model}\n` +
                        `*Price:* ${car.price.toLocaleString('fr-FR')} FCFA\n` +
                        `*Image:* ${imageUrl}\n\n` +
                        `Please provide more details.`;

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    if (loading) return <p className="text-center text-2xl py-20 text-secondary-text">Loading Car Details...</p>;

    if (error || !car) return (
        <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-4xl font-black text-primary-red">Vehicle Not Found</h1>
            <Link to="/cars" className="mt-8 inline-block bg-primary-red text-white font-bold py-3 px-8 rounded-lg">Back to All Cars</Link>
        </div>
    );

    const displayImageUrl = car.image && car.image.startsWith('http') 
        ? car.image 
        : `${process.env.REACT_APP_API_BASE_URL}${car.image}`;

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-light-text">{car.year} {car.make} {car.model}</h1>
            <p className="text-3xl font-black text-primary-red my-4">{car.price.toLocaleString('fr-FR')} FCFA</p>
            
            <img src={displayImageUrl} alt={`${car.make} ${car.model}`} className="w-full h-auto max-h-[60vh] object-cover rounded-lg shadow-lg mb-8"/>
            
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <h2 className="text-2xl font-bold border-b border-gray-700 pb-2 mb-4">Description</h2>
                    <p className="text-secondary-text leading-relaxed whitespace-pre-wrap">{car.description}</p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold border-b border-gray-700 pb-2 mb-4">Specifications</h2>
                    <ul className="space-y-2 text-secondary-text">
                        <li><strong>Mileage:</strong> {car.mileage.toLocaleString('fr-FR')} km</li>
                        <li><strong>Transmission:</strong> {car.transmission}</li>
                        <li><strong>Fuel Type:</strong> {car.fuelType}</li>
                        <li><strong>Year:</strong> {car.year}</li>
                    </ul>
                     <button onClick={handleWhatsAppInquiry} className="w-full mt-8 flex items-center justify-center gap-3 bg-primary-red text-white font-bold py-4 rounded-lg text-xl uppercase hover:bg-red-700">
                        <FaWhatsapp />
                        <span>Inquire on WhatsApp</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CarDetailPage;