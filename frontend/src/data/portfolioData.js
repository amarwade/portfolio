export const profileData = {
  name: "Amar WADE",
  title: "Ingénieur en informatique — Développeur Java / Angular (alternance)",
  eyebrow: "Disponible en alternance · Backend & full stack",
  /** Une phrase d’accroche très visible sous le nom */
  //heroTagline:
    //"Du besoin métier à l’application en production : Java, Spring Boot, APIs sécurisées et produits web maintenables.",
  pitch:
    "Élève ingénieur en informatique, spécialisé en développement Java et Spring Boot, je conçois des applications web sécurisées, performantes et maintenables en appliquant les bonnes pratiques d’architecture logicielle (MVC, SOLID, Design Patterns). Passionné par le développement backend et les systèmes d’information, je recherche une alternance me permettant de contribuer à des projets concrets, d’évoluer dans un environnement technique exigeant et de renforcer mes compétences en ingénierie logicielle, DevOps et transformation digitale.",  /** Place ta photo dans frontend/public/ (ex. photo-profil.jpg) puis mets le bon nom de fichier ici */
  heroImage: "/photo-profil.jpg",
  heroImageAlt: "Amar WADE — développeur Java et applications web",
  location: "62100 Calais, France",
  email: "amarwade927@gmail.com",
  phone: "+33 7 45 65 12 33",
  github: "https://github.com/amarwade",
  linkedin: "https://www.linkedin.com/in/amar-wade",
  cvUrl: "cv-amar-wade.pdf",
  languagesLine: "Français · Anglais · Wolof",
};

export const formationData = [
  {
    id: "eilco",
    period: "2025 – 2026",
    title: "Cycle ingénieur — Informatique",
    institution: "EILCO — École d’ingénieurs du Littoral Côte d’Opale",
  },
  {
    id: "dut",
    period: "2023 – 2025",
    title: "DUT Informatique",
    institution: "ESP — École Supérieure Polytechnique, Dakar (Sénégal)",
    detail: "Mention Bien",
  },
  {
    id: "bac",
    period: "2022 – 2023",
    title: "Baccalauréat scientifique (S2)",
    institution: "Sénégal",
    detail: "Mention Bien",
  },
];

export const certificationData = [
  {
    id: "cyber-unodc",
    name: "Cybercriminalité",
    provider: "UNODC — Nations Unies",
    date: "2026",
  },
  {
    id: "java-udemy",
    name: "Java Masterclass",
    provider: "Udemy",
    date: "en cours",
  },
  {
    id: "huawei-dcnt",
    name: "Data Communication & Network Technology",
    provider: "Huawei Talent Online",
    date: "2024",
  },
];

export const experienceData = [
  {
    id: "intouch",
    period: "2025 • 2 mois",
    title: "Développeur d’application web",
    organization: "InTouch Group — Stage, Sénégal",
    highlights: [
      "Analyse des besoins fonctionnels avec les équipes métiers",
      "Conception et développement d’une application web sécurisée (Spring Boot, Vaadin)",
      "Authentification avec Spring Security et Keycloak (OAuth2)",
      "Conception base MySQL et optimisation des requêtes SQL",
      "API REST — tests avec Postman",
      "Maven, méthode Agile (Scrum), Git / GitHub",
      "Correction d’anomalies en phase de tests et validation",
    ],
  },
];

export const skillsByCategory = [
  {
    id: "languages",
    title: "Langages de programmation",
    items: ["Java", "JavaScript", "PHP", "Python", "C", "SQL", "HTML", "CSS"],
  },
  {
    id: "frameworks",
    title: "Frameworks & technologies",
    items: [
      "Spring Boot",
      "Spring Security",
      "Vaadin Flow",
      "JPA / Hibernate",
      "Keycloak (OAuth2)",
      "REST API",
      "Angular (bases)",
      "Lombok",
    ],
  },
  {
    id: "databases",
    title: "Bases de données",
    items: ["MySQL", "Oracle / PL-SQL"],
  },
  {
    id: "architecture",
    title: "Architecture & bonnes pratiques",
    items: ["MVC", "MVP", "SOLID", "Design patterns"],
  },
  {
    id: "tools",
    title: "Outils & méthodes",
    items: [
      "Maven",
      "Git",
      "GitLab",
      "GitHub",
      "Docker",
      "Postman",
      "Agile (Scrum)",
      "UML",
      "Merise",
    ],
  },
  {
    id: "systems",
    title: "Systèmes",
    items: ["Linux (Ubuntu)", "Windows"],
  },
];
