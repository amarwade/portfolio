import { useMemo, useEffect, useState } from "react";
import { useScrollReveal } from "./hooks/useScrollReveal";
import HeroSection from "./components/HeroSection";
import ExperienceSection from "./components/ExperienceSection";
import FormationSection from "./components/FormationSection";
import CertificationsSection from "./components/CertificationsSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import {
  profileData,
  skillsByCategory,
  formationData,
  certificationData,
  experienceData,
} from "./data/portfolioData";

function App() {
  useScrollReveal();
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
      return;
    }

    const supportsMatchMedia = typeof window.matchMedia === "function";
    const prefersDark = supportsMatchMedia
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : true;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const navLinks = useMemo(
    () => [
      { href: "#about", label: "A propos" },
      { href: "#experience", label: "Experience" },
      { href: "#formation", label: "Formation" },
      { href: "#certifications", label: "Certifications" },
      { href: "#skills", label: "Competences" },
      { href: "#projects", label: "Projets" },
      { href: "#contact", label: "Contact" },
    ],
    []
  );

  return (
    <>
      <div className="page-atmosphere" aria-hidden="true">
        <div className="page-atmosphere__orb page-atmosphere__orb--1" />
        <div className="page-atmosphere__orb page-atmosphere__orb--2" />
        <div className="page-atmosphere__orb page-atmosphere__orb--3" />
        <div className="page-atmosphere__grid" />
      </div>
      <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Aller au contenu
      </a>
      <header className="topbar">
        <a className="brand" href="#top">
          {profileData.name}
        </a>
        <nav className="nav" aria-label="Navigation principale">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <button
          className="theme-toggle"
          type="button"
          onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
          aria-label={theme === "dark" ? "Activer le thème clair" : "Activer le thème sombre"}
          aria-pressed={theme === "light"}
          title={theme === "dark" ? "Thème clair" : "Thème sombre"}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </header>

      <main id="main-content" tabIndex={-1}>
        <HeroSection profile={profileData} />
        <ExperienceSection items={experienceData} />
        <FormationSection items={formationData} />
        <CertificationsSection items={certificationData} />
        <SkillsSection categories={skillsByCategory} />
        <ProjectsSection />
        <ContactSection />
      </main>
      </div>
    </>
  );
}

export default App;