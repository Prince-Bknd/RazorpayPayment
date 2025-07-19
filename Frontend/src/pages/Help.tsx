import React from 'react';
import { HelpCircle, Book, MessageCircle, Mail, Phone, ExternalLink } from 'lucide-react';
import { FEATURES_INFO } from '../utils/constants';

export const Help: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Help & Support
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Get help with Razorpay integration and payment processing
        </p>
      </div>

      {/* Quick Help Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <Book className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              Documentation
            </h3>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Comprehensive guides and API documentation for Razorpay integration
          </p>
          <button className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 transition-colors duration-200">
            <span>View Docs</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              Live Chat
            </h3>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Get instant help from our support team via live chat
          </p>
          <button className="flex items-center space-x-2 text-green-500 hover:text-green-600 transition-colors duration-200">
            <span>Start Chat</span>
            <MessageCircle className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              Email Support
            </h3>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Send us an email and we'll get back to you within 24 hours
          </p>
          <button className="flex items-center space-x-2 text-purple-500 hover:text-purple-600 transition-colors duration-200">
            <span>Send Email</span>
            <Mail className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Features Overview */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-2xl p-6">
        <div className="flex items-start space-x-3">
          <HelpCircle className="w-6 h-6 text-blue-500 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Razorpay Payment Gateway Features
            </h3>
            <div className="text-sm text-blue-700 dark:text-blue-300 whitespace-pre-line">
              {FEATURES_INFO}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6">
          Frequently Asked Questions
        </h3>
        <div className="space-y-4">
          {[
            {
              question: "How do I get my Razorpay API keys?",
              answer: "Log in to your Razorpay Dashboard, go to Settings > API Keys, and generate your Key ID and Key Secret. Use test keys for development and live keys for production."
            },
            {
              question: "What payment methods are supported?",
              answer: "Razorpay supports 100+ payment methods including Credit/Debit Cards, UPI, Net Banking, Wallets, EMI, and Buy Now Pay Later options."
            },
            {
              question: "How do I handle payment failures?",
              answer: "Payment failures are handled automatically by Razorpay. You can configure webhooks to receive real-time notifications about payment status changes."
            },
            {
              question: "Is it safe to store API keys in the frontend?",
              answer: "Never store your Key Secret in frontend code. Only use the Key ID in frontend. The Key Secret should only be used in your backend server."
            },
            {
              question: "How do I test payments?",
              answer: "Use test API keys and test card numbers provided by Razorpay. Test payments won't charge real money and help you verify your integration."
            }
          ].map((faq, index) => (
            <div key={index} className="border-b border-slate-200 dark:border-slate-600 pb-4 last:border-b-0">
              <h4 className="font-medium text-slate-800 dark:text-slate-100 mb-2">
                {faq.question}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6">
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-blue-500" />
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-100">Phone Support</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">+91 80-6196-1111</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-green-500" />
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-100">Email Support</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">support@razorpay.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};