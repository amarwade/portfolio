import { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";
import ProjectCard from "./ProjectCard";

function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await getProjects();
        setProjects(response.data);
        setStatus("success");
      } catch (error) {
        setStatus("error");
      }
    };

    loadProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    if (filter === "all") return true;
    return project.tech.toLowerCase().includes(filter.toLowerCase());
  });

  const uniqueTechnologies = [...new Set(projects.flatMap(p => p.tech.split(',').map(t => t.trim())))];

  return (
    <section id="projects" className="section section-cv reveal-on-scroll projects-enhanced">
      <div className="projects-header">
        <h2 className="cv-section-title">Mes Projets</h2>
        <p className="projects-subtitle">Découvrez mes réalisations et mes compétences techniques</p>
      </div>

      {status === "loading" && (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Chargement des projets...</p>
        </div>
      )}
      
      {status === "error" && (
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <p>Impossible de récupérer les projets pour le moment.</p>
          <button onClick={() => window.location.reload()} className="retry-button">
            Réessayer
          </button>
        </div>
      )}
      
      {status === "success" && projects.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📁</div>
          <p>Aucun projet publié pour le moment.</p>
        </div>
      )}

      {status === "success" && projects.length > 0 && (
        <>
          <div className="projects-filter">
            <button 
              className={`filter-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              Tous
            </button>
            {uniqueTechnologies.slice(0, 5).map(tech => (
              <button 
                key={tech}
                className={`filter-btn ${filter === tech.toLowerCase() ? "active" : ""}`}
                onClick={() => setFilter(tech.toLowerCase())}
              >
                {tech}
              </button>
            ))}
          </div>

          <div className="project-grid enhanced">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className="project-wrapper"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="no-results">
              <p>Aucun projet trouvé pour le filtre "{filter}"</p>
              <button onClick={() => setFilter("all")} className="reset-filter">
                Réinitialiser le filtre
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default ProjectsSection;
