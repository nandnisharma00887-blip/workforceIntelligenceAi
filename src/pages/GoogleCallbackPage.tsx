import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const GoogleCallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithToken } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
      loginWithToken(token)
        .then((res) => {
          if (res.success) {
            navigate('/dashboard');
          } else {
            navigate('/login');
          }
        })
        .catch(() => navigate('/login'));
    } else {
      navigate('/login');
    }
  }, [location, navigate, loginWithToken]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-navy-950 text-slate-100">
      <p>Processing Google login...</p>
    </div>
  );
};
