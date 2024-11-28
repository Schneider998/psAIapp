import React from 'react';
import ClientJobListings from '../components/jobs/ClientJobListings';
import CandidateJobListings from '../components/jobs/CandidateJobListings';
import { useStore } from '../data/store';

export default function Jobs() {
  const { userRole } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {userRole === 'client' ? <ClientJobListings /> : <CandidateJobListings />}
    </div>
  );
}