# Technologies utilisees dans le projet

Ce document explique les technologies du projet, leur role, et la maniere dont elles sont utilisees concretement.

## 1) Frontend

### React
- **Role**: construire l'interface utilisateur du portfolio.
- **Comment je l'ai utilise**:
  - application SPA avec composants pour chaque section (hero, experience, formation, certifications, competences, projets, contact),
  - gestion d'etat locale avec hooks (`useState`, `useEffect`, `useMemo`),
  - rendu principal via `frontend/src/App.js`.

### Create React App (`react-scripts`)
- **Role**: outillage frontend (serveur dev, build, tests).
- **Comment je l'ai utilise**:
  - `npm start` pour developper en local,
  - `npm run build` pour produire le build de production,
  - `npm test` pour executer les tests.

### Axios
- **Role**: communication HTTP entre frontend et backend.
- **Comment je l'ai utilise**:
  - creation d'une instance centralisee dans `frontend/src/api/axios.js`,
  - base URL configurable via `REACT_APP_API_BASE_URL`,
  - ajout automatique du header `Authorization: Bearer <token>` via interceptor.

### React Router DOM (installe)
- **Role**: gestion de routes frontend.
- **Comment je l'ai utilise**:
  - dependance presente dans `frontend/package.json`,
  - peut servir pour exposer une route admin/login si necessaire.

### Testing Library + Jest DOM + User Event
- **Role**: tests frontend orientes comportement utilisateur.
- **Comment je l'ai utilise**:
  - tests executes en CI via `npm test -- --watchAll=false`,
  - base de tests deja en place dans le dossier `frontend/src`.

### Web Vitals
- **Role**: mesure de performance web.
- **Comment je l'ai utilise**:
  - integration par defaut CRA (fichier `reportWebVitals`), utile pour suivi qualite/perf.

## 2) Backend

### Java 17
- **Role**: langage principal du backend.
- **Comment je l'ai utilise**:
  - base du projet Spring Boot avec configuration Maven (`java.version=17`).

### Spring Boot 3.3
- **Role**: framework principal pour construire l'API REST.
- **Comment je l'ai utilise**:
  - demarrage rapide de l'application,
  - configuration centralisee,
  - exposition des endpoints (`/api/projects`, `/api/contact`, `/api/auth/login`).

### Spring Web
- **Role**: creation de controllers REST.
- **Comment je l'ai utilise**:
  - controllers pour auth, projets et contact,
  - mapping des routes HTTP et serialisation JSON.

### Spring Data JPA + Hibernate
- **Role**: acces base de donnees via repository/entites.
- **Comment je l'ai utilise**:
  - entites metier (`Project`, `ContactMessage`, `User`),
  - repositories JPA pour lire/sauvegarder les donnees.

### PostgreSQL
- **Role**: base relationnelle persistante.
- **Comment je l'ai utilise**:
  - stockage des projets, messages de contact et utilisateurs,
  - connexion via `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`.

### Flyway
- **Role**: versionner et appliquer les migrations SQL.
- **Comment je l'ai utilise**:
  - scripts dans `backend/src/main/resources/db/migration`,
  - baseline schema + evolution des colonnes + seed de projets.

### Spring Security
- **Role**: proteger les routes backend et gerer l'authentification.
- **Comment je l'ai utilise**:
  - routes publiques (`auth`, `contact`, lecture projets),
  - routes proteges admin (`POST /api/projects`),
  - config dans `backend/src/main/java/com/portfolio/backend/security/SecurityConfig.java`.

### JWT (JJWT)
- **Role**: authentification stateless via token.
- **Comment je l'ai utilise**:
  - generation token au login,
  - verification token sur chaque requete via `JwtFilter`,
  - extraction utilisateur et injection dans `SecurityContext`.

### BCrypt
- **Role**: hash de mot de passe cote backend.
- **Comment je l'ai utilise**:
  - `BCryptPasswordEncoder` dans la configuration securite.

### Spring Validation
- **Role**: validation des donnees entrantes.
- **Comment je l'ai utilise**:
  - annotations (`@NotBlank`, `@Size`, `@Email`) sur DTO/modeles,
  - `@Valid` dans les controllers pour bloquer les payloads invalides.

### Spring Mail
- **Role**: envoi d'email de notification pour le formulaire contact.
- **Comment je l'ai utilise**:
  - envoi conditionnel selon variables d'environnement (`MAIL_ENABLED`, `MAIL_*`),
  - integration dans `ContactService`.

### Lombok
- **Role**: reduire le code boilerplate Java.
- **Comment je l'ai utilise**:
  - generation auto de getters/setters/constructeurs sur plusieurs modeles.

### Spring Boot DevTools
- **Role**: confort developpement (redemarrage rapide).
- **Comment je l'ai utilise**:
  - actif en local pour iterer plus vite.

## 3) Qualite et tests

### Spring Boot Starter Test
- **Role**: outillage de test backend (JUnit, Mockito, etc.).
- **Comment je l'ai utilise**:
  - tests de services backend (ex: contact/projets),
  - execution via `./mvnw test` ou `.\mvnw.cmd test`.

### CI GitHub Actions
- **Role**: verification automatique a chaque push/PR.
- **Comment je l'ai utilise**:
  - job backend: setup Java 17 + tests Maven,
  - job frontend: setup Node 20 + `npm ci` + tests + build,
  - workflow defini dans `.github/workflows/ci.yml`.

## 4) Outils de build et execution

### Maven Wrapper (`mvnw` / `mvnw.cmd`)
- **Role**: executer Maven sans installation globale.
- **Comment je l'ai utilise**:
  - commandes backend standardisees en local et en CI.

### npm
- **Role**: gestion des dependances et scripts frontend.
- **Comment je l'ai utilise**:
  - installation reproductible avec `npm ci`,
  - scripts `start`, `test`, `build`.

## 5) Configuration et securite environnement

### Variables d'environnement
- **Role**: separer config sensible du code source.
- **Comment je l'ai utilise**:
  - configuration runtime pour DB/JWT/mail,
  - modele fourni dans `backend/.env.example`,
  - aucune valeur sensible ne doit etre commit.

---

## Resume architecture

- **Frontend React**: experience utilisateur et affichage du contenu portfolio.
- **Backend Spring Boot**: API, validation, securite JWT, logique metier.
- **PostgreSQL**: persistence des donnees.
- **Flyway**: evolution controlee du schema SQL.
- **CI GitHub Actions**: garde-fou qualite avant integration.
