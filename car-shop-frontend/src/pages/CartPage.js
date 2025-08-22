// src/pages/CartPage.jsx

import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.js';
import { FaTrashAlt, FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const CartPage = () => {
    const { cartItems, cartSubtotal, removeFromCart, updateQuantity } = useCart();

    const handleWhatsAppCheckout = () => {
        if (cartItems.length === 0) return;

        let message = "Hello Pyramid Cars, I would like to finalize my order for the following spare parts:\n\n";
        
        cartItems.forEach(item => {
            const imageUrl = item.image.startsWith('http') 
                ? item.image 
                : `${process.env.REACT_APP_API_BASE_URL}${item.image}`;

            message += `*Item:* ${item.name}\n`;
            message += `*Image:* ${imageUrl}\n`;
            message += `*Quantity:* ${item.quantity}\n`;
            message += `*Subtotal:* ${(item.price * item.quantity).toLocaleString('fr-FR')} FCFA\n`;
            message += `-----------------------------\n`;
        });

        message += `\n*Total Order Price:* ${cartSubtotal.toLocaleString('fr-FR')} FCFA`;
        message += `\n\nI am ready to proceed with payment arrangements.`;

        const phoneNumber = "+237679323583".replace(/\s/g, '').replace('+', '');
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const CartItem = ({ item }) => (
        <motion.div 
            layout initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50, transition: { duration: 0.3 } }}
            className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-dark-card rounded-lg"
        >
            <img src={item.image.startsWith('http') ? item.image : `${process.env.REACT_APP_API_BASE_URL}${item.image}`} alt={item.name} className="w-24 h-24 object-contain rounded-md bg-white p-1"/>
            <div className="flex-grow text-center sm:text-left">
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-secondary-text">{item.price.toLocaleString('fr-FR')} FCFA</p>
            </div>
            <div className="flex items-center gap-4">
                <input type="number" min="1" value={item.quantity} onChange={(e) => updateQuantity(item._id, e.target.value)} className="w-16 bg-dark-bg text-center rounded-md p-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-red" />
                <p className="w-24 text-lg font-bold text-center">{(item.price * item.quantity).toLocaleString('fr-FR')} FCFA</p>
                <button onClick={() => removeFromCart(item._id)} className="text-secondary-text hover:text-primary-red text-xl transition-colors"><FaTrashAlt /></button>
            </div>
        </motion.div>
    );

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-4xl font-black">Your Cart is Empty</h1>
                <p className="text-xl mt-4 text-secondary-text">You can add spare parts to your cart to order them together.</p>
                <Link to="/parts" className="mt-8 inline-block bg-primary-red text-white font-bold py-3 px-8 rounded-lg text-lg uppercase transform hover:scale-105 transition-transform">Shop for Parts</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 md:py-20">
            <h1 className="text-4xl font-black text-center mb-12">Your Shopping Cart</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    <AnimatePresence>{cartItems.map(item => <CartItem key={item._id} item={item} />)}</AnimatePresence>
                </div>
                <div className="bg-dark-card p-6 rounded-lg h-fit">
                    <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                    <div className="flex justify-between text-lg mb-4">
                        <span className="text-secondary-text">Subtotal</span>
                        <span className="font-bold">{cartSubtotal.toLocaleString('fr-FR')} FCFA</span>
                    </div>
                    <div className="flex justify-between text-lg mb-6">
                        <span className="text-secondary-text">Shipping</span>
                        <span className="font-bold">To be discussed</span>
                    </div>
                    <div className="border-t border-gray-700 my-4"></div>
                    <div className="flex justify-between text-2xl font-black mb-6">
                        <span>Total</span>
                        <span>{cartSubtotal.toLocaleString('fr-FR')} FCFA</span>
                    </div>
                    <button onClick={handleWhatsAppCheckout} className="w-full flex items-center justify-center gap-3 bg-green-500 text-white font-bold py-3 rounded-lg text-lg uppercase transform hover:scale-105 transition-transform hover:bg-green-600">
                        <FaWhatsapp />
                        <span>Finalize on WhatsApp</span>
                    </button>
                    <div className="mt-6 text-center">
                        <p className="text-secondary-text mb-2">We accept</p>
                        <div className="flex justify-center items-center gap-4">
                            <img src="/images/mtn-momo-logo.png" alt="MTN Mobile Money" className="h-8"/>
                            <img src="/images/orange-money-logo.png" alt="Orange Money" className="h-10"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;