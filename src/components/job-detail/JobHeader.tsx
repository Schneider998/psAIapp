import React from 'react';
import { Building, Eye, Users } from 'lucide-react';

interface JobHeaderProps {
  job: {
    title: string;
    company: string;
    logo: string;
    views: number;
    applicants: number;
  };
}

export default function JobHeader({ job }: JobHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img src={job.logo} alt={job.company} className="w-16 h-16 rounded-lg" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
          <div className="flex items-center text-gray-600 mt-1">
            <Building className="h-4 w-4 mr-1" />
            {job.company}
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4 text-sm">
        <div className="flex items-center text-gray-600">
          <Eye className="h-4 w-4 mr-1" />
          {job.views} views
        </div>
        <div className="flex items-center text-gray-600">
          <Users className="h-4 w-4 mr-1" />
          {job.applicants} applicants
        </div>
      </div>
    </div>
  );
}