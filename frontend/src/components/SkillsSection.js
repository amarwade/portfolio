function SkillsSection({ categories }) {
  return (
    <section id="skills" className="section section-cv reveal-on-scroll">
      <h2 className="cv-section-title">Compétences</h2>
      <div className="skills-categories">
        {categories.map((category) => (
          <div key={category.id} className="skills-category">
            <h3 className="skills-category-title">{category.title}</h3>
            <div className="chip-grid">
              {category.items.map((skill) => (
                <span className="chip" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SkillsSection;
