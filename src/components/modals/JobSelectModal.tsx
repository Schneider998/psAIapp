import React from 'react';
import { X, Briefcase } from 'lucide-react';
import { useStore } from '../../data/store';

interface JobSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (jobId: string) => void;
}

export default function JobSelectModal({ isOpen, onClose, onSelect }: JobSelectModalProps) {
  const { jobs, clients, currentUserId } = useStore();
  
  if (!isOpen) return null;

  // Filter active jobs for current client
  const clientJobs = Object.values(jobs).filter(job => 
    job && 
    job.clientId === currentUserId && 
    job.status === 'active'
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="fixed inset-0 bg-black opacity-30" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
          <div className="absolute right-4 top-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="flex items-center mb-6">
              <Briefcase className="h-6 w-6 text-primary-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Select Job Position</h3>
            </div>

            {clientJobs.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-gray-600">No active job listings found.</p>
                <button
                  onClick={onClose}
                  className="mt-4 text-primary-600 hover:text-primary-700"
                >
                  Post a New Job
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {clientJobs.map((job) => (
                  <button
                    key={job.id}
                    onClick={() => onSelect(job.id)}
                    className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-colors"
                  >
                    <h4 className="font-medium text-gray-900">{job.title}</h4>
                    <div className="mt-1 text-sm text-gray-600">
                      {job.location} • ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
                      {job.salary.commission && ` + ${job.salary.commission}`}
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      {job.applicants} applicants • {job.views} views
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}