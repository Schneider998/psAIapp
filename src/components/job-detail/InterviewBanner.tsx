import React from 'react';
import { Calendar, ExternalLink } from 'lucide-react';

interface InterviewBannerProps {
  type: 'invite' | 'accepted';
  schedulingLink?: string;
  onAccept?: () => void;
  onDecline?: () => void;
}

export default function InterviewBanner({ type, schedulingLink, onAccept, onDecline }: InterviewBannerProps) {
  if (type === 'accepted') {
    return (
      <div className="bg-green-50 border border-green-100 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-green-800 mb-2">
          🎉 Congratulations! Your application has been accepted
        </h2>
        <p className="text-green-700 mb-4">
          The company is excited to meet you! Please schedule your interview at your earliest convenience.
        </p>
        <a
          href={schedulingLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Calendar className="h-5 w-5 mr-2" />
          Schedule Interview
          <ExternalLink className="h-4 w-4 ml-2" />
        </a>
      </div>
    );
  }

  return (
    <div className="bg-primary-50 border border-primary-100 rounded-xl p-6 mb-6">
      <h2 className="text-lg font-semibold text-primary-800 mb-2">
        You've been invited to interview!
      </h2>
      <p className="text-primary-700 mb-4">
        The company is interested in your profile and would like to schedule an interview.
      </p>
      <div className="flex space-x-3">
        <button
          onClick={onAccept}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Accept & Schedule
        </button>
        <button
          onClick={onDecline}
          className="px-4 py-2 border border-primary-200 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors"
        >
          Decline
        </button>
      </div>
    </div>
  );
}