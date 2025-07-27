import React, { useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { PaymentModal } from '../components/PaymentModal';
import { SAMPLE_PRODUCTS } from '../utils/constants';
import { createOrder, verifyPayment } from '../utils/api';
import { Product, PaymentResponse } from '../types';
import toast from 'react-hot-toast';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePurchase = (product: Product) => {
    setSelectedProduct(product);
  };

  const handlePayment = async (amount: number, productName: string, customerInfo: { name: string; email: string; phone: string }) => {
    setLoading(true);
    try {
      // Create order with all required fields
      const orderResponse = await createOrder({
        amount,
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        description: productName
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
        description: productName,
        order_id: order.orderId,
        handler: async (response: PaymentResponse) => {
          try {
            // Verify payment
            const verifyResponse = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verifyResponse) {
              toast.success('Payment successful!');
              setSelectedProduct(null);
            } else {
              toast.error('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          name: customerInfo.name,
          email: customerInfo.email,
          contact: customerInfo.phone
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Products & Services
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Browse and purchase our premium products and services
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SAMPLE_PRODUCTS.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onPurchase={handlePurchase}
          />
        ))}
      </div>

      {/* Payment Modal */}
      {selectedProduct && (
        <PaymentModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onPayment={handlePayment}
          loading={loading}
        />
      )}

      {/* Razorpay Script */}
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </div>
  );
};