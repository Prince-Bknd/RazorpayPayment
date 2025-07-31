import React, { useState, useEffect } from 'react';
import { CreditCard, ArrowRight, Loader2 } from 'lucide-react';
import { createOrder, verifyPayment } from '../utils/api';
import { ConnectionWarning } from '../components/ConnectionWarning';
import toast from 'react-hot-toast';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const Payments: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount) {
      toast.error('Please enter an amount');
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setLoading(true);
    try {
      // Create order with custom amount
      const orderResponse = await createOrder({
        amount: numAmount,
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
        customerName: 'Customer',
        customerEmail: 'customer@example.com',
        customerPhone: '+91 9999999999',
        description: `Payment of ₹${numAmount}`
      });

      if (!orderResponse.success) {
        throw new Error(orderResponse.message);
      }

      const order = orderResponse.data;
      const keyId = 'rzp_test_My5AxvarnmYFkS'; // This should come from backend config

      // Configure Razorpay options
      const options = {
        key: keyId,
        amount: order.amount,
        currency: 'INR',
        name: 'Razorpay Payment Gateway',
        description: `Payment of ₹${numAmount}`,
        order_id: order.orderId,
        handler: async (response: any) => {
          try {
            // Verify payment
            const verifyResponse = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verifyResponse) {
              toast.success('Payment successful!');
              // Reset form
              setAmount('');
            } else {
              toast.error('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          name: 'Customer',
          email: 'customer@example.com',
          contact: '+91 9999999999'
        },
        theme: {
          color: '#3B82F6'
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          }
        }
      };

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      console.error('Payment error:', error);
      toast.error(error.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Connection Warning */}
      <ConnectionWarning />
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Make Payment
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Enter your payment details and complete the transaction
        </p>
      </div>

      {/* Payment Form */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                Type Amount
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Enter the amount you want to pay
              </p>
            </div>
          </div>

          <form onSubmit={handlePayment} className="space-y-6">
            {/* Amount Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Amount (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg font-medium">₹</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 dark:text-slate-100 text-lg font-medium"
                  required
                />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Enter the amount in Indian Rupees (INR)
              </p>
            </div>

            {/* Payment Summary */}
            {amount && parseFloat(amount) > 0 && (
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 border border-slate-200 dark:border-slate-600">
                <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Payment Summary
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Amount to Pay:</span>
                  <span className="text-xl font-bold text-slate-800 dark:text-slate-100">
                    ₹{parseFloat(amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            )}

            {/* Pay Now Button */}
            <button
              type="submit"
              disabled={loading || !amount}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-medium py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed text-lg"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <ArrowRight className="w-5 h-5" />
              )}
              <span>{loading ? 'Processing...' : 'Pay Now'}</span>
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-white text-xs font-bold">!</span>
              </div>
              <div>
                <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-1">
                  Secure Payment
                </h4>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  Your payment is processed securely through Razorpay. We never store your payment details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};