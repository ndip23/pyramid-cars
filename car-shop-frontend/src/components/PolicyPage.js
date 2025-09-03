// src/components/PolicyPage.jsx
import { motion } from 'framer-motion';

// This component takes a title and content as props to display them.
const PolicyPage = ({ title, children }) => {
    return (
        <motion.div 
            className="container mx-auto px-4 py-16 md:py-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-8 border-b border-gray-200 pb-4">
                {title}
            </h1>
            
            {/* The 'prose' classes from Tailwind automatically style blocks of text */}
            <div className="prose prose-lg max-w-none text-gray-600">
                {children}
            </div>
        </motion.div>
    );
};

export default PolicyPage;