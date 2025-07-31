export const APP_NAME = 'Razorpay Payment Gateway';
export const APP_VERSION = '1.0.0';

export const NAVIGATION_ITEMS = [
  { name: 'Dashboard', href: '/', icon: 'LayoutDashboard' },
  { name: 'Payments', href: '/payments', icon: 'CreditCard' },
  { name: 'Configuration', href: '/config', icon: 'Settings' },
  { name: 'Analytics', href: '/analytics', icon: 'BarChart3' },
  { name: 'Help', href: '/help', icon: 'HelpCircle' },
];



export const PAYMENT_METHODS = [
  'Card',
  'UPI',
  'Net Banking',
  'Wallet',
  'EMI'
];

export const CURRENCIES = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' }
];

export const RAZORPAY_CONFIG_INFO = `
Configure your Razorpay integration settings:

• Test Key ID: Use your Razorpay test key for development
• Test Key Secret: Your secret key for API authentication
• Server Port: Port where your backend server will run
• Webhook URL: For receiving payment notifications

For production, replace test keys with live keys from your Razorpay dashboard.
Always keep your secret keys secure and never expose them in frontend code.
`;

export const FEATURES_INFO = `
Razorpay Payment Gateway Features:

• Secure payment processing with industry-standard encryption
• Support for 100+ payment methods including cards, UPI, wallets
• Real-time payment verification and status updates
• Comprehensive dashboard for transaction management
• Automated refund and settlement processing
• Advanced analytics and reporting capabilities
• Developer-friendly APIs with extensive documentation
• 24/7 customer support and technical assistance
`;

export const SAMPLE_PRODUCTS = [
  {
    id: '1',
    name: 'Premium Plan',
    description: 'Advanced features with priority support',
    price: 999,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
    category: 'Subscription',
    features: ['Unlimited transactions', 'Priority support', 'Advanced analytics', 'Custom branding']
  },
  {
    id: '2',
    name: 'Business Suite',
    description: 'Complete business solution with all features',
    price: 2499,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    category: 'Business',
    features: ['Multi-user access', 'API integration', 'White-label solution', 'Dedicated support']
  },
  {
    id: '3',
    name: 'Enterprise Package',
    description: 'Scalable solution for large organizations',
    price: 4999,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop',
    category: 'Enterprise',
    features: ['Custom development', 'SLA guarantee', 'On-premise option', '24/7 support']
  },
  {
    id: '4',
    name: 'Starter Pack',
    description: 'Perfect for small businesses and startups',
    price: 499,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    category: 'Starter',
    features: ['Basic features', 'Email support', 'Standard integration', 'Monthly billing']
  },
  {
    id: '5',
    name: 'Developer Kit',
    description: 'Tools and resources for developers',
    price: 799,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
    category: 'Development',
    features: ['SDK access', 'Documentation', 'Testing tools', 'Community access']
  },
  {
    id: '6',
    name: 'Analytics Pro',
    description: 'Advanced analytics and reporting tools',
    price: 1299,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    category: 'Analytics',
    features: ['Real-time dashboards', 'Custom reports', 'Data export', 'Predictive analytics']
  }
];