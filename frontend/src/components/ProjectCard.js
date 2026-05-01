function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      {project.tech ? <p className="project-tech">Stack: {project.tech}</p> : null}
      {project.githubLink ? (
        <a
          className="project-card__link"
          href={project.githubLink}
          target="_blank"
          rel="noreferrer"
        >
          Voir le code
        </a>
      ) : null}
    </article>
  );
}

export default ProjectCard;
