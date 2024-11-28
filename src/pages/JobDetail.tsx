import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, DollarSign, Building, Clock, CheckCircle, Briefcase } from 'lucide-react';
import JobHeader from '../components/job-detail/JobHeader';
import InterviewBanner from '../components/job-detail/InterviewBanner';
import RejectionModal from '../components/modals/RejectionModal';
import { useStore } from '../data/store';

const mockSchedulingLinks = {
  'salesforce-ae': 'https://calendly.com/salesforce-recruiting/interview',
  'stripe-ae': 'https://calendly.com/stripe-recruiting/interview',
  'hubspot-ae': 'https://calendly.com/hubspot-recruiting/interview'
};

export default function JobDetail() {
  const { id } = useParams();
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const { candidates, currentUserId, updateCandidateStatus, getJobById, getClientById } = useStore();
  const currentCandidate = candidates.find(c => c.id === currentUserId);
  
  const job = id ? getJobById(id) : null;
  const client = job ? getClientById(job.clientId) : null;

  if (!job || !client) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Not Found</h2>
          <p className="text-gray-600">This job listing may have been removed or is no longer available.</p>
        </div>
      </div>
    );
  }

  const handleAcceptInvite = () => {
    if (id) {
      updateCandidateStatus(currentUserId, 'accepted');
    }
  };

  const handleDeclineInvite = () => {
    setShowRejectionModal(true);
  };

  const handleRejectionSubmit = (reason: string) => {
    if (id) {
      updateCandidateStatus(currentUserId, 'rejected');
      setShowRejectionModal(false);
    }
  };

  const getInterviewStatus = () => {
    if (!currentCandidate) return null;
    
    if (currentCandidate.status === 'pending') {
      return 'invite';
    }
    
    if (currentCandidate.status === 'accepted' && 
        currentCandidate.actionBy === 'client') {
      return 'accepted';
    }

    return null;
  };

  const interviewStatus = getInterviewStatus();
  const formattedSalary = `$${job.salary.min.toLocaleString()} - $${job.salary.max.toLocaleString()}`;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {interviewStatus && (
        <InterviewBanner
          type={interviewStatus}
          schedulingLink={interviewStatus === 'accepted' ? mockSchedulingLinks[job.id] : undefined}
          onAccept={handleAcceptInvite}
          onDecline={handleDeclineInvite}
        />
      )}

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <JobHeader job={{
            ...job,
            company: client.name,
            logo: client.logo
          }} />
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="flex items-center text-gray-700">
              <MapPin className="h-5 w-5 mr-2" />
              {job.location}
            </div>
            <div className="flex items-center text-gray-700">
              <DollarSign className="h-5 w-5 mr-2" />
              {formattedSalary}
            </div>
            <div className="flex items-center text-gray-700">
              <Briefcase className="h-5 w-5 mr-2" />
              {job.type}
            </div>
            <div className="flex items-center text-gray-700">
              <Clock className="h-5 w-5 mr-2" />
              Posted {job.posted}
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About {client.name}</h2>
            <p className="text-gray-600 mb-8">{client.description}</p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
            <p className="text-gray-600 mb-6">{job.description}</p>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
            <ul className="list-disc pl-5 mb-6 text-gray-600">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Responsibilities</h3>
            <ul className="list-disc pl-5 mb-6 text-gray-600">
              {job.responsibilities.map((resp, index) => (
                <li key={index}>{resp}</li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Benefits</h3>
            <ul className="list-disc pl-5 mb-6 text-gray-600">
              {job.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>

            {job.salary.commission && (
              <div className="bg-green-50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Commission Structure</h3>
                <p className="text-green-700">{job.salary.commission}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <RejectionModal
        isOpen={showRejectionModal}
        onClose={() => setShowRejectionModal(false)}
        onSubmit={handleRejectionSubmit}
        jobTitle={job.title}
      />
    </div>
  );
}