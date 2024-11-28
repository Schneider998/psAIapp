import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Briefcase, Bell } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">SalesTalent</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link to="/talent" className="text-gray-700 hover:text-blue-600 flex items-center space-x-1">
              <Users className="h-5 w-5" />
              <span>Talent Pool</span>
            </Link>
            <Link to="/jobs" className="text-gray-700 hover:text-blue-600 flex items-center space-x-1">
              <Briefcase className="h-5 w-5" />
              <span>Jobs</span>
            </Link>
            <button className="relative p-2">
              <Bell className="h-6 w-6 text-gray-600" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>
            <img
              className="h-8 w-8 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}