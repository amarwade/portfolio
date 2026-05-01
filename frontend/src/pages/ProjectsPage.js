import { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";

function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects().then(res => setProjects(res.data));
  }, []);

  return (
    <div>
      <h1>Mes projets</h1>

      {projects.map(p => (
        <div key={p.id}>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ProjectsPage;