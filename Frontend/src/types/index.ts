export interface PaymentConfig {
  razorpayKeyId: string;
  razorpayKeySecret: string;
  port: number;
}

export interface Order {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
  created_at: number;
}

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  order_id: string;
  method: string;
  created_at: number;
}

export interface PaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}



export interface Theme {
  mode: 'light' | 'dark';
}

export interface NavigationItem {
  name: string;
  href: string;
  icon: string;
  current: boolean;
}