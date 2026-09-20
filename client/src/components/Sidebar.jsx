import React from 'react';
import { 
  LayoutDashboard, 
  MapPin, 
  Sparkles, 
  BookOpen, 
  Code2, 
  TrendingUp, 
  MessageSquare, 
  User, 
  Settings, 
  LogOut,
  Compass
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, onLogout, user }) {
  const primaryNav = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'careermap', label: 'Career Map', icon: MapPin },
    { id: 'skills', label: 'Skills', icon: Sparkles },
    { id: 'plan', label: 'Learning', icon: BookOpen },
    { id: 'practice', label: 'Practice', icon: Code2 },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'mentor', label: 'AI Mentor', icon: MessageSquare }
  ];

  const secondaryNav = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className="app-sidebar">
      {/* Human-designed Clean Brand Header */}
      <div className="sidebar-brand-box">
        <div className="brand-logo-icon">
          <Compass size={18} strokeWidth={2.2} className="logo-compass-icon" />
        </div>
        <div className="brand-wordmark-text">
          <span className="brand-title-main">EDUPATH</span>
          <span className="brand-subtitle-mini">Career Learning Platform</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav-list">
        {primaryNav.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon size={17} strokeWidth={1.8} className="nav-icon" />
              <span className="nav-label-text">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer Navigation & Profile */}
      <div className="sidebar-user-footer">
        <div className="secondary-nav-group mb-2">
          {secondaryNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`nav-item-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon size={17} strokeWidth={1.8} className="nav-icon" />
                <span className="nav-label-text">{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="user-profile-strip">
          <div className="user-avatar-initial">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
          </div>
          <div className="user-strip-info">
            <span className="user-strip-name">{user?.name || 'Aaruran'}</span>
            <span className="user-strip-role">{user?.targetRole || 'Full Stack Developer'}</span>
          </div>
          <button className="logout-icon-btn" onClick={onLogout} title="Sign Out">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}