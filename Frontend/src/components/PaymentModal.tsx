import React, { useState, useEffect } from 'react';
import { X, CreditCard, Loader2 } from 'lucide-react';
import { Product } from '../types';
import './modalTransitions.css';

interface PaymentModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onPayment: (amount: number, productName: string) => void;
  loading: boolean;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  product,
  isOpen,
  onClose,
  onPayment,
  loading
}) => {
  const [quantity, setQuantity] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [touched, setTouched] = useState({ name: false, email: false, phone: false });

  useEffect(() => {
    if (!isOpen) {
      setQuantity(1);
      setCustomerInfo({ name: '', email: '', phone: '' });
      setTouched({ name: false, email: false, phone: false });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const totalAmount = product.price * quantity;

  const handlePayment = () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      setTouched({ name: true, email: true, phone: true });
      return;
    }
    onPayment(totalAmount, `${product.name} (Qty: ${quantity})`);
  };

  const handleBlur = (field: keyof typeof customerInfo) => {
    setTouched(t => ({ ...t, [field]: true }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 modal-fade">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto scale-in">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              Complete Purchase
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Product Details */}
          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                  {product.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  ₹{product.price.toLocaleString()} each
                </p>
              </div>
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Quantity
            </label>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 bg-slate-200 dark:bg-slate-600 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
              >
                -
              </button>
              <span className="text-lg font-medium text-slate-800 dark:text-slate-100 w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 bg-slate-200 dark:bg-slate-600 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Customer Information */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 relative">
                Full Name
                <input
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  onBlur={() => handleBlur('name')}
                  className={`w-full px-4 py-3 bg-white dark:bg-slate-700 border ${touched.name && !customerInfo.name ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 dark:text-slate-100 peer`}
                  placeholder=" "
                />
                <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-xs text-slate-500 dark:text-slate-400 pointer-events-none transition-all duration-200 ${customerInfo.name ? 'opacity-0' : 'opacity-100'}`}>Enter your full name</span>
                {touched.name && !customerInfo.name && (
                  <span className="text-xs text-red-500 absolute right-2 top-1/2 -translate-y-1/2">Required</span>
                )}
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 relative">
                Email Address
                <input
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                  onBlur={() => handleBlur('email')}
                  className={`w-full px-4 py-3 bg-white dark:bg-slate-700 border ${touched.email && !customerInfo.email ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 dark:text-slate-100 peer`}
                  placeholder=" "
                />
                <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-xs text-slate-500 dark:text-slate-400 pointer-events-none transition-all duration-200 ${customerInfo.email ? 'opacity-0' : 'opacity-100'}`}>Enter your email</span>
                {touched.email && !customerInfo.email && (
                  <span className="text-xs text-red-500 absolute right-2 top-1/2 -translate-y-1/2">Required</span>
                )}
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 relative">
                Phone Number
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  onBlur={() => handleBlur('phone')}
                  className={`w-full px-4 py-3 bg-white dark:bg-slate-700 border ${touched.phone && !customerInfo.phone ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 dark:text-slate-100 peer`}
                  placeholder=" "
                />
                <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-xs text-slate-500 dark:text-slate-400 pointer-events-none transition-all duration-200 ${customerInfo.phone ? 'opacity-0' : 'opacity-100'}`}>Enter your phone number</span>
                {touched.phone && !customerInfo.phone && (
                  <span className="text-xs text-red-500 absolute right-2 top-1/2 -translate-y-1/2">Required</span>
                )}
              </label>
            </div>
          </div>

          {/* Total */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400">Total Amount:</span>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                ₹{totalAmount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <CreditCard className="w-5 h-5" />
            )}
            <span>{loading ? 'Processing...' : 'Pay with Razorpay'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};