import React from 'react';
import { Play, Clock, Calendar } from 'lucide-react';

interface Interview {
  title: string;
  duration: string;
  thumbnail: string;
}

interface SalesCall {
  title: string;
  duration: string;
  date: string;
}

interface MediaSectionProps {
  type: 'interview' | 'calls';
  interviews?: Interview[];
  salesCalls?: SalesCall[];
}

export default function MediaSection({ type, interviews, salesCalls }: MediaSectionProps) {
  if (type === 'interview' && interviews?.length) {
    const interview = interviews[0];
    return (
      <div>
        <div className="aspect-video bg-gray-900 rounded-lg mb-6 relative group cursor-pointer">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center">
              <Play className="w-8 h-8 text-white" />
            </div>
          </div>
          <img
            src={interview.thumbnail}
            alt="Interview video thumbnail"
            className="w-full h-full object-cover rounded-lg opacity-50"
          />
        </div>
        <h3 className="text-lg font-semibold mb-2">{interview.title}</h3>
        <p className="text-sm text-gray-500 flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          {interview.duration}
        </p>
      </div>
    );
  }

  if (type === 'calls' && salesCalls?.length) {
    return (
      <div className="space-y-4">
        {salesCalls.map((call, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center mr-4">
                <Play className="w-5 h-5 text-primary-500" />
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
            <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
              Listen
            </button>
          </div>
        ))}
      </div>
    );
  }

  return null;
}