import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, DollarSign, Building, Clock, CheckCircle, XCircle, Send } from 'lucide-react';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  posted: string;
  logo: string;
  description: string;
  status?: 'active' | 'paused' | 'closed' | 'applied' | 'accepted' | 'rejected';
  applicants?: number;
  views?: number;
  appliedDate?: string;
  invitedDate?: string;
  applicationStatus?: string;
}

interface JobCardProps {
  job: Job;
  viewType: 'client' | 'candidate';
  onAction?: (jobId: string, action: string) => void;
  applicationStatus?: string;
  appliedDate?: string;
  invitedDate?: string;
  isApplied?: boolean;
  showInviteActions?: boolean;
}

export default function JobCard({ 
  job, 
  viewType, 
  onAction,
  applicationStatus,
  appliedDate,
  invitedDate,
  isApplied,
  showInviteActions
}: JobCardProps) {
  const navigate = useNavigate();

  const getStatusBadge = () => {
    if (!applicationStatus) return null;

    switch (applicationStatus) {
      case 'applied':
        return (
          <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            Pending Review
          </div>
        );
      case 'accepted':
        return (
          <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center">
            <CheckCircle className="h-4 w-4 mr-1" />
            Accepted
          </div>
        );
      case 'rejected':
        return (
          <div className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium flex items-center">
            <XCircle className="h-4 w-4 mr-1" />
            Not Selected
          </div>
        );
      case 'pending':
        return (
          <div className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium flex items-center">
            <Send className="h-4 w-4 mr-1" />
            Invited
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <img className="h-12 w-12 rounded-lg" src={job.logo} alt={job.company} />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
            <div className="mt-1 flex items-center text-gray-600">
              <Building className="h-4 w-4 mr-1" />
              {job.company}
            </div>
          </div>
        </div>
        {viewType === 'client' ? (
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              job.status === 'active' ? 'bg-green-100 text-green-800' :
              job.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {job.status?.charAt(0).toUpperCase() + job.status?.slice(1)}
            </span>
          </div>
        ) : showInviteActions ? (
          <div className="flex space-x-2">
            <button
              onClick={() => onAction?.(job.id, 'accept')}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Accept
            </button>
            <button
              onClick={() => onAction?.(job.id, 'reject')}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Decline
            </button>
          </div>
        ) : applicationStatus ? (
          getStatusBadge()
        ) : (
          <button 
            onClick={() => onAction?.(job.id, 'apply')}
            className={`bg-primary-500 text-white py-2 px-6 rounded-md transition-colors ${
              isApplied 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-primary-600'
            }`}
            disabled={isApplied}
          >
            {isApplied ? 'Applied' : 'Quick Apply'}
          </button>
        )}
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
          <Clock className="h-5 w-5 mr-2" />
          {invitedDate ? `Invited ${invitedDate}` : 
           appliedDate ? `Applied ${appliedDate}` : 
           `Posted ${job.posted}`}
        </div>
        {viewType === 'client' && (
          <div className="flex items-center text-gray-700">
            <div className="flex space-x-4">
              <span>{job.applicants} applicants</span>
              <span>{job.views} views</span>
            </div>
          </div>
        )}
      </div>

      <p className="mt-4 text-gray-600">{job.description}</p>

      <div className="mt-6 flex space-x-4">
        {viewType === 'client' ? (
          <>
            <button 
              onClick={() => navigate(`/jobs/${job.id}`)}
              className="text-primary-600 hover:text-primary-800"
            >
              View Details
            </button>
            <button 
              onClick={() => onAction?.(job.id, 'edit')}
              className="text-primary-600 hover:text-primary-800"
            >
              Edit Listing
            </button>
            <button 
              onClick={() => onAction?.(job.id, job.status === 'active' ? 'pause' : 'activate')}
              className="text-primary-600 hover:text-primary-800"
            >
              {job.status === 'active' ? 'Pause' : 'Activate'} Listing
            </button>
            <button 
              onClick={() => onAction?.(job.id, 'delete')}
              className="text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={() => navigate(`/jobs/${job.id}`)}
              className="text-primary-600 hover:text-primary-800"
            >
              View Details
            </button>
            {!applicationStatus && !isApplied && (
              <button className="text-primary-600 hover:text-primary-800">
                Save Job
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}