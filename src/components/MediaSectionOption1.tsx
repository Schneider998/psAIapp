import React, { useState } from 'react';
import { Play, Phone, Video, Clock } from 'lucide-react';

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

export default function MediaSectionOption1({ interviews, salesCalls }: MediaProps) {
  const [activeTab, setActiveTab] = useState('interviews');

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab('interviews')}
          className={`flex-1 px-6 py-4 text-sm font-medium ${
            activeTab === 'interviews'
              ? 'border-b-2 border-primary-500 text-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center justify-center">
            <Video className="w-5 h-5 mr-2" />
            Interviews
          </div>
        </button>
        <button
          onClick={() => setActiveTab('calls')}
          className={`flex-1 px-6 py-4 text-sm font-medium ${
            activeTab === 'calls'
              ? 'border-b-2 border-primary-500 text-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center justify-center">
            <Phone className="w-5 h-5 mr-2" />
            Sales Calls
          </div>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="p-6">
        {/* Video Player */}
        <div className="aspect-video bg-gray-900 rounded-lg mb-6 relative group cursor-pointer">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center">
              <Play className="w-8 h-8 text-white" />
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=675&q=80"
            alt="Video thumbnail"
            className="w-full h-full object-cover rounded-lg opacity-50"
          />
        </div>

        {/* Playlist */}
        <div className="space-y-2">
          {(activeTab === 'interviews' ? interviews : salesCalls).map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                  <Play className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {item.duration}
                  </p>
                </div>
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity bg-primary-500 text-white px-4 py-2 rounded-lg">
                Play
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}