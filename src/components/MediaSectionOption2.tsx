import React from 'react';
import { Play, Phone, Video, Clock, Calendar } from 'lucide-react';

interface MediaProps {
  interviews: Array<{
    title: string;
    duration: string;
    thumbnail: string;
  }>;
  salesCalls: Array<{
    title: string;
    duration: string;
    date: string;
  }>;
}

export default function MediaSectionOption2({ interviews, salesCalls }: MediaProps) {
  return (
    <div className="space-y-8">
      {/* Interviews Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Video className="w-5 h-5 text-primary-500 mr-2" />
          Interview Recordings
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {interviews.map((interview, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer">
              <div className="aspect-video relative">
                <img
                  src={interview.thumbnail}
                  alt={interview.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 bg-primary-500 rounded-full flex items-center justify-center">
                    <Play className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-2">{interview.title}</h3>
                <p className="text-sm text-gray-500 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {interview.duration}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sales Calls Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Phone className="w-5 h-5 text-primary-500 mr-2" />
          Sales Call Recordings
        </h2>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {salesCalls.map((call, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer group border-b last:border-b-0"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                  <Play className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{call.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {call.duration}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {call.date}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="opacity-0 group-hover:opacity-100 transition-opacity bg-primary-500 text-white px-4 py-2 rounded-lg">
                  Listen Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}