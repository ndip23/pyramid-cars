// src/components/AdminRoute.jsx
import { Navigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const AdminRoute = ({ children }) => {
    const { user } = useCart();

    if (user && user.role === 'admin') {
        return children;
    } else {
        toast.error("Access denied. Admin authorization required.");
        return <Navigate to="/" replace />;
    }
};

export default AdminRoute;