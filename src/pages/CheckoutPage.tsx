// src/pages/CheckoutPage.tsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';

// Razorpay exposes a global `Razorpay` constructor after loading its script.
declare global {
  interface Window {
    Razorpay: any;
  }
}

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Expected `state` shape from Pricing CTA:
  // { order: RazorpayOrder, planId: string }
  const order = (state as any)?.order;
  const planId = (state as any)?.planId;

  // Load Razorpay script only once.
  const loadRazorpayScript = () => {
    return new Promise<boolean>((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    // Guard: if something went wrong before navigation, go back to pricing.
    if (!order || !planId) {
      navigate('/pricing');
      return;
    }

    const initiatePayment = async () => {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        // Fallback UI – could show a toast, but we simply redirect.
        navigate('/payment-result', { replace: true, state: { status: 'error' } });
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID as string, // Public key from .env
        amount: order.amount, // already in paise
        currency: order.currency,
        name: 'Workforce Productivity Intelligence',
        description: `${planId.charAt(0).toUpperCase() + planId.slice(1)} Plan`,
        order_id: order.id,
        handler: async (response: any) => {
          try {
            await apiService.verifyPayment({
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              planId,
            });
            navigate('/payment-result', { replace: true, state: { status: 'success', orderId: response.razorpay_order_id } });
          } catch (err) {
            navigate('/payment-result', { replace: true, state: { status: 'error' } });
          }
        },
        prefill: {
          // optional – we could pre‑fill from user context
        },
        theme: {
          color: '#0ea5e9', // cyan‑600 matches UI theme
        },
        modal: {
          // Close event – user dismissed checkout without completing payment.
          ondismiss: () => navigate('/payment-result', { replace: true, state: { status: 'error' } }),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    };

    initiatePayment();
    // The effect runs only once on mount.
  }, [order, planId, navigate]);

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-navy-950 text-slate-100">
      <p className="text-lg">Redirecting to payment gateway…</p>
    </div>
  );
};
