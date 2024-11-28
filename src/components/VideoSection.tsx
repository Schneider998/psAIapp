import React from 'react';
import { Play, Phone, Video } from 'lucide-react';

interface VideoSectionProps {
  videoIntro: string;
  salesCall: string;
  interview: string;
}

export default function VideoSection({ videoIntro, salesCall, interview }: VideoSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="aspect-video bg-gray-100 rounded-lg mb-4 relative group cursor-pointer">
          <div className="absolute inset-0 flex items-center justify-center">
            <Play className="h-12 w-12 text-blue-600" />
          </div>
          <img
            src={videoIntro}
            alt="Video Introduction"
            className="w-full h-full object-cover rounded-lg opacity-80 group-hover:opacity-100 transition-opacity"
          />
        </div>
        <h3 className="text-lg font-semibold flex items-center">
          <Video className="h-5 w-5 mr-2 text-blue-600" />
          Video Introduction
        </h3>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="aspect-video bg-gray-100 rounded-lg mb-4 relative group cursor-pointer">
          <div className="absolute inset-0 flex items-center justify-center">
            <Play className="h-12 w-12 text-blue-600" />
          </div>
          <img
            src={salesCall}
            alt="Sales Call Recording"
            className="w-full h-full object-cover rounded-lg opacity-80 group-hover:opacity-100 transition-opacity"
          />
        </div>
        <h3 className="text-lg font-semibold flex items-center">
          <Phone className="h-5 w-5 mr-2 text-blue-600" />
          Sales Call Recording
        </h3>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="aspect-video bg-gray-100 rounded-lg mb-4 relative group cursor-pointer">
          <div className="absolute inset-0 flex items-center justify-center">
            <Play className="h-12 w-12 text-blue-600" />
          </div>
          <img
            src={interview}
            alt="Interview Recording"
            className="w-full h-full object-cover rounded-lg opacity-80 group-hover:opacity-100 transition-opacity"
          />
        </div>
        <h3 className="text-lg font-semibold flex items-center">
          <Video className="h-5 w-5 mr-2 text-blue-600" />
          Interview Recording
        </h3>
      </div>
    </div>
  );
}