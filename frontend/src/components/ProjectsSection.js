import { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";
import ProjectCard from "./ProjectCard";

function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading");

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

  return (
    <section id="projects" className="section section-cv reveal-on-scroll">
      <h2 className="cv-section-title">Projets</h2>
      {status === "loading" ? <p>Chargement des projets...</p> : null}
      {status === "error" ? (
        <p>Impossible de recuperer les projets pour le moment.</p>
      ) : null}
      {status === "success" && projects.length === 0 ? (
        <p>Aucun projet publie pour le moment.</p>
      ) : null}
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

export default ProjectsSection;
