// src/pages/PaymentResultPage.tsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const PaymentResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  // State passed from CheckoutPage via navigate state
  const state = (location as any).state || {};
  const status: string = state.status || 'error';
  const orderId: string = state.orderId || '';

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-navy-950 text-slate-100 p-6">
      {status === 'success' ? (
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-cyan-400">Payment Successful 🎉</h2>
          <p className="text-sm">Order Reference: <span className="font-mono text-white">{orderId}</span></p>
          {user && (
            <p className="text-sm">Thank you, {user.name}. Your subscription has been activated.</p>
          )}
          <button
            onClick={handleBack}
            className="mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded"
          >
            Go to Dashboard
          </button>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-rose-400">Payment Failed or Cancelled</h2>
          <p className="text-sm">Your payment could not be completed. Please try again.</p>
          <button
            onClick={() => navigate('/pricing')}
            className="mt-4 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded"
          >
            Return to Pricing
          </button>
        </div>
      )}
    </div>
  );
};
