import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const healthCheck = async () => {
  const response = await api.get('/health');
  return response.data;
};

export const updateRazorpayConfig = async (config: { keyId: string; keySecret: string }) => {
  const response = await api.post('/config/razorpay', config);
  return response.data;
};

export const getConfig = async () => {
  const response = await api.get('/config');
  return response.data;
};

export const createOrder = async (orderData: { 
  amount: number; 
  currency?: string; 
  receipt?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  description?: string;
}): Promise<{
  success: boolean;
  message: string;
  data: {
    orderId: string;
    amount: string;
    receiptId: string;
    razorPayOrderId: string;
    razorPayPaymentId: string;
    razorPaySignature: string;
    created_at: string;
  };
}> => {
  const response = await api.post('/payments/create-order', orderData);
  return response.data;
};

export const verifyPayment = async (paymentData: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}): Promise<boolean> => {
  // Backend expects query parameters and returns a simple boolean
  console.log('Sending verification request to backend:', {
    paymentId: paymentData.razorpay_payment_id,
    orderId: paymentData.razorpay_order_id,
    signature: paymentData.razorpay_signature
  });
  
  try {
    const response = await api.post('/payments/verify', null, {
      params: {
        paymentId: paymentData.razorpay_payment_id,
        orderId: paymentData.razorpay_order_id,
        signature: paymentData.razorpay_signature
      }
    });
    
    console.log('Backend verification response (success):', response.data);
    return response.data;
  } catch (error: any) {
    // Backend returns 400 when verification fails (signature mismatch)
    if (error.response?.status === 400) {
      console.log('Backend verification response (failed):', error.response.data);
      return false;
    }
    // Re-throw other errors (500, network errors, etc.)
    throw error;
  }
};

export const getPaymentDetails = async (paymentId: string) => {
  const response = await api.get(`/payment/${paymentId}`);
  return response.data;
};

export default api;