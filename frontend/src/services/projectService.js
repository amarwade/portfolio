import api from "../api/axios";

export const getProjects = () => api.get("/projects");

export const addProject = (project) => api.post("/projects", project);

