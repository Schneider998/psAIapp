import React, { useState } from 'react';
import { Search } from 'lucide-react';
import CandidateCard from '../components/job-detail/CandidateCard';
import { useStore } from '../data/store';

export default function Applicants() {
  const { candidates } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  const pendingApplicants = candidates.filter(c => c.status === 'applied');
  const processedApplicants = candidates.filter(c => ['accepted', 'rejected'].includes(c.status || ''));

  const filteredPendingApplicants = pendingApplicants.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.currentRole.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProcessedApplicants = processedApplicants.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.currentRole.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 text-transparent bg-clip-text">
          Applicants
        </h1>
        <div className="relative">
          <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search applicants..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      {/* Pending Review Section */}
      {filteredPendingApplicants.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              New Applications ({filteredPendingApplicants.length})
            </h2>
          </div>
          <div className="space-y-4">
            {filteredPendingApplicants.map(candidate => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                showActions={false}
              />
            ))}
          </div>
        </div>
      )}

      {/* Processed Applications Section */}
      {filteredProcessedApplicants.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Processed Applications ({filteredProcessedApplicants.length})
          </h2>
          <div className="space-y-4">
            {filteredProcessedApplicants.map(candidate => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                showActions={false}
              />
            ))}
          </div>
        </div>
      )}

      {filteredPendingApplicants.length === 0 && filteredProcessedApplicants.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No applicants found matching your search.
        </div>
      )}
    </div>
  );
}