import { useState, useMemo } from "react";

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

  const showPhoto = Boolean(profile.heroImage) && !photoFailed;
  const initials = useMemo(() => initialsFromName(profile.name), [profile.name]);

  return (
    <section id="about" className="section hero" aria-labelledby="hero-heading">
      <div className="hero__grid">
        <div className="hero__content">
          <p className="eyebrow">{profile.eyebrow ?? "Portfolio"}</p>
          <h1 id="hero-heading">{profile.name}</h1>
          {profile.heroTagline ? (
            <p className="hero-tagline">{profile.heroTagline}</p>
          ) : null}
          <h2>{profile.title}</h2>
          <p className="lead">{profile.pitch}</p>
          <div className="cta-row">
            <a className="button primary" href="#projects">
              Voir mes projets
            </a>
            <a className="button" href={profile.cvUrl}>
              Télécharger mon CV
            </a>
            <a className="button" href="#contact">
              Me contacter
            </a>
          </div>
          <p className="meta">
            {profile.location} ·{" "}
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            {telHref ? (
              <>
                {" · "}
                <a href={`tel:${telHref}`}>{profile.phone}</a>
              </>
            ) : null}
          </p>
          {profile.languagesLine ? (
            <p className="meta languages-meta">{profile.languagesLine}</p>
          ) : null}
          <div className="social-row">
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>

        <div className="hero__visual">
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
    </section>
  );
}

export default HeroSection;
