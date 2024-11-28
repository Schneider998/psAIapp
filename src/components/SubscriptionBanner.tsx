import React from 'react';
import { Zap } from 'lucide-react';
import { useStore } from '../data/store';

export default function SubscriptionBanner() {
  const { subscription, updateSubscription } = useStore();

  if (subscription.tier === 'enterprise') return null;

  const getUpgradeInfo = () => {
    switch (subscription.tier) {
      case 'free':
        return {
          tier: 'starter',
          credits: 10,
          price: '$49'
        };
      case 'starter':
        return {
          tier: 'professional',
          credits: 50,
          price: '$199'
        };
      case 'professional':
        return {
          tier: 'enterprise',
          credits: 'unlimited',
          price: '$499'
        };
      default:
        return null;
    }
  };

  const upgradeInfo = getUpgradeInfo();
  if (!upgradeInfo) return null;

  return (
    <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Zap className="h-6 w-6" />
        <div>
          <p className="font-medium">
            Upgrade to {upgradeInfo.tier.charAt(0).toUpperCase() + upgradeInfo.tier.slice(1)} for {upgradeInfo.credits} invites
          </p>
          <p className="text-sm opacity-90">
            {subscription.credits} invites remaining on your current plan
          </p>
        </div>
      </div>
      <button
        onClick={() => updateSubscription(upgradeInfo.tier as any)}
        className="bg-white text-primary-600 px-4 py-2 rounded-md font-medium hover:bg-primary-50 transition-colors"
      >
        Upgrade {upgradeInfo.price}/mo
      </button>
    </div>
  );
}