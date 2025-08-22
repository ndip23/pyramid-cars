// src/pages/ProductDetailPage.jsx

import { useParams, Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct.js';
import { FaWhatsapp, FaStar, FaChevronLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const ProductDetailPage = () => {
    const { productId } = useParams();
    const { product, loading, error } = useProduct(productId);

    const handleWhatsAppOrder = () => {
        if (!product) {
            toast.error("Product details are not yet loaded.");
            return;
        }

        // Construct the full, public URL for the image
        const imageUrl = product.image.startsWith('http') 
            ? product.image 
            : `${process.env.REACT_APP_API_BASE_URL}${product.image}`;

        const phoneNumber = "+237679323583".replace(/\s/g, '').replace('+', '');
        
        // Create a detailed message with the image link
        const message = `Hello Pyramid Cars, I am interested in this spare part:\n\n` +
                        `*Part Name:* ${product.name}\n` +
                        `*Price:* ${product.price.toLocaleString('fr-FR')} FCFA\n` +
                        `*Image:* ${imageUrl}\n\n` +
                        `Is this item still available?`;

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    if (loading) return <p className="text-center text-2xl py-20 text-secondary-text">Loading Product Details...</p>;

    if (error || !product) {
        return (
             <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-4xl font-black text-primary-red">Product Not Found</h1>
                <p className="text-xl mt-4 text-secondary-text">{error || "The product you are looking for does not exist."}</p>
                <Link to="/parts" className="mt-8 inline-block bg-primary-red text-white font-bold py-3 px-8 rounded-lg">Back to All Parts</Link>
            </div>
        );
    }

    const displayImageUrl = product.image && product.image.startsWith('http') 
        ? product.image 
        : `${process.env.REACT_APP_API_BASE_URL}${product.image}`;

    return (
        <div className="container mx-auto px-4 py-12 md:py-20">
            <Link to="/parts" className="inline-flex items-center gap-2 text-secondary-text hover:text-light-text mb-8 transition-colors">
                <FaChevronLeft />
                <span>Back to All Parts</span>
            </Link>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                 <motion.div className="bg-dark-card p-8 rounded-lg flex items-center justify-center" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
                    <img src={displayImageUrl} alt={product.name} className="max-w-full h-auto max-h-[400px] object-contain" />
                </motion.div>
                <motion.div className="flex flex-col" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
                    <h1 className="text-4xl md:text-5xl font-black text-light-text">{product.name}</h1>
                    <div className="flex items-center text-secondary-text my-4">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span>{product.rating} ({product.reviews} Reviews)</span>
                    </div>
                    <p className="text-4xl font-black text-primary-red my-4">{product.price.toLocaleString('fr-FR')} FCFA</p>
                    <p className="text-secondary-text text-lg leading-relaxed mt-4">High-quality replacement part designed for durability and performance. Meets or exceeds OEM specifications.</p>
                    <div className="mt-auto pt-8">
                        <button onClick={handleWhatsAppOrder} className="w-full flex items-center justify-center gap-3 bg-primary-red text-white font-bold py-4 px-8 rounded-lg text-xl uppercase hover:bg-red-700 transition-all transform hover:scale-105">
                            <FaWhatsapp />
                            <span>Inquire on WhatsApp</span>
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProductDetailPage;