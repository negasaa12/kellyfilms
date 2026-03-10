import React from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css';

function AboutPage() {
  return (
    <div className="about-page">
      <header className="about-header">
        <div className="about-header-content">
          <h1 className="about-title">Kelly Javier</h1>
          <p className="about-tagline">Cinematographer & Director</p>
        </div>
        <nav className="about-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/films" className="nav-link">Portfolio</Link>
          <Link to="/about" className="nav-link active">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </nav>
      </header>

      <main className="about-main">
        <section className="about-hero">
          <div className="about-hero-content">
            <h2>About Me</h2>
            <p className="about-intro">
              I'm a cinematographer and director passionate about visual storytelling. My work explores the intersection of light, shadow, and emotion—creating cinematic experiences that challenge perspective and evoke feeling.
            </p>
          </div>
        </section>

        <section className="about-content">
          <div className="about-section">
            <h3>Vision</h3>
            <p>
              My approach to filmmaking is rooted in mood and intimacy. I believe in the power of visual language to communicate what words cannot. Every frame is intentional—a carefully composed moment that serves the story and resonates with the audience.
            </p>
          </div>

          <div className="about-section">
            <h3>Expertise</h3>
            <p>
              With experience in short films, visual essays, and experimental cinematography, I specialize in:
            </p>
            <ul>
              <li>Cinematography & Visual Composition</li>
              <li>Directorial Work</li>
              <li>Color Grading & Post-Production</li>
              <li>Narrative & Documentary Storytelling</li>
              <li>Visual Effects & Motion Design</li>
            </ul>
          </div>

          <div className="about-section">
            <h3>Collaborate</h3>
            <p>
              I'm interested in collaborating on projects that push creative boundaries. Whether you're looking for cinematography, directorial guidance, or visual storytelling expertise, I'd love to discuss your vision.
            </p>
            <Link to="/contact" className="btn btn-primary">Get In Touch</Link>
          </div>
        </section>
      </main>

      <footer className="about-footer">
        <p>&copy; 2026 Kelly Javier. All works reserved.</p>
      </footer>
    </div>
  );
}

export default AboutPage;
