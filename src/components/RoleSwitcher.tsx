import React, { useState } from 'react';
import { useStore } from '../data/store';
import { Users, Building, ChevronDown } from 'lucide-react';

const candidates = [
  { 
    id: '1', 
    name: 'David Copperfield',
    role: 'Senior Sales Executive',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80'
  },
  { 
    id: '2', 
    name: 'Sarah Johnson',
    role: 'Enterprise Sales Manager',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80'
  },
  { 
    id: '3', 
    name: 'Michael Chen',
    role: 'Sales Development Rep',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80'
  }
];

const clients = [
  {
    id: 'salesforce',
    name: 'Salesforce',
    role: 'Hiring Manager',
    image: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop&q=80'
  },
  {
    id: 'stripe',
    name: 'Stripe',
    role: 'Recruiter',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=200&fit=crop&q=80'
  }
];

export default function RoleSwitcher() {
  const { userRole, setUserRole } = useStore();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleUserSwitch = (id: string) => {
    setUserRole('candidate', id);
    setShowDropdown(false);
  };

  const handleClientSwitch = (id: string) => {
    setUserRole('client', id);
    setShowDropdown(false);
  };

  const getCurrentUser = () => {
    if (userRole === 'client') {
      return clients.find(c => c.id === useStore.getState().currentUserId) || clients[0];
    }
    return candidates.find(c => c.id === useStore.getState().currentUserId) || candidates[0];
  };

  const currentUser = getCurrentUser();

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end z-50">
      {showDropdown && (
        <div className="mb-2 bg-white rounded-lg shadow-xl border border-gray-200 p-2 min-w-[300px]">
          <div className="px-3 py-2 text-sm text-gray-500 font-medium border-b border-gray-100 mb-2">
            Candidates
          </div>
          {candidates.map((candidate) => (
            <button
              key={candidate.id}
              onClick={() => handleUserSwitch(candidate.id)}
              className={`w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 flex items-center ${
                userRole === 'candidate' && useStore.getState().currentUserId === candidate.id
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-700'
              }`}
            >
              <img
                src={candidate.image}
                alt={candidate.name}
                className="w-8 h-8 rounded-full mr-3"
              />
              <div>
                <div className="font-medium">{candidate.name}</div>
                <div className="text-sm text-gray-500">{candidate.role}</div>
              </div>
            </button>
          ))}

          <div className="px-3 py-2 text-sm text-gray-500 font-medium border-b border-gray-100 mt-4 mb-2">
            Clients
          </div>
          {clients.map((client) => (
            <button
              key={client.id}
              onClick={() => handleClientSwitch(client.id)}
              className={`w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 flex items-center ${
                userRole === 'client' && useStore.getState().currentUserId === client.id
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-700'
              }`}
            >
              <img
                src={client.image}
                alt={client.name}
                className="w-8 h-8 rounded-full mr-3"
              />
              <div>
                <div className="font-medium">{client.name}</div>
                <div className="text-sm text-gray-500">{client.role}</div>
              </div>
            </button>
          ))}
        </div>
      )}
      
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="bg-white rounded-lg shadow-lg p-3 border border-gray-200 flex items-center space-x-3 hover:bg-gray-50 transition-colors min-w-[200px]"
      >
        <img
          src={currentUser.image}
          alt={currentUser.name}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex-1 text-left">
          <div className="font-medium text-gray-900">{currentUser.name}</div>
          <div className="text-sm text-gray-500">{currentUser.role}</div>
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
      </button>
    </div>
  );
}