import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Building, MapPin, DollarSign, Star, CreditCard } from 'lucide-react';
import { useStore } from '../data/store';

export default function InterviewRequests() {
  const navigate = useNavigate();
  const { candidates, currentUserId } = useStore();
  const currentCandidate = candidates.find(c => c.id === currentUserId);

  const invitedJobs = [
    {
      id: '1',
      title: 'Senior Sales Executive',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      salary: '$120,000 - $180,000',
      logo: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80',
      matchScore: 95,
      invitedDate: '2 days ago',
      interviewDate: 'Flexible',
      interviewType: 'Video Call',
      status: 'pending',
      initiatedBy: 'client'
    },
    {
      id: '2',
      title: 'Enterprise Account Executive',
      company: 'Growth Solutions',
      location: 'Remote',
      salary: '$100,000 - $150,000',
      logo: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80',
      matchScore: 92,
      invitedDate: '1 day ago',
      interviewDate: 'Next Week',
      interviewType: 'Video Call',
      status: 'pending',
      initiatedBy: 'candidate'
    }
  ];

  const PaymentBadge = ({ initiatedBy }: { initiatedBy: 'client' | 'candidate' }) => {
    if (initiatedBy === 'client') {
      return (
        <div className="flex items-center bg-green-50 px-3 py-1 rounded-full">
          <CreditCard className="h-4 w-4 text-green-500 mr-1" />
          <span className="text-sm font-medium text-green-700">Free Interview</span>
        </div>
      );
    }
    return (
      <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
        <CreditCard className="h-4 w-4 text-blue-500 mr-1" />
        <span className="text-sm font-medium text-blue-700">$50 Interview</span>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 text-transparent bg-clip-text">
          Interview Requests
        </h1>
      </div>

      <div className="space-y-6">
        {invitedJobs.map((job) => (
          <div key={job.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="h-16 w-16 rounded-lg"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
                    <div className="flex items-center text-gray-600 mt-1">
                      <Building className="h-4 w-4 mr-1" />
                      {job.company}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <PaymentBadge initiatedBy={job.initiatedBy} />
                  <div className="flex items-center bg-primary-50 px-3 py-1 rounded-full">
                    <Star className="h-4 w-4 text-primary-500 mr-1" />
                    <span className="text-sm font-medium text-primary-700">
                      {job.matchScore}% Match
                    </span>
                  </div>
                  <button
                    onClick={() => navigate(`/jobs/${job.id}`)}
                    className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
                  >
                    View Offer
                  </button>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center text-gray-700">
                  <MapPin className="h-5 w-5 mr-2" />
                  {job.location}
                </div>
                <div className="flex items-center text-gray-700">
                  <DollarSign className="h-5 w-5 mr-2" />
                  {job.salary}
                </div>
                <div className="flex items-center text-gray-700">
                  <Calendar className="h-5 w-5 mr-2" />
                  {job.interviewDate}
                </div>
                <div className="flex items-center text-gray-700">
                  <Clock className="h-5 w-5 mr-2" />
                  Invited {job.invitedDate}
                </div>
              </div>
            </div>
          </div>
        ))}

        {invitedJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Interview Requests Yet
              </h3>
              <p className="text-gray-600">
                When companies invite you to interview, they'll appear here.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}