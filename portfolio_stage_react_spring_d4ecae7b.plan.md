---
name: Portfolio Stage React Spring
overview: Construire un portfolio orienté stage avec un frontend React propre et un backend Spring Boot robuste, en priorisant une V1 recruteur-ready puis une montée en qualité.
todos:
  - id: securiser-config
    content: Finaliser la configuration securisee backend (JWT/DB/mail) et fiabiliser le demarrage local
    status: completed
  - id: stabiliser-db-migrations
    content: Stabiliser Flyway + compatibilite PostgreSQL locale et corriger les points bloquants de migration
    status: pending
  - id: clarifier-experience-front
    content: Clarifier routing frontend (portfolio public vs login admin) et nettoyer les ecrans non branches
    status: pending
  - id: qualite-tests-ci
    content: Renforcer la CI et les tests critiques backend/frontend
    status: pending
  - id: finaliser-docs-deploiement
    content: Finaliser README, documentation d'environnement et checklists de deploiement
    status: pending
  - id: definir-contenu
    content: Structurer les sections portfolio et formaliser les donnees projets
    status: completed
  - id: build-v1-frontend
    content: Implémenter la V1 React responsive avec sections clés
    status: completed
  - id: contact-api
    content: Créer l’API de contact Spring et la connecter au frontend
    status: completed
  - id: qualite-docs
    content: Ajouter tests essentiels et améliorer le README de lancement
    status: completed
isProject: false
---

# Plan de realisation du portfolio (stage)

## Objectif
Creer un portfolio clair, moderne et credible pour candidatures de stage, avec:
- un frontend public oriente recruteur,
- un backend Spring Boot securise,
- une exploitation simple en local et en deploiement.

## Portee V1 (livrable rapide)
- **Frontend**: page d’accueil, à propos, compétences, projets, contact.
- **Backend**: API projets (lecture publique, creation admin), API contact (validation + enregistrement).
- **Donnees**: 3 a 6 projets reels avec descriptions, stack et liens.
- **Design**: responsive, sobre, lisible, CTA vers CV/GitHub/LinkedIn.

## Etat actuel (snapshot)
- V1 frontend livree et connectee aux APIs principales.
- Endpoint contact backend implemente et teste.
- README principal remis a niveau.
- Durcissement securite entame (secrets sortis des valeurs hardcodees).
- Point ouvert majeur: demarrage local selon version PostgreSQL/Flyway.

## Plan d'implementation par etapes

### 1) Securiser et stabiliser le backend
- Garder une configuration sans secrets versionnes.
- Rendre obligatoire la presence de `JWT_SECRET` en local/prod via env.
- Standardiser l'initialisation locale (`DB_*`, `JWT_*`, `MAIL_*`).
- Verifier le comportement startup en cas de variables manquantes (message clair).

Fichiers cibles:
- [backend/.env.example](backend/.env.example)
- [backend/src/main/resources/application.properties](backend/src/main/resources/application.properties)
- [backend/src/main/java/com/portfolio/backend/security/JwtUtil.java](backend/src/main/java/com/portfolio/backend/security/JwtUtil.java)

### 2) Stabiliser database et migrations
- Valider la strategie Flyway selon version PostgreSQL locale.
- Choisir l'une des approches:
  - mettre a jour Flyway/database plugin,
  - ou utiliser PostgreSQL LTS local supporte.
- Garantir des migrations idempotentes et reproductibles.

Fichiers cibles:
- [backend/pom.xml](backend/pom.xml)
- [backend/src/main/resources/db/migration/V1__init_schema.sql](backend/src/main/resources/db/migration/V1__init_schema.sql)
- [backend/src/main/resources/db/migration/V2__project_columns_text.sql](backend/src/main/resources/db/migration/V2__project_columns_text.sql)
- [backend/src/main/resources/db/migration/V3__seed_projects.sql](backend/src/main/resources/db/migration/V3__seed_projects.sql)

### 3) Clarifier l'experience frontend
- Garder le portfolio visiteur sans login obligatoire.
- Decider du sort de `LoginPage`:
  - soit route admin explicite (`/admin/login`),
  - soit retrait temporaire si non utilisee.
- Uniformiser les etats `loading/error/empty` sur les appels API.

Fichiers cibles:
- [frontend/src/App.js](frontend/src/App.js)
- [frontend/src/index.js](frontend/src/index.js)
- [frontend/src/pages/LoginPage.js](frontend/src/pages/LoginPage.js)
- [frontend/src/api/axios.js](frontend/src/api/axios.js)
- [frontend/src/services/projectService.js](frontend/src/services/projectService.js)

### 4) Renforcer qualite, tests et CI
- Ajouter tests d'integration backend sur auth/projets/contact.
- Ajouter tests frontend sur parcours critiques.
- Ajouter verification lint/securite dans la CI.

Fichiers cibles:
- [backend/src/test/java/com/portfolio/backend/BackendApplicationTests.java](backend/src/test/java/com/portfolio/backend/BackendApplicationTests.java)
- [backend/src/test/java/com/portfolio/backend/service/ContactServiceTest.java](backend/src/test/java/com/portfolio/backend/service/ContactServiceTest.java)
- [frontend/src/App.test.js](frontend/src/App.test.js)
- [.github/workflows/ci.yml](.github/workflows/ci.yml)

### 5) Finaliser deploiement et credibilite recruteur
- Publier frontend + backend avec variables d'environnement propres.
- Completer README avec URL publiques et captures.
- Ajouter roadmap courte (ameliorations prochaines).

Fichiers cibles:
- [README.md](README.md)
- [frontend/README.md](frontend/README.md)

## Priorites d'execution
- **P0**: Demarrage local fiable (JWT + DB + Flyway/PostgreSQL).
- **P1**: Clarte produit frontend (public vs admin) + robustesse API.
- **P2**: Tests/CI renforces.
- **P3**: Deployment public + polish final.

## Criteres de succes
- Le projet demarre en local en moins de 10 minutes avec doc seule.
- Un recruteur comprend le profil en moins de 60 secondes.
- Les projets affichent des preuves concretes (lien GitHub + contexte + stack).
- Les checks CI principaux passent de facon stable.
- Le deploiement public est fonctionnel avec URL documentees.

## Definition of done (courte)
- [ ] Backend demarre sans erreur de secret JWT ni erreur Flyway
- [ ] Frontend compile et sert les sections principales
- [ ] API projets/contact accessibles en local
- [ ] README coherent avec la procedure reelle
- [ ] CI verte sur `main`

