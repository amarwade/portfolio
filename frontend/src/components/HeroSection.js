import { useState, useMemo, useEffect } from "react";

function initialsFromName(name) {
  if (!name || typeof name !== "string") return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function HeroSection({ profile }) {
  const telHref = profile.phone ? profile.phone.replace(/\s+/g, "") : null;
  const [photoFailed, setPhotoFailed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const showPhoto = Boolean(profile.heroImage) && !photoFailed;
  const initials = useMemo(() => initialsFromName(profile.name), [profile.name]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="about" className="section hero enhanced" aria-labelledby="hero-heading">
      <div className="hero__background">
        <div className="hero__particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>
        <div 
          className="hero__gradient-orb"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
      </div>
      
      <div className="hero__grid">
        <div className={`hero__content ${isLoaded ? 'loaded' : ''}`}>
          <div className="hero__badge">
            <span className="badge-pulse"></span>
            {profile.eyebrow ?? "Portfolio"}
          </div>
          
          <h1 id="hero-heading" className="hero__title">
            <span className="title-word" style={{ animationDelay: '0.1s' }}>
              {profile.name.split(' ')[0]}
            </span>
            {profile.name.split(' ').slice(1).map((word, i) => (
              <span key={i} className="title-word" style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
                {word}
              </span>
            ))}
          </h1>
          
          {profile.heroTagline ? (
            <p className="hero-tagline">{profile.heroTagline}</p>
          ) : null}
          
          <h2 className="hero__subtitle">{profile.title}</h2>
          
          <p className="hero__description">{profile.pitch}</p>
          
          <div className="hero__actions">
            <button 
              className="button primary enhanced"
              onClick={(e) => handleSmoothScroll(e, 'projects')}
            >
              <span className="button-content">
                <span className="button-text">Voir mes projets</span>
                <svg className="button-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
              </span>
              <div className="button-ripple"></div>
            </button>
            
            <a className="button secondary enhanced" href={profile.cvUrl} download>
              <span className="button-content">
                <svg className="button-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
                <span className="button-text">Télécharger mon CV</span>
              </span>
            </a>
            
            <button 
              className="button tertiary enhanced"
              onClick={(e) => handleSmoothScroll(e, 'contact')}
            >
              <span className="button-content">
                <span className="button-text">Me contacter</span>
                <svg className="button-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
              </span>
            </button>
          </div>
          
          <div className="hero__meta">
            <div className="meta-item">
              <svg className="meta-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>{profile.location}</span>
            </div>
            
            <div className="meta-item">
              <svg className="meta-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M22 7l-10 5L2 7"/>
              </svg>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>
            
            {telHref && (
              <div className="meta-item">
                <svg className="meta-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
                <a href={`tel:${telHref}`}>{profile.phone}</a>
              </div>
            )}
          </div>
          
          {profile.languagesLine && (
            <div className="hero__languages">
              <span className="languages-label">Langues:</span>
              <span className="languages-text">{profile.languagesLine}</span>
            </div>
          )}
          
          <div className="hero__social">
            <a href={profile.github} target="_blank" rel="noreferrer" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        <div className={`hero__visual ${isLoaded ? 'loaded' : ''}`}>
          <div className="hero__visual-effects">
            <div className="floating-card card-1">
              <div className="card-icon">💻</div>
              <span>Java</span>
            </div>
            <div className="floating-card card-2">
              <div className="card-icon">⚛️</div>
              <span>React</span>
            </div>
            <div className="floating-card card-3">
              <div className="card-icon">🔧</div>
              <span>Spring</span>
            </div>
          </div>
          
          <div className="hero-photo-container">
            <div className="hero-photo-glow" />
            <div className="hero-photo-ring" aria-hidden="true" />
            <figure className="hero-photo">
              {showPhoto ? (
                <img
                  src={profile.heroImage}
                  alt={profile.heroImageAlt || profile.name}
                  width={400}
                  height={500}
                  loading="eager"
                  decoding="async"
                  className="hero-photo__img"
                  onError={() => setPhotoFailed(true)}
                />
              ) : (
                <div className="hero-photo__fallback" aria-hidden="true">
                  {initials}
                </div>
              )}
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
