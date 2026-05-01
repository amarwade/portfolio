function FormationSection({ items }) {
  return (
    <section id="formation" className="section section-cv reveal-on-scroll">
      <h2 className="cv-section-title">Formation</h2>
      <ul className="formation-list">
        {items.map((entry) => (
          <li key={entry.id} className="formation-item">
            <div className="formation-item-header">
              <h3 className="formation-degree">{entry.title}</h3>
              <span className="formation-dates">{entry.period}</span>
            </div>
            {entry.institution ? (
              <p className="formation-school">
                <span className="formation-diamond" aria-hidden="true">
                  ◆
                </span>
                {entry.institution}
              </p>
            ) : null}
            {entry.detail ? (
              <p className="formation-distinction">{entry.detail}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FormationSection;
