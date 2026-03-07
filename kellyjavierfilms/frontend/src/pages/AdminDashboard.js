import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ManageFilms from '../components/admin/ManageFilms';
import ManageReviews from '../components/admin/ManageReviews';
import ManageContacts from '../components/admin/ManageContacts';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <p className="admin-user">{user?.firstName} {user?.lastName}</p>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📊 Overview
          </button>
          <button
            className={`nav-btn ${activeTab === 'films' ? 'active' : ''}`}
            onClick={() => setActiveTab('films')}
          >
            🎬 Manage Films
          </button>
          <button
            className={`nav-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            ⭐ Reviews
          </button>
          <button
            className={`nav-btn ${activeTab === 'contacts' ? 'active' : ''}`}
            onClick={() => setActiveTab('contacts')}
          >
            💬 Messages
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </aside>

      <main className="admin-content">
        <header className="admin-header">
          <h1>KellyJavier Films - Admin Dashboard</h1>
          <p>Manage your portfolio and communications</p>
        </header>

        <div className="admin-body">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'films' && <ManageFilms />}
          {activeTab === 'reviews' && <ManageReviews />}
          {activeTab === 'contacts' && <ManageContacts />}
        </div>
      </main>
    </div>
  );
};

const OverviewTab = () => {
  return (
    <div className="overview-tab">
      <h2>Dashboard Overview</h2>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="card-icon">🎬</div>
          <h3>Films</h3>
          <p className="card-description">Manage your film portfolio</p>
          <p className="card-action">Add, edit, or remove films</p>
        </div>
        <div className="overview-card">
          <div className="card-icon">⭐</div>
          <h3>Reviews</h3>
          <p className="card-description">View audience feedback</p>
          <p className="card-action">Monitor ratings and comments</p>
        </div>
        <div className="overview-card">
          <div className="card-icon">💬</div>
          <h3>Messages</h3>
          <p className="card-description">Client inquiries and bookings</p>
          <p className="card-action">Manage contact requests</p>
        </div>
        <div className="overview-card">
          <div className="card-icon">👤</div>
          <h3>Profile</h3>
          <p className="card-description">Your portfolio details</p>
          <p className="card-action">Edit bio and contact info</p>
        </div>
      </div>

      <div className="welcome-section">
        <h2>Welcome to Your Admin Dashboard</h2>
        <p>
          Use the sidebar menu to navigate through different admin functions. 
          Manage your film portfolio, track audience reviews, and respond to client inquiries.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
