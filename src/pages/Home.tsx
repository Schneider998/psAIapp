import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Briefcase, Star, Trophy, Play, Phone } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="py-20 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            The #1 Marketplace for Elite Sales Talent
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Connect with top sales professionals or find your next sales opportunity. 
            Video introductions, real sales calls, and verified performance metrics.
          </p>
          <div className="flex justify-center space-x-6">
            <Link to="/talent" className="bg-primary-500 text-white px-8 py-3 rounded-md hover:bg-primary-600 transition-colors">
              Browse Talent
            </Link>
            <Link to="/jobs" className="bg-white text-primary-500 px-8 py-3 rounded-md border-2 border-primary-500 hover:bg-primary-50 transition-colors">
              View Jobs
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16">
          <div className="text-center">
            <div className="bg-primary-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Users className="h-8 w-8 text-primary-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">5,000+</h3>
            <p className="text-gray-600">Verified Sales Professionals</p>
          </div>
          <div className="text-center">
            <div className="bg-primary-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Briefcase className="h-8 w-8 text-primary-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">1,200+</h3>
            <p className="text-gray-600">Active Job Listings</p>
          </div>
          <div className="text-center">
            <div className="bg-primary-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Trophy className="h-8 w-8 text-primary-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">92%</h3>
            <p className="text-gray-600">Placement Success Rate</p>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose SalesTalent?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-primary-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Play className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Video Introductions</h3>
              <p className="text-gray-600">Watch candidate video introductions to get a real sense of their personality and communication style.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-primary-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Real Sales Calls</h3>
              <p className="text-gray-600">Listen to actual sales calls to evaluate candidates' selling skills and approach.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-primary-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Performance Metrics</h3>
              <p className="text-gray-600">Review verified performance metrics and success rates for data-driven hiring decisions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}