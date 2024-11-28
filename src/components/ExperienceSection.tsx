import React from 'react';
import { Calendar, Building } from 'lucide-react';

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
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">Work Experience</h2>
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div key={index} className="border-l-2 border-blue-200 pl-4">
            <div className="flex items-center mb-2">
              <Building className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="text-xl font-semibold">{exp.company}</h3>
            </div>
            <div className="flex items-center text-gray-600 mb-2">
              <Calendar className="h-4 w-4 mr-2" />
              {exp.duration}
            </div>
            <p className="text-lg font-medium text-gray-800 mb-2">{exp.position}</p>
            <p className="text-gray-600">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}