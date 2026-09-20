import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Auth from './pages/Auth';

import Dashboard from './pages/Dashboard';
import CareerMap from './pages/CareerMap';
import MySkills from './pages/MySkills';
import SkillGap from './pages/SkillGap';
import LearningPlan from './pages/LearningPlan';
import Practice from './pages/Practice';
import Progress from './pages/Progress';
import AIMentor from './pages/AIMentor';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

import { api } from './services/api';
import './App.css';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const userParam = params.get('user');
      const authSuccess = params.get('auth_success');

      if (authSuccess === 'google' && userParam) {
        const decodedUser = JSON.parse(decodeURIComponent(userParam));
        localStorage.setItem('edupath_user', JSON.stringify(decodedUser));
        window.history.replaceState({}, document.title, window.location.pathname);
        return decodedUser;
      }
    } catch (e) {
      console.warn('OAuth URL parameter parse error:', e);
    }

    try {
      const stored = localStorage.getItem('edupath_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    if (currentUser) {
      api.getSkills().then(res => {
        if (res && res.skills) setSkills(res.skills);
      }).catch(() => {});
    }
  }, [currentUser]);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('edupath_user');
    setCurrentUser(null);
    setActiveTab('dashboard');
  };

  if (!currentUser) {
    return <Auth onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="app-layout">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        user={currentUser}
      />

      <main className="main-content">
        {activeTab === 'dashboard' && (
          <Dashboard
            user={currentUser}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'careermap' && (
          <CareerMap
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'skills' && (
          <MySkills
            skills={skills}
            onSkillsUpdated={(newSk) => setSkills(newSk)}
          />
        )}

        {activeTab === 'gaps' && (
          <SkillGap
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'plan' && (
          <LearningPlan
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'practice' && (
          <Practice
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'progress' && (
          <Progress />
        )}

        {activeTab === 'mentor' && (
          <AIMentor studentState={{ user: currentUser }} />
        )}

        {activeTab === 'profile' && (
          <Profile
            user={currentUser}
            onProfileUpdated={(updated) => setCurrentUser(updated)}
          />
        )}

        {activeTab === 'settings' && (
          <Settings />
        )}
      </main>
    </div>
  );
}