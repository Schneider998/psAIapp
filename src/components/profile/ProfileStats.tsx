import React from 'react';

interface ProfileStatsProps {
  stats: {
    revenueSold: string;
    closeRate: string;
    avgDealSize: string;
  };
}

export default function ProfileStats({ stats }: ProfileStatsProps) {
  return (
    <div className="border-t border-gray-200 pt-6 mt-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="text-center">
          <div className="text-gray-600 mb-1">Revenue Sold</div>
          <div className="text-2xl font-bold text-gray-900">{stats.revenueSold}</div>
        </div>
        <div className="text-center">
          <div className="text-gray-600 mb-1">Close Rate</div>
          <div className="text-2xl font-bold text-gray-900">{stats.closeRate}</div>
        </div>
        <div className="text-center">
          <div className="text-gray-600 mb-1">Avg Deal Size</div>
          <div className="text-2xl font-bold text-gray-900">{stats.avgDealSize}</div>
        </div>
      </div>
    </div>
  );
}