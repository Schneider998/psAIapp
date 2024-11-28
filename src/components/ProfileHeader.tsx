import React from 'react';
import { MapPin, Briefcase, GraduationCap, Star } from 'lucide-react';

interface ProfileHeaderProps {
  name: string;
  title: string;
  location: string;
  experience: string;
  education: string;
  score: number;
  image: string;
}

export default function ProfileHeader({
  name,
  title,
  location,
  experience,
  education,
  score,
  image,
}: ProfileHeaderProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600" />
      <div className="relative px-6 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end -mt-16 sm:-mt-24">
          <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-lg">
            <img src={image} alt={name} className="w-full h-full object-cover" />
          </div>
          <div className="mt-6 sm:mt-0 sm:ml-6 sm:pb-4">
            <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
            <p className="text-xl text-gray-600">{title}</p>
          </div>
          <div className="mt-6 sm:mt-0 sm:ml-auto flex items-center bg-blue-50 px-4 py-2 rounded-full">
            <Star className="h-5 w-5 text-yellow-400 mr-1" />
            <span className="font-semibold">{score}/100</span>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center text-gray-700">
            <MapPin className="h-5 w-5 mr-2 text-gray-400" />
            {location}
          </div>
          <div className="flex items-center text-gray-700">
            <Briefcase className="h-5 w-5 mr-2 text-gray-400" />
            {experience}
          </div>
          <div className="flex items-center text-gray-700">
            <GraduationCap className="h-5 w-5 mr-2 text-gray-400" />
            {education}
          </div>
        </div>
      </div>
    </div>
  );
}