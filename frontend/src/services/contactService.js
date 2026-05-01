import api from "../api/axios";

export const sendContactMessage = (payload) => api.post("/contact", payload);
