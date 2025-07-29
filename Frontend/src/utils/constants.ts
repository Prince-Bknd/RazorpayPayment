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