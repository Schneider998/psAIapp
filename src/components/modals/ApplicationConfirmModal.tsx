import React from 'react';
import { X, AlertCircle } from 'lucide-react';

interface ApplicationConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  jobTitle: string;
  companyName: string;
}

export default function ApplicationConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  jobTitle,
  companyName
}: ApplicationConfirmModalProps) {
  if (!isOpen) return null;

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
            <div className="flex items-center mb-4">
              <AlertCircle className="h-6 w-6 text-primary-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Confirm Application</h3>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                You're about to apply for <span className="font-medium">{jobTitle}</span> at <span className="font-medium">{companyName}</span>.
              </p>
              <div className="bg-primary-50 p-4 rounded-lg">
                <p className="text-sm text-primary-700">
                  If your application is accepted, your card will be charged $50 for the interview slot. This ensures high-quality, committed candidates and interviews.
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
              >
                Confirm Application
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}