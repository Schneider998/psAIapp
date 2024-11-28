import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TalentPool from './pages/TalentPool';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import HiringPipeline from './pages/HiringPipeline';
import Applicants from './pages/Applicants';
import Profile from './pages/Profile';
import Home from './pages/Home';
import InterviewRequests from './pages/InterviewRequests';
import CreditsDisplay from './components/CreditsDisplay';
import RoleSwitcher from './components/RoleSwitcher';
import { useStore } from './data/store';

export default function App() {
  const { userRole, fetchInitialData, loading, error } = useStore();

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  // Show a less intrusive error message since we're falling back to mock data
  const ErrorBanner = () => error && (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 text-yellow-800 z-50">
      {error}
    </div>
  );

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-50">
        <ErrorBanner />
        <Sidebar />
        <main className="flex-1 overflow-auto">
          {userRole === 'client' && (
            <div className="fixed top-4 right-8 z-50">
              <CreditsDisplay />
            </div>
          )}
          <div className="p-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/talent" element={<TalentPool />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobDetail />} />
              <Route path="/pipeline" element={<HiringPipeline />} />
              <Route path="/applicants" element={<Applicants />} />
              <Route path="/interviews" element={<InterviewRequests />} />
              <Route path="/profile/:id" element={<Profile />} />
            </Routes>
          </div>
          <RoleSwitcher />
        </main>
      </div>
    </BrowserRouter>
  );
}