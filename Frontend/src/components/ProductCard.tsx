import React from 'react';
import { ShoppingCart, Star, Tag } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onPurchase: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPurchase }) => {
  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-2xl transition-all duration-300 group">
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
            <Tag className="w-3 h-3 mr-1" />
            {product.category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < 4 ? 'text-yellow-400 fill-current' : 'text-slate-300 dark:text-slate-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Product Content */}
      <div className="p-6">
        {/* Product Name and Price */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {product.name}
          </h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              ₹{product.price.toLocaleString('en-IN')}
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              {product.currency}
            </div>
          </div>
        </div>

        {/* Product Description */}
        <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Features List */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Features:
          </h4>
          <ul className="space-y-1">
            {product.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                {feature}
              </li>
            ))}
            {product.features.length > 3 && (
              <li className="text-sm text-slate-500 dark:text-slate-500 italic">
                +{product.features.length - 3} more features
              </li>
            )}
          </ul>
        </div>

        {/* Purchase Button */}
        <button
          onClick={() => onPurchase(product)}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl group-hover:scale-105"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Purchase Now</span>
        </button>
      </div>
    </div>
  );
}; 