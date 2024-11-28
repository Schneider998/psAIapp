import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';

interface RejectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
  jobTitle: string;
}

export default function RejectionModal({
  isOpen,
  onClose,
  onSubmit,
  jobTitle
}: RejectionModalProps) {
  const [reason, setReason] = useState('');
  const reasons = [
    'Compensation not competitive',
    'Location/remote work policy',
    'Role responsibilities not aligned',
    'Company culture not a fit',
    'Accepted another offer',
    'Other'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="fixed inset-0 bg-black opacity-30" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
          <div className="absolute right-4 top-4">
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="flex items-center mb-4">
              <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Decline Interview</h3>
            </div>
            
            <p className="text-gray-600 mb-4">
              Please let us know why you're declining the interview for <span className="font-medium">{jobTitle}</span>. This feedback helps companies improve their offerings.
            </p>

            <div className="space-y-3">
              {reasons.map((r) => (
                <label key={r} className="flex items-center">
                  <input
                    type="radio"
                    name="reason"
                    value={r}
                    checked={reason === r}
                    onChange={(e) => setReason(e.target.value)}
                    className="h-4 w-4 text-primary-500 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-gray-700">{r}</span>
                </label>
              ))}
            </div>

            {reason === 'Other' && (
              <textarea
                placeholder="Please specify your reason..."
                className="mt-3 w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                rows={3}
                onChange={(e) => setReason(e.target.value)}
              />
            )}

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => onSubmit(reason)}
                disabled={!reason}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit & Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}