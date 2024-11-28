import React, { useState } from 'react';
import JobCard, { Job } from './JobCard';
import JobPostingForm from './JobPostingForm';
import { Plus, Search } from 'lucide-react';
import { useStore } from '../../data/store';

export default function ClientJobListings() {
  const { jobs, clients, currentUserId, addJob } = useStore();
  const [filter, setFilter] = useState('all');
  const [showPostingForm, setShowPostingForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Get current client's jobs
  const clientJobs = Object.values(jobs).filter(job => job.clientId === currentUserId);

  const handleAction = (jobId: string, action: string) => {
    switch (action) {
      case 'pause':
        // TODO: Implement pause functionality
        break;
      case 'activate':
        // TODO: Implement activate functionality
        break;
      case 'delete':
        if (window.confirm('Are you sure you want to delete this job listing?')) {
          // TODO: Implement delete functionality
        }
        break;
      case 'edit':
        const jobToEdit = jobs[jobId];
        if (jobToEdit) {
          setEditingJob(jobToEdit);
          setShowPostingForm(true);
        }
        break;
    }
  };

  const handlePostJob = (formData: any) => {
    if (editingJob) {
      // TODO: Implement edit functionality
    } else {
      // Create new job
      const jobId = addJob({
        title: formData.title,
        location: formData.location,
        type: formData.type,
        salary: {
          min: parseInt(formData.salaryMin),
          max: parseInt(formData.salaryMax),
          commission: formData.commission || undefined
        },
        description: formData.description,
        requirements: [],
        responsibilities: [],
        benefits: [],
        clientId: currentUserId
      });
    }
    setShowPostingForm(false);
    setEditingJob(null);
  };

  const filteredJobs = clientJobs
    .filter(job => filter === 'all' || job.status === filter)
    .filter(job => 
      searchTerm === '' || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Job Listings</h1>
        <button 
          onClick={() => setShowPostingForm(true)}
          className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Post New Job
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'all' 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All ({clientJobs.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'active'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Active ({clientJobs.filter(j => j.status === 'active').length})
          </button>
          <button
            onClick={() => setFilter('paused')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'paused'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Paused ({clientJobs.filter(j => j.status === 'paused').length})
          </button>
        </div>

        <div className="relative">
          <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search listings..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      <div className="space-y-6">
        {filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            job={{
              ...job,
              company: clients[job.clientId].name,
              logo: clients[job.clientId].logo,
              salary: `$${job.salary.min.toLocaleString()} - $${job.salary.max.toLocaleString()}${job.salary.commission ? ` + ${job.salary.commission}` : ''}`
            }}
            viewType="client"
            onAction={handleAction}
          />
        ))}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No job listings found</p>
          </div>
        )}
      </div>

      {showPostingForm && (
        <JobPostingForm
          onSubmit={handlePostJob}
          onClose={() => {
            setShowPostingForm(false);
            setEditingJob(null);
          }}
          initialData={editingJob || undefined}
        />
      )}
    </div>
  );
}