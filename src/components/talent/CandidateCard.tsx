import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, DollarSign, TrendingUp, Send } from 'lucide-react';
import JobSelectModal from '../modals/JobSelectModal';
import { useStore } from '../../data/store';

interface CandidateCardProps {
  id: string;
  name: string;
  image: string;
  score: string | number;
  revenueSold: string;
  avgDealSize: string;
  available: boolean;
  verified: boolean;
  status?: string;
}

export default function CandidateCard({
  id,
  name,
  image,
  score,
  revenueSold,
  avgDealSize,
  available,
  verified,
  status
}: CandidateCardProps) {
  const navigate = useNavigate();
  const [showJobSelect, setShowJobSelect] = useState(false);
  const { inviteCandidate } = useStore();

  const handleInvite = (jobId: string) => {
    const result = inviteCandidate(id, jobId);
    if (result.success) {
      setShowJobSelect(false);
    } else {
      alert(result.message);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover"
          />
          {verified && (
            <div className="absolute top-3 left-3 bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full flex items-center">
              <span className="mr-1">✓</span> VERIFIED
            </div>
          )}
          {available && (
            <div className="absolute top-3 right-3 bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full flex items-center">
              <span className="mr-1">●</span> Available
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{name}</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 flex items-center">
                <Star className="h-4 w-4 text-primary-500 mr-2" />
                Score
              </span>
              <span className="font-semibold text-gray-900">{score}%</span>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 flex items-center">
                <DollarSign className="h-4 w-4 text-primary-500 mr-2" />
                Revenue Sold
              </span>
              <span className="font-semibold text-gray-900">{revenueSold}</span>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 flex items-center">
                <TrendingUp className="h-4 w-4 text-primary-500 mr-2" />
                Avg. Deal Size
              </span>
              <span className="font-semibold text-gray-900">{avgDealSize}</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2">
            <button className="text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors px-3 py-2 rounded-lg text-sm font-medium">
              Watch Interview
            </button>
            <button className="text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors px-3 py-2 rounded-lg text-sm font-medium">
              Hear Sales Calls
            </button>
          </div>
          
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button
              onClick={() => navigate(`/profile/${id}`)}
              className="w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition-colors font-medium"
            >
              View Profile
            </button>
            {status !== 'invited' && status !== 'pending' && (
              <button
                onClick={() => setShowJobSelect(true)}
                className="w-full bg-primary-100 text-primary-600 py-2 rounded-lg hover:bg-primary-200 transition-colors font-medium flex items-center justify-center"
              >
                <Send className="h-4 w-4 mr-2" />
                Invite
              </button>
            )}
          </div>
        </div>
      </div>

      <JobSelectModal
        isOpen={showJobSelect}
        onClose={() => setShowJobSelect(false)}
        onSelect={handleInvite}
      />
    </>
  );
}