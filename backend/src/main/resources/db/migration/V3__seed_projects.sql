INSERT INTO project (title, description, tech, github_link)
SELECT
    'Projet blog securise (Java, Spring Boot, Vaadin, MySQL, Keycloak)',
    'Developpement d''une application web de blog communautaire : utilisateurs, articles et commentaires.
Architecture en couches (MVP/MVC) et principes SOLID pour la maintenabilite.
Authentification securisee avec Spring Security, OAuth2 et Keycloak ; gestion des roles admin / utilisateur.
API REST et optimisation des performances avec la programmation asynchrone (CompletableFuture).',
    'Java, Spring Boot, Vaadin, MySQL, Keycloak, OAuth2, Spring Security, REST API, CompletableFuture',
    'https://github.com/amarwade/projet-blog-fin-d-etude'
WHERE NOT EXISTS (
    SELECT 1 FROM project WHERE github_link = 'https://github.com/amarwade/projet-blog-fin-d-etude'
);

INSERT INTO project (title, description, tech, github_link)
SELECT
    'Application de gestion de depenses (Java - Console)',
    'Application Java en ligne de commande pour suivre et gerer les depenses personnelles.
Operations CRUD sur les transactions ; categories et calcul automatique du solde.
Architecture MVC et principes SOLID pour un code clair et evolutif.',
    'Java, Console, MVC, SOLID',
    'https://github.com/amarwade/Application-de-gestion-des-depenses-en-console'
WHERE NOT EXISTS (
    SELECT 1 FROM project WHERE github_link = 'https://github.com/amarwade/Application-de-gestion-des-depenses-en-console'
);
