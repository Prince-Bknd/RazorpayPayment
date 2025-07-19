import axios from 'axios';
import { PaymentConfig } from '../types';

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

export const createOrder = async (orderData: { amount: number; currency?: string; receipt?: string }) => {
  const response = await api.post('/create-order', orderData);
  return response.data;
};

export const verifyPayment = async (paymentData: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}) => {
  const response = await api.post('/verify-payment', paymentData);
  return response.data;
};

export const getPaymentDetails = async (paymentId: string) => {
  const response = await api.get(`/payment/${paymentId}`);
  return response.data;
};

export default api;