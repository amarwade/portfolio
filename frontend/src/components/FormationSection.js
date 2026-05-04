function FormationSection({ items }) {
  return (
    <section id="formation" className="section section-cv reveal-on-scroll">
      <h2 className="cv-section-title">Formation</h2>
      <div className="formation-timeline">
        {items.map((entry, index) => (
          <div key={entry.id} className="formation-item" style={{ animationDelay: `${index * 0.15}s` }}>
            <div className="formation-dot">
              <span className="dot-icon">🎓</span>
            </div>
            <div className="formation-card-compact">
              <div className="formation-period-small">{entry.period}</div>
              <h3 className="formation-degree">{entry.title}</h3>
              {entry.institution && (
                <p className="formation-school-name">
                  <span className="school-symbol">◆</span>
                  {entry.institution}
                </p>
              )}
              {entry.detail && (
                <p className="formation-info">{entry.detail}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FormationSection;
