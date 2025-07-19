export const APP_NAME = 'Razorpay Payment Gateway';
export const APP_VERSION = '1.0.0';

export const NAVIGATION_ITEMS = [
  { name: 'Dashboard', href: '/', icon: 'LayoutDashboard' },
  { name: 'Products', href: '/products', icon: 'ShoppingBag' },
  { name: 'Payments', href: '/payments', icon: 'CreditCard' },
  { name: 'Configuration', href: '/config', icon: 'Settings' },
  { name: 'Analytics', href: '/analytics', icon: 'BarChart3' },
  { name: 'Help', href: '/help', icon: 'HelpCircle' },
];

export const SAMPLE_PRODUCTS = [
  {
    id: '1',
    name: 'Premium Subscription',
    description: 'Access to all premium features for 1 month',
    price: 999,
    image: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Subscription'
  },
  {
    id: '2',
    name: 'Pro Plan',
    description: 'Advanced features and priority support',
    price: 1999,
    image: 'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Plan'
  },
  {
    id: '3',
    name: 'Enterprise Solution',
    description: 'Complete business solution with custom features',
    price: 4999,
    image: 'https://images.pexels.com/photos/4386366/pexels-photo-4386366.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Enterprise'
  },
  {
    id: '4',
    name: 'API Credits',
    description: '10,000 API calls for your applications',
    price: 599,
    image: 'https://images.pexels.com/photos/4386433/pexels-photo-4386433.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Credits'
  },
  {
    id: '5',
    name: 'Storage Plan',
    description: '100GB cloud storage with backup',
    price: 299,
    image: 'https://images.pexels.com/photos/4386372/pexels-photo-4386372.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Storage'
  },
  {
    id: '6',
    name: 'Analytics Dashboard',
    description: 'Advanced analytics and reporting tools',
    price: 1499,
    image: 'https://images.pexels.com/photos/4386369/pexels-photo-4386369.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Analytics'
  }
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