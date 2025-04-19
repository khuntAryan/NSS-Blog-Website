/* eslint-disable react/prop-types */
// components/AdminCheck.jsx
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function AdminCheck({ children }) {
    const { status, isAdmin } = useSelector((state) => state.auth);
    
    if (!status) {
        return <Navigate to="/login" />;
    }
    
    if (!isAdmin) {
        return <Navigate to="/" />;
    }
    
    return children;
}