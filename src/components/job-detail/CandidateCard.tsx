import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, ExternalLink, Clock } from 'lucide-react';
import { Candidate } from '../../data/store';

interface CandidateCardProps {
  candidate: Candidate;
  onAction?: (id: string, action: 'accept' | 'reject') => void;
  showActions?: boolean;
  jobId?: string;
}

export default function CandidateCard({ candidate, onAction, showActions = true, jobId }: CandidateCardProps) {
  const navigate = useNavigate();

  const getStatusBadge = () => {
    switch (candidate.status) {
      case 'accepted':
        return (
          <div className="flex flex-col items-end">
            <span className="flex items-center text-green-600 text-sm">
              <CheckCircle className="h-4 w-4 mr-1" />
              Accepted
            </span>
            <span className="text-xs text-gray-500">
              {candidate.actionBy === 'client' ? 'by You' : 'by Candidate'}
            </span>
          </div>
        );
      case 'rejected':
        return (
          <div className="flex flex-col items-end">
            <span className="flex items-center text-red-600 text-sm">
              <XCircle className="h-4 w-4 mr-1" />
              Rejected
            </span>
            <span className="text-xs text-gray-500">
              {candidate.actionBy === 'client' ? 'by You' : 'by Candidate'}
            </span>
          </div>
        );
      case 'pending':
        return (
          <span className="flex items-center text-blue-600 text-sm">
            <Clock className="h-4 w-4 mr-1" />
            Pending Response
          </span>
        );
      default:
        return null;
    }
  };

  const handleCardClick = () => {
    navigate(`/profile/${candidate.id}${jobId ? `?jobId=${jobId}` : ''}`);
  };

  return (
    <div 
      className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={candidate.image}
            alt={candidate.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="font-medium text-gray-900">{candidate.name}</h3>
            <p className="text-sm text-gray-600">{candidate.currentRole}</p>
            {candidate.appliedDate && (
              <p className="text-sm text-gray-500 mt-1">{candidate.appliedDate}</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-primary-50 text-primary-700 px-2 py-1 rounded-full text-sm">
            {candidate.score}% Match
          </div>
          {getStatusBadge()}
          <ExternalLink className="h-5 w-5 text-primary-600 hover:text-primary-700" />
        </div>
      </div>

      {showActions && onAction && candidate.status === 'applied' && (
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAction(candidate.id, 'accept');
            }}
            className="flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Accept
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAction(candidate.id, 'reject');
            }}
            className="flex items-center px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100"
          >
            <XCircle className="h-4 w-4 mr-2" />
            Reject
          </button>
        </div>
      )}
    </div>
  );
}