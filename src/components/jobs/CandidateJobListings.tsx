import React, { useState } from 'react';
import JobCard, { Job } from './JobCard';
import { Search, Filter } from 'lucide-react';
import PaymentModal from '../modals/PaymentModal';
import ApplicationConfirmModal from '../modals/ApplicationConfirmModal';
import { useStore } from '../../data/store';

export default function CandidateJobListings() {
  const [activeTab, setActiveTab] = useState<'browse' | 'applied'>('browse');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { applyToJob, candidates, currentUserId, addPaymentMethod, jobs, clients } = useStore();

  const currentCandidate = candidates.find(c => c.id === currentUserId);
  
  const allJobs = Object.values(jobs).map(job => ({
    ...job,
    company: clients[job.clientId].name,
    logo: clients[job.clientId].logo,
    salary: `$${job.salary.min.toLocaleString()} - $${job.salary.max.toLocaleString()}${job.salary.commission ? ` + ${job.salary.commission}` : ''}`
  }));

  const appliedJobs = allJobs.filter(job => 
    currentCandidate?.appliedJobs?.includes(job.id)
  ).map(job => ({
    ...job,
    applicationStatus: currentCandidate?.status,
    appliedDate: currentCandidate?.appliedDate
  }));

  const filteredJobs = (activeTab === 'browse' ? allJobs : appliedJobs).filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApply = (jobId: string) => {
    const job = allJobs.find(j => j.id === jobId);
    if (!job) return;

    if (currentCandidate?.appliedJobs?.includes(jobId)) {
      alert('You have already applied to this job');
      return;
    }

    setSelectedJob(job);

    if (!currentCandidate?.hasPaymentMethod) {
      setShowPaymentModal(true);
    } else {
      setShowConfirmModal(true);
    }
  };

  const handlePaymentSuccess = () => {
    if (currentUserId) {
      addPaymentMethod(currentUserId);
      setShowPaymentModal(false);
      
      if (selectedJob) {
        const result = applyToJob(selectedJob.id);
        if (result.success) {
          setActiveTab('applied');
          setSelectedJob(null);
        } else {
          alert(result.message);
        }
      }
    }
  };

  const handleConfirmApplication = () => {
    if (selectedJob) {
      const result = applyToJob(selectedJob.id);
      if (result.success) {
        setActiveTab('applied');
        setShowConfirmModal(false);
        setSelectedJob(null);
      } else {
        if (result.requiresPayment) {
          setShowPaymentModal(true);
        } else {
          alert(result.message);
        }
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Sales Opportunities</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search jobs..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>
      </div>

      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('browse')}
            className={`pb-4 px-2 relative ${
              activeTab === 'browse'
                ? 'text-primary-600 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Browse Jobs
            {activeTab === 'browse' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('applied')}
            className={`pb-4 px-2 relative ${
              activeTab === 'applied'
                ? 'text-primary-600 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Applied Jobs
            {activeTab === 'applied' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500" />
            )}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            viewType="candidate"
            onAction={handleApply}
            applicationStatus={job.applicationStatus}
            appliedDate={job.appliedDate}
            isApplied={currentCandidate?.appliedJobs?.includes(job.id)}
          />
        ))}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            {activeTab === 'applied'
              ? "You haven't applied to any jobs yet"
              : "No jobs found matching your criteria"}
          </div>
        )}
      </div>

      {showPaymentModal && selectedJob && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
          jobTitle={selectedJob.title}
        />
      )}

      {showConfirmModal && selectedJob && (
        <ApplicationConfirmModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleConfirmApplication}
          jobTitle={selectedJob.title}
          companyName={selectedJob.company}
        />
      )}
    </div>
  );
}