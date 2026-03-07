import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './HomePage.css';

function HomePage() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [entered, setEntered] = useState(false);

  if (!entered) {
    return (
      <div className="welcome-splash">
        <div className="splash-content">
          <h1 className="splash-title">Kelly Javier</h1>
          <p className="splash-subtitle">Cinematographer & Director</p>
          <button onClick={() => setEntered(true)} className="enter-button">
            Enter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-content">
          <h1 className="site-title">Kelly Javier</h1>
          <p className="site-tagline">Cinematographer & Director</p>
        </div>
        <nav className="home-nav">
          {isAuthenticated ? (
            <>
              <Link to="/films" className="nav-link">Portfolio</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
              {user?.role === 'admin' && (
                <button onClick={() => navigate('/admin')} className="nav-link admin-dashboard-link">
                  ⚙️ Admin
                </button>
              )}
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
            </>
          ) : (
            <>
              <Link to="/films" className="nav-link">Portfolio</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-link signup-link">Access</Link>
            </>
          )}
        </nav>
      </header>

      <main className="home-main">
        <section className="hero-section">
          <div className="hero-content">
            <h2>Visual Storytelling</h2>
            <p>Explore cinematic works—short films, visual essays, and aesthetic explorations</p>
            {!isAuthenticated && (
              <div className="hero-buttons">
                <Link to="/signup" className="btn btn-primary">View Portfolio</Link>
                <Link to="/login" className="btn btn-secondary">Sign In</Link>
              </div>
            )}
            {isAuthenticated && (
              <div className="hero-buttons">
                <Link to="/films" className="btn btn-primary">My Works</Link>
              </div>
            )}
          </div>
        </section>

        <section className="features-section">
          <h3>Creative Vision</h3>
          <div className="features-grid">
            <div className="feature-card">
              <h4>Short Films</h4>
              <p>Intimate narratives and experimental visual storytelling that challenge perspective</p>
            </div>
            <div className="feature-card">
              <h4>Cinematography</h4>
              <p>Mood-driven compositions exploring light, shadow, and the beauty of stillness</p>
            </div>
            <div className="feature-card">
              <h4>Community</h4>
              <p>Connect with fellow creators and share insights on the craft of visual art</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <p>&copy; 2026 Kelly Javier. All works reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
