function ExperienceSection({ items }) {
  return (
    <section id="experience" className="section section-cv reveal-on-scroll">
      <h2 className="cv-section-title">Expérience professionnelle</h2>
      <ul className="timeline">
        {items.map((entry) => (
          <li key={entry.id} className="timeline-item">
            <span className="timeline-period">{entry.period}</span>
            <div className="timeline-body">
              <h3>{entry.title}</h3>
              {entry.organization ? (
                <p className="timeline-sub">{entry.organization}</p>
              ) : null}
              {entry.highlights?.length ? (
                <ul className="timeline-bullets">
                  {entry.highlights.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ExperienceSection;
