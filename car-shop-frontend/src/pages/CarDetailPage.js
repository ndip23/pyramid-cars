import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCar } from '../hooks/useCar.js';
import { FaWhatsapp, FaArrowLeft } from 'react-icons/fa';

const CarDetailPage = () => {
    const { id } = useParams();
    const { car, loading, error } = useCar(id);
    
    // State to handle switching the main image when a thumbnail is clicked
    const [activeImage, setActiveImage] = useState(null);

    // Set the initial active image once the car data loads
    useEffect(() => {
        if (car) {
            setActiveImage(car.image);
        }
    }, [car]);

    // Helper to format image URLs correctly
    const getImgUrl = (path) => {
        if (!path) return '';
        return path.startsWith('http') 
            ? path 
            : `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'}${path}`;
    };

    const handleWhatsAppInquiry = () => {
        if (!car) return;

        const currentUrl = window.location.href; // Get current page link
        const phoneNumber = "+237679323583".replace(/\s/g, '').replace('+', '');
        
        const message = `Hello Pyramid Cars, I am interested in this vehicle:\n\n` +
                        `*${car.year} ${car.make} ${car.model}*\n` +
                        `*Price:* ${Number(car.price).toLocaleString('fr-FR')} FCFA\n` +
                        `*Link:* ${currentUrl}\n\n` +
                        `Is it still available?`;

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
    );

    if (error || !car) return (
        <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-4xl font-black text-gray-800">Vehicle Not Found</h1>
            <Link to="/cars" className="mt-8 inline-flex items-center gap-2 bg-red-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700">
                <FaArrowLeft /> Back to All Cars
            </Link>
        </div>
    );

    // Combine main image and gallery into one array for thumbnails
    const allImages = [car.image, ...(car.imageGallery || [])];

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Breadcrumb / Back */}
            <Link to="/cars" className="inline-flex items-center gap-2 text-gray-500 hover:text-red-600 mb-6 font-medium">
                <FaArrowLeft /> Back to Inventory
            </Link>

            <div className="grid lg:grid-cols-2 gap-10">
                
                {/* --- LEFT COLUMN: IMAGE GALLERY --- */}
                <div>
                    {/* Main Active Image */}
                    <div className="w-full h-[400px] bg-gray-100 rounded-xl overflow-hidden shadow-lg border border-gray-200 mb-4">
                        <img 
                            src={getImgUrl(activeImage)} 
                            alt={`${car.make} ${car.model}`} 
                            className="w-full h-full object-contain"
                        />
                    </div>

                    {/* Thumbnails Strip */}
                    {allImages.length > 1 && (
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            {allImages.map((img, index) => (
                                <button 
                                    key={index}
                                    onClick={() => setActiveImage(img)}
                                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                                        activeImage === img ? 'border-red-600 ring-2 ring-red-100' : 'border-gray-200 hover:border-gray-400'
                                    }`}
                                >
                                    <img 
                                        src={getImgUrl(img)} 
                                        alt={`Thumbnail ${index}`} 
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* --- RIGHT COLUMN: DETAILS --- */}
                <div>
                    <h1 className="text-4xl font-black text-gray-900 uppercase">{car.year} {car.make} {car.model}</h1>
                    
                    <div className="flex flex-wrap items-center gap-4 my-4">
                        <p className="text-3xl font-bold text-red-600">
                            {Number(car.price).toLocaleString('fr-FR')} FCFA
                        </p>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${car.condition === 'New' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                            {car.condition || 'Used'}
                        </span>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
                        <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-4 text-gray-800">Specifications</h2>
                        <ul className="grid grid-cols-2 gap-y-3 text-gray-700">
                            <li><strong>Mileage:</strong> {Number(car.mileage).toLocaleString()} km</li>
                            <li><strong>Transmission:</strong> {car.transmission}</li>
                            <li><strong>Fuel Type:</strong> {car.fuelType}</li>
                            <li><strong>Condition:</strong> {car.condition || 'Used'}</li>
                            <li><strong>Year:</strong> {car.year}</li>
                        </ul>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4 text-gray-800">Description</h2>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{car.description}</p>
                    </div>

                    <button 
                        onClick={handleWhatsAppInquiry} 
                        className="w-full flex items-center justify-center gap-3 bg-green-500 text-white font-bold py-4 rounded-xl text-lg uppercase hover:bg-green-600 transition-colors shadow-lg shadow-green-200"
                    >
                        <FaWhatsapp className="text-2xl" />
                        <span>Inquire on WhatsApp</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CarDetailPage;