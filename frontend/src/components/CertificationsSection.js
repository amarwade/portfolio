function CertificationsSection({ items }) {
  return (
    <section id="certifications" className="section section-cv reveal-on-scroll">
      <h2 className="cv-section-title">Certifications</h2>
      <ul className="cert-list">
        {items.map((entry) => (
          <li
            key={entry.id}
            className={
              entry.date ? "cert-item" : "cert-item cert-item--no-date"
            }
          >
            <span className="cert-bullet" aria-hidden="true">
              ▸
            </span>
            <div className="cert-main">
              <strong className="cert-name">{entry.name}</strong>
              <span className="cert-sep"> · </span>
              <span className="cert-provider">{entry.provider}</span>
            </div>
            {entry.date ? (
              <time className="cert-date">{entry.date}</time>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CertificationsSection;
