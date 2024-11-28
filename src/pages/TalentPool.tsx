import React from 'react';
import CandidateCard from '../components/talent/CandidateCard';
import CreditsDisplay from '../components/CreditsDisplay';
import SubscriptionBanner from '../components/SubscriptionBanner';
import { useStore } from '../data/store';

export default function TalentPool() {
  const { candidates, inviteCandidate } = useStore();

  const handleInvite = (candidateId: string, jobId: string) => {
    const result = inviteCandidate(candidateId);
    if (!result.success) {
      alert(result.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 text-transparent bg-clip-text">
          Sales Talent Pool
        </h1>
        <CreditsDisplay />
      </div>

      <SubscriptionBanner />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {candidates.map((candidate) => (
          <CandidateCard 
            key={candidate.id} 
            {...candidate} 
            onInvite={handleInvite}
          />
        ))}
      </div>
    </div>
  );
}