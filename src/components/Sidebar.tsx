import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, Briefcase, GitPullRequest, UserCheck, LogOut, Mail } from 'lucide-react';
import { useStore } from '../data/store';

export default function Sidebar() {
  const location = useLocation();
  const { userRole } = useStore();
  
  const isActive = (path: string) => location.pathname === path;

  const clientLinks = [
    { path: '/talent', icon: Users, label: 'Find Sales Reps' },
    { path: '/jobs', icon: Briefcase, label: 'Your Job Listings' },
    { path: '/applicants', icon: UserCheck, label: 'Applicants' },
    { path: '/pipeline', icon: GitPullRequest, label: 'Hiring Pipeline' }
  ];

  const candidateLinks = [
    { path: '/jobs', icon: Briefcase, label: 'Browse Jobs' },
    { path: '/interviews', icon: Mail, label: 'Interview Requests' },
    { path: `/profile/${useStore.getState().currentUserId}`, icon: Users, label: 'My Profile' }
  ];
  
  const links = userRole === 'client' ? clientLinks : candidateLinks;
  
  return (
    <div className="w-64 glass-card border-r border-white/10 h-screen flex flex-col">
      <div className="p-6">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8">
            <svg viewBox="0 0 1000 1000" className="w-full h-full text-primary-500">
              <path
                fill="currentColor"
                d="M500 0L1000 250V750L500 1000L0 750V250L500 0Z"
              />
            </svg>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 text-transparent bg-clip-text">
            SalesTalent
          </span>
        </Link>
      </div>
      
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive(link.path) 
                  ? 'glass-card shadow-neon text-primary-400' 
                  : 'text-gray-400 hover:glass-card hover:text-primary-400'
              }`}
            >
              <link.icon className="h-5 w-5" />
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
        </div>
      </nav>
      
      <div className="p-4 border-t border-white/10">
        <button className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:glass-card hover:text-primary-400 w-full transition-all duration-300">
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}