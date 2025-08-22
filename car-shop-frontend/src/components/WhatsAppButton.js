// src/components/WhatsAppButton.jsx

import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const WhatsAppButton = () => {
    // Format phone number for the WhatsApp URL
    const phoneNumber = "+237679323583".replace(/\s/g, '').replace('+', '');
    const whatsappUrl = `https://wa.me/${phoneNumber}`;

    return (
        <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="fixed bottom-6 right-6 z-50"
        >
            <motion.div 
                className="bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1, type: 'spring', stiffness: 120 }}
            >
                <FaWhatsapp className="text-4xl" />
            </motion.div>
        </a>
    );
};

export default WhatsAppButton;