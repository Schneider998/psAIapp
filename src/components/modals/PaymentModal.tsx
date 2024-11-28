import React, { useState } from 'react';
import { X, CreditCard, Lock } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { useStore } from '../../data/store';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  jobTitle: string;
}

export default function PaymentModal({ isOpen, onClose, onSuccess, jobTitle }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { addPaymentMethod, currentUserId } = useStore();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulating payment processing
    setTimeout(() => {
      addPaymentMethod(currentUserId);
      setIsProcessing(false);
      onSuccess();
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="fixed inset-0 bg-black opacity-30" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
          <div className="absolute right-4 top-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="flex items-center mb-6">
              <CreditCard className="h-6 w-6 text-primary-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Add Payment Method</h3>
            </div>

            <div className="mb-6">
              <p className="text-gray-600">
                You'll only be charged $50 if your application for <span className="font-medium">{jobTitle}</span> is accepted by the employer.
              </p>
              <div className="mt-4 bg-primary-50 p-4 rounded-lg">
                <div className="flex items-center text-primary-700">
                  <Lock className="h-5 w-5 mr-2" />
                  <p className="text-sm">Your card will not be charged until your application is accepted</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiry"
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">
                    CVC
                  </label>
                  <input
                    type="text"
                    id="cvc"
                    placeholder="123"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
                  isProcessing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-primary-500 hover:bg-primary-600'
                }`}
              >
                {isProcessing ? 'Processing...' : 'Add Payment Method'}
              </button>
            </form>

            <p className="mt-4 text-sm text-gray-500 text-center">
              Your payment information is securely processed and stored
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}