-- UTF-8. Run: psql -U postgres -d portfolio_db -f insert_projets_academiques.sql
SET client_encoding TO 'UTF8';

ALTER TABLE project ALTER COLUMN description TYPE TEXT;
ALTER TABLE project ALTER COLUMN tech TYPE TEXT;

TRUNCATE TABLE project RESTART IDENTITY CASCADE;

INSERT INTO project (title, description, tech, github_link)
VALUES (
  'Projet blog securise (Java, Spring Boot, Vaadin, MySQL, Keycloak)',
  $p1$
Developpement d'une application web de blog communautaire : utilisateurs, articles et commentaires.
Architecture en couches (MVP/MVC) et principes SOLID pour la maintenabilite.
Authentification securisee avec Spring Security, OAuth2 et Keycloak ; gestion des roles admin / utilisateur.
API REST et optimisation des performances avec la programmation asynchrone (CompletableFuture).
$p1$,
  'Java, Spring Boot, Vaadin, MySQL, Keycloak, OAuth2, Spring Security, REST API, CompletableFuture',
  'https://github.com/amarwade/projet-blog-fin-d-etude'
);

INSERT INTO project (title, description, tech, github_link)
VALUES (
  'Application de gestion de depenses (Java - Console)',
  $p2$
Application Java en ligne de commande pour suivre et gerer les depenses personnelles.
Operations CRUD sur les transactions ; categories et calcul automatique du solde.
Architecture MVC et principes SOLID pour un code clair et evolutif.
$p2$,
  'Java, Console, MVC, SOLID',
  'https://github.com/amarwade/Application-de-gestion-des-depenses-en-console'
);

INSERT INTO project (title, description, tech, github_link)
VALUES (
  'Site web de gestion de tournoi de judo (HTML, CSS, JavaScript, PHP, MySQL)',
  $p3$
Site web pour la gestion d'un tournoi de judo : inscriptions, participants, combats et resultats.
Interface HTML/CSS/JavaScript ; back-end PHP et base de donnees MySQL.
Gestion des utilisateurs et suivi des competitions.
$p3$,
  'HTML, CSS, JavaScript, PHP, MySQL',
  'https://github.com/amarwade/projet-tournois-de-judo'
);

INSERT INTO project (title, description, tech, github_link)
VALUES (
  'Jeu Sudoku (C - Console)',
  $p4$
Jeu de Sudoku en langage C avec interface console : generation, saisie et verification des grilles.
Controle de la validite des lignes, colonnes et sous-grilles 3x3.
Renforcement des competences en algorithmique et programmation procedurale.
$p4$,
  'C, Console, algorithmique',
  'https://github.com/mame-diarr/Projet_Sudoku_ING1'
);

INSERT INTO project (title, description, tech, github_link)
VALUES (
  'Daral Bi - Vente de betail (application web - en cours)',
  $p5$
Plateforme web pour digitaliser la vente de betail entre vendeurs et acheteurs.
Annonces, profils utilisateurs et suivi des transactions ; recherche et filtrage des annonces.
Objectif : moderniser et securiser le marche local du betail.
$p5$,
  'Web, analyse fonctionnelle, equipe (en cours)',
  'https://github.com/m0hameddiagne/Daral-Bi-Vente-de-betails'
);

INSERT INTO project (title, description, tech, github_link)
VALUES (
  'Kassu Resto (gestion de restaurant - C)',
  $p6$
Application en ligne de commande (langage C) pour un restaurant virtuel : affichage du menu, commandes multiples, estimation du temps d'attente et recapitulatif.
Projet de fin de module algorithmique : structuration du code et logique metier simple.
$p6$,
  'C, Console, algorithmique',
  'https://github.com/amarwade/Projet-Kassu-Resto-'
);
