import React from 'react';
import { CreditCard } from 'lucide-react';
import { useStore } from '../data/store';

export default function CreditsDisplay() {
  const { subscription } = useStore();
  
  if (subscription.tier === 'enterprise') {
    return (
      <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-md text-primary-600">
        <CreditCard className="h-5 w-5" />
        <span className="font-medium">Unlimited Invites</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-md">
      <CreditCard className="h-5 w-5 text-primary-600" />
      <span className="font-medium">
        {subscription.credits} / {subscription.maxCredits} Invites Remaining
      </span>
    </div>
  );
}