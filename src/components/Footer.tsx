import React from 'react';
import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">SalesTalent</span>
            </Link>
            <p className="mt-4 text-gray-400">
              Connecting top sales talent with innovative companies.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">For Candidates</h3>
            <ul className="space-y-2">
              <li><Link to="/jobs" className="text-gray-400 hover:text-white">Browse Jobs</Link></li>
              <li><Link to="/profile" className="text-gray-400 hover:text-white">Create Profile</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Success Stories</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">For Companies</h3>
            <ul className="space-y-2">
              <li><Link to="/talent" className="text-gray-400 hover:text-white">Browse Talent</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Post a Job</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} SalesTalent. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}