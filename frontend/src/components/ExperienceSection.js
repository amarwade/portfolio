function ExperienceSection({ items }) {
  return (
    <section id="experience" className="section section-cv reveal-on-scroll">
      <h2 className="cv-section-title">Expérience professionnelle</h2>
      <div className="experience-grid">
        {items.map((entry, index) => (
          <div key={entry.id} className="experience-card" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="experience-header">
              <div className="experience-icon">💼</div>
              <div className="experience-period">{entry.period}</div>
            </div>
            <div className="experience-content">
              <h3 className="experience-title">{entry.title}</h3>
              {entry.organization && (
                <p className="experience-company">{entry.organization}</p>
              )}
              {entry.highlights?.length > 0 && (
                <ul className="experience-highlights">
                  {entry.highlights.map((highlight, idx) => (
                    <li key={idx} className="highlight-item">
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ExperienceSection;
