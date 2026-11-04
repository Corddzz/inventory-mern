// frontend/src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null; // or a spinner

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
