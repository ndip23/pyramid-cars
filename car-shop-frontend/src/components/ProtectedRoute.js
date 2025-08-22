// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

/**
 * A component that protects routes requiring authentication.
 * If the user is logged in, it renders the child component.
 * Otherwise, it redirects the user to the login page, remembering where they tried to go.
 * @param {{ children: JSX.Element }} props
 */
const ProtectedRoute = ({ children }) => {
    const { user } = useCart(); // Get user state from our context
    const location = useLocation(); // Get the current URL location

    if (!user) {
        // If no user is logged in, redirect to the /login page.
        // We pass the current location in the state. This allows us to
        // redirect the user back to the page they were trying to access
        // after they successfully log in.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If a user is logged in, render the child component that was passed in.
    return children;
};

export default ProtectedRoute;