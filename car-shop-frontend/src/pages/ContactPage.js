// src/pages/ContactPage.jsx

import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const ContactPage = () => {
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        toast.success("Thank you for your message! We'll get back to you soon.");
        e.target.reset();
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-black text-light-text">Contact Us</h1>
                <p className="mt-4 text-lg max-w-2xl mx-auto text-secondary-text">
                    Have questions? We're here to help. Reach out to us anytime.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-dark-card p-8 rounded-lg"
                >
                    <h2 className="text-3xl font-bold mb-6">Send a Message</h2>
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                        <input type="text" placeholder="Your Name" required className="w-full px-4 py-3 bg-dark-bg border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red" />
                        <input type="email" placeholder="Your Email" required className="w-full px-4 py-3 bg-dark-bg border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red" />
                        <textarea placeholder="Your Message" required rows="5" className="w-full px-4 py-3 bg-dark-bg border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"></textarea>
                        <button type="submit" className="w-full py-3 font-bold text-white bg-primary-red rounded-md hover:bg-red-700 transition-colors">
                            Send Message
                        </button>
                    </form>
                </motion.div>

                <div className="space-y-8 flex flex-col justify-center">
                    <div className="flex items-start gap-4">
                        <FaMapMarkerAlt className="text-primary-red text-3xl mt-1" />
                        <div>
                            <h3 className="text-2xl font-bold">Our Address</h3>
                            <p className="text-secondary-text">GODWIN, Bonaberi, Douala</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <FaPhoneAlt className="text-primary-red text-3xl mt-1" />
                        <div>
                            <h3 className="text-2xl font-bold">Phone</h3>
                            <a href="https://wa.me/237679323583" target="_blank" rel="noopener noreferrer" className="text-secondary-text hover:text-primary-red transition-colors">
                                +23767923583
                            </a>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <FaEnvelope className="text-primary-red text-3xl mt-1" />
                        <div>
                            <h3 className="text-2xl font-bold">Email</h3>
                            <a 
                                href="mailto:ojongagbor87@gmail.com"
                                className="text-secondary-text hover:text-primary-red transition-colors"
                            >
                                ojongagbor87@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;