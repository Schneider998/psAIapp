import React from 'react';
import { Building, Calendar } from 'lucide-react';

interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
}

interface ExperienceSectionProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <h2 className="text-lg font-semibold mb-6">Work Experience</h2>
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div key={index} className="border-l-2 border-primary-200 pl-4">
            <div className="flex items-center mb-2">
              <Building className="h-5 w-5 text-primary-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">{exp.company}</h3>
            </div>
            <div className="flex items-center text-gray-600 mb-2">
              <Calendar className="h-4 w-4 mr-2" />
              {exp.duration}
            </div>
            <p className="text-gray-800 font-medium mb-2">{exp.position}</p>
            <p className="text-gray-600">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}