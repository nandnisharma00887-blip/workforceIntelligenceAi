import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Activity, Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-navy-950 text-slate-200">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-400 to-indigo-600 flex items-center justify-center shadow-glow-cyan animate-pulse mb-4">
          <Activity className="w-6 h-6 text-white" />
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          <span>Verifying Enterprise Session...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect to /login, remembering the attempted URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
