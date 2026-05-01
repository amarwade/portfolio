import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./services/projectService", () => ({
  getProjects: jest.fn(() => Promise.resolve({ data: [] })),
}));

jest.mock("./services/contactService", () => ({
  sendContactMessage: jest.fn(() => Promise.resolve({})),
}));

test("renders portfolio sections", async () => {
  render(<App />);
  expect(screen.getByRole("heading", { level: 1, name: /Amar WADE/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /^Formation$/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Certifications/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Expérience professionnelle/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Compétences/i })).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { level: 3, name: /Langages de programmation/i })
  ).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Projets/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Contact/i })).toBeInTheDocument();
});
