import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Video, Phone } from 'lucide-react';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileStats from '../components/profile/ProfileStats';
import SalesTraining from '../components/profile/SalesTraining';
import SalesCoaches from '../components/profile/SalesCoaches';
import LookingFor from '../components/profile/LookingFor';
import MediaSection from '../components/profile/MediaSection';
import ExperienceSection from '../components/profile/ExperienceSection';
import { useStore } from '../data/store';

const mockExperience = [
  {
    company: "TechCorp",
    position: "Senior Sales Executive",
    duration: "2020 - Present",
    description: "Led enterprise sales team, consistently exceeding quarterly targets by 30%. Developed and implemented new sales strategies resulting in $2.5M additional revenue."
  },
  {
    company: "Growth Solutions",
    position: "Sales Manager",
    duration: "2018 - 2020",
    description: "Managed team of 5 sales representatives, achieving 125% of team quota. Implemented new CRM processes improving lead conversion by 40%."
  }
];

export default function Profile() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get('jobId');
  const [activeTab, setActiveTab] = useState('overview');
  
  const { getCandidateById, updateCandidateStatus, userRole } = useStore();
  const candidate = getCandidateById(id || '');
  const isOwnProfile = userRole === 'candidate' && id === useStore.getState().currentUserId;

  const handleCandidateAction = (action: 'accept' | 'reject') => {
    if (id) {
      updateCandidateStatus(id, action === 'accept' ? 'accepted' : 'rejected');
    }
  };

  if (!candidate) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Not Found</h2>
          <p className="text-gray-600">The profile you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Job Application Status Banner */}
      {jobId && candidate.status === 'applied' && userRole === 'client' && (
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Applied for Senior Sales Representative
            </h2>
            <p className="text-gray-600">{candidate.appliedDate}</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => handleCandidateAction('accept')}
              className="flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100"
            >
              Accept Candidate
            </button>
            <button
              onClick={() => handleCandidateAction('reject')}
              className="flex items-center px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100"
            >
              Reject Candidate
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-8">
        {/* Left Column */}
        <div className="w-1/3">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <ProfileHeader
              name={candidate.name}
              image={candidate.image}
              score={candidate.score}
              location={candidate.location}
              intro={candidate.intro}
              candidateId={candidate.id}
              showInvite={userRole === 'client' && !isOwnProfile}
            />
            <ProfileStats
              stats={{
                revenueSold: candidate.revenueSold,
                closeRate: candidate.closeRate,
                avgDealSize: candidate.avgDealSize
              }}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1">
          {/* Tabs Navigation */}
          <div className="bg-white rounded-xl shadow-lg mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-6 py-4 text-sm font-medium border-b-2 ${
                    activeTab === 'overview'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('interview')}
                  className={`px-6 py-4 text-sm font-medium border-b-2 ${
                    activeTab === 'interview'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Video className="w-4 h-4 inline mr-2" />
                  Interview
                </button>
                <button
                  onClick={() => setActiveTab('calls')}
                  className={`px-6 py-4 text-sm font-medium border-b-2 ${
                    activeTab === 'calls'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Phone className="w-4 h-4 inline mr-2" />
                  Sales Calls
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'overview' ? (
                <div className="space-y-6">
                  {/* Video Introduction */}
                  <div className="aspect-video bg-gray-900 rounded-lg relative group cursor-pointer mb-6">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center">
                        <Video className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <img
                      src={candidate.interviews[0]?.thumbnail}
                      alt="Video introduction"
                      className="w-full h-full object-cover rounded-lg opacity-50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <SalesTraining trainings={candidate.salesTraining} />
                    <SalesCoaches coaches={candidate.salesCoaches} />
                  </div>
                  <LookingFor items={candidate.lookingFor} />
                  <ExperienceSection experiences={mockExperience} />
                </div>
              ) : (
                <MediaSection
                  type={activeTab as 'interview' | 'calls'}
                  interviews={candidate.interviews}
                  salesCalls={candidate.salesCalls}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}