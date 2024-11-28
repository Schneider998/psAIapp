import React, { useState } from 'react';
import { Star, MapPin } from 'lucide-react';
import { useStore } from '../../data/store';
import JobSelectModal from '../modals/JobSelectModal';

interface ProfileHeaderProps {
  name: string;
  image: string;
  score: number;
  location: string;
  intro: string;
  candidateId: string;
  showInvite?: boolean;
}

export default function ProfileHeader({ 
  name, 
  image, 
  score, 
  location, 
  intro, 
  candidateId,
  showInvite = false
}: ProfileHeaderProps) {
  const [showJobSelect, setShowJobSelect] = useState(false);
  const { inviteCandidate } = useStore();

  const handleInvite = (jobId: string) => {
    const result = inviteCandidate(candidateId, jobId);
    if (result.success) {
      setShowJobSelect(false);
    } else {
      alert(result.message);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center text-center">
        <img
          src={image}
          alt={name}
          className="w-32 h-32 rounded-full object-cover mb-4"
        />
        <div className="flex items-center mb-1">
          <h1 className="text-2xl font-bold text-gray-900 mr-2">{name}</h1>
          <div className="flex items-center bg-primary-50 px-2 py-1 rounded-full">
            <Star className="h-4 w-4 text-primary-500 mr-1" />
            <span className="text-sm font-semibold text-primary-700">{score}%</span>
          </div>
        </div>
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{location}</span>
        </div>
        <p className="text-gray-600 mb-6">{intro}</p>
        {showInvite && (
          <button 
            onClick={() => setShowJobSelect(true)}
            className="w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition-colors mb-4"
          >
            Send Invite
          </button>
        )}
      </div>

      <JobSelectModal
        isOpen={showJobSelect}
        onClose={() => setShowJobSelect(false)}
        onSelect={handleInvite}
      />
    </>
  );
}