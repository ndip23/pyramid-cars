// src/pages/DashboardPage.jsx

import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const DashboardPage = () => {
    // We can be confident 'user' exists because this page is wrapped in ProtectedRoute.
    // If a user was not logged in, they would have been redirected to /login.
    const { user } = useCart();

    // A simple fallback in the rare case the user object is somehow missing
    if (!user) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl text-primary-red">Error: User data not found.</h1>
                <p className="mt-4">Please try <Link to="/login" className="underline">logging in</Link> again.</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-black text-dark-text">
                    Welcome, <span className="text-primary-red">{user.username}</span>!
                </h1>
                <p className="text-xl mt-4 text-secondary-text">
                    This is your personal dashboard where you can manage your account.
                </p>
            </div>

            <div className="mt-12 p-6 md:p-8 bg-card-bg rounded-lg max-w-2xl mx-auto text-left shadow-lg">
                <h2 className="text-2xl font-bold border-b border-gray-300 pb-4 mb-6">Account Details</h2>
                
                <div className="space-y-4 text-lg">
                    <div className="flex justify-between items-center">
                        <strong className="text-secondary-text">Username:</strong>
                        <span className="font-semibold">{user.username}</span>
                    </div>
                    
                    {/* Note: Your current backend login only returns 'id' and 'username'.
                        To display the email, you would need to update the JWT payload
                        or the user object returned from the /api/auth/login endpoint.
                    */}
                    <div className="flex justify-between items-center">
                        <strong className="text-secondary-text">User ID:</strong>
                        <span className="text-secondary-text text-sm font-mono bg-light-bg px-2 py-1 rounded">{user.id}</span> 
                    </div>
                </div>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <Link to="/cart" className="w-full block text-center bg-gray-700 text-white font-bold py-3 rounded-lg text-lg uppercase transform hover:bg-gray-600 transition-transform">
                        View My Cart
                    </Link>
                     <Link to="/shop" className="w-full block text-center bg-primary-red text-white font-bold py-3 rounded-lg text-lg uppercase transform hover:scale-105 transition-transform">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;