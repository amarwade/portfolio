# Portfolio — Amar WADE

Site vitrine full-stack (**React** + **Spring Boot**) pour candidatures (**alternance** / stage). Sections : À propos avec photo, expérience, formation, certifications, compétences par catégories, projets (données API), contact.

[![CI](https://github.com/amarwade/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/amarwade/portfolio/actions/workflows/ci.yml)

| | |
|---|---|
| **Frontend** | Create React App, axios, typo Outfit / DM Sans |
| **Backend** | Spring Boot 3.3, Java 17, Spring Security, JWT, JPA |
| **Base de données** | PostgreSQL |

## Démo

### Démo locale (100 % fonctionnelle)

À exécuter dans l’ordre :

1. Démarrer **PostgreSQL** et créer la base `portfolio_db` (voir section Lancement).
2. Lancer **l’API** : depuis `backend/`, `./mvnw spring-boot:run` — interface sur **`http://localhost:8081`**.
3. Lancer **le site** : depuis `frontend/`, `npm install` puis `npm start` — **`http://localhost:3000`**.

Contrôles rapides :

- Liste des projets : [http://localhost:8081/api/projects](http://localhost:8081/api/projects)
- Page d’accueil avec photo + sections : [http://localhost:3000](http://localhost:3000)

### Démo en ligne (à ajouter après déploiement)

Une fois ton site hébergé, complète ces lignes dans ce README :

| Élément | URL |
|---------|-----|
| **Site (frontend)** | `https://…` |
| **API** *(si séparée)* | `https://…` |

Architecture classique gratuit / low-cost :

- **Frontend** : [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/) ou GitHub Pages (build CRA : `npm run build`, dossier `build/` ; définir `REACT_APP_API_BASE_URL` vers ton API publique).
- **Backend + PostgreSQL** : [Railway](https://railway.app/), [Render](https://render.com/) ou [Fly.io](https://fly.io/) avec une base PostgreSQL managée (**Neon**, **Supabase**, etc.).
- Adapter **CORS** dans `SecurityConfig` pour l’origine exacte du front (sans slash final).

Screenshot optionnel pour le README : ajoute `docs/capture-accueil.png` puis une ligne  

`![Aperçu](docs/capture-accueil.png)` dans cette section.

## Structure du dépôt

```
portfolio/
├── backend/                 # API Spring Boot
│   └── scripts/             # SQL (colonnes projet, inserts projets)
├── frontend/
│   ├── public/             # favicon, photo-profil.jpg, CV PDF…
│   └── src/
│       ├── components/     # sections du portfolio
│       ├── data/            # portfolioData.js (texte hors projets API)
│       └── hooks/           # ex. reveal au scroll
└── README.md
```

## Prérequis

- **Node.js** 18+
- **Java** 17
- **Maven** (ou `backend/mvnw`, `backend/mvnw.cmd`)
- **PostgreSQL** (base créée au préalable, ex. `portfolio_db`)

## Variables d’environnement

### Backend

À définir en production ; ne pas committer de mots de passe réels.

| Variable | Rôle |
|----------|------|
| `DB_URL` | JDBC PostgreSQL *(défaut dans `application.properties` si absent)* |
| `DB_USERNAME` | Utilisateur base |
| `DB_PASSWORD` | Mot de passe base |
| `SERVER_PORT` | Port HTTP *(défaut `8081`)* |
| `JWT_SECRET` | Clé HMAC JWT en **base 64**, taille adaptée HS256 *(obligatoire en prod)* |
| `JWT_EXPIRATION_MS` | Durée de vie du JWT en ms |
| `MAIL_ENABLED` | Active l'envoi d'email sur nouveau message contact (`true`/`false`) |
| `MAIL_TO` | Adresse qui reçoit les messages de contact (ex. `amarwade927@gmail.com`) |
| `MAIL_FROM` | Adresse expéditeur utilisée par l'application |
| `MAIL_HOST` | Serveur SMTP (ex. `smtp.gmail.com`) |
| `MAIL_PORT` | Port SMTP (ex. `587`) |
| `MAIL_USERNAME` | Utilisateur SMTP |
| `MAIL_PASSWORD` | Mot de passe SMTP / mot de passe d'application |
| `MAIL_SMTP_AUTH` | Auth SMTP activée (`true` recommandé) |
| `MAIL_SMTP_STARTTLS` | STARTTLS activé (`true` recommandé) |

Pour le **CORS** en production, adapte [`SecurityConfig`](backend/src/main/java/com/portfolio/backend/security/SecurityConfig.java) (origins autorisées au lieu du seul `localhost:3000`).

Quand `MAIL_ENABLED=true`, chaque `POST /api/contact`:
- enregistre le message en base,
- envoie un email de notification vers `MAIL_TO`,
- définit `Reply-To` à l'email du contact pour répondre directement.

### Frontend

| Variable | Rôle |
|----------|------|
| `REACT_APP_API_BASE_URL` | URL de l’API, ex. `http://localhost:8081/api` *(défaut dans le code si absent)* |

Fichiers statiques à placer sous `frontend/public/` :

- **`photo-profil.jpg`** — photo du hero *(déjà référencée dans [`portfolioData.js`](frontend/src/data/portfolioData.js))*.
- **`cv-amar-wade.pdf`** (ou le nom défini dans `cvUrl`) — lien « Télécharger mon CV ».

## Lancer en local

### 1. Base PostgreSQL

Créer une base (ex. `portfolio_db`) et ajuster les variables `DB_*` si besoin.

### 2. Données des projets (optionnel)

Depuis PostgreSQL :

```bash
psql -U postgres -d portfolio_db -f backend/scripts/fix_project_columns.sql
psql -U postgres -d portfolio_db -f backend/scripts/insert_projets_academiques.sql
```

*(Sous Windows, chemins adaptés ; encodage UTF-8 conseillé, ex. `PGCLIENTENCODING=UTF8`.)*

### 3. Backend

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

Unix / macOS : `./mvnw spring-boot:run`

### 4. Frontend

```powershell
cd frontend
npm install
npm start
```

Ouvrir **`http://localhost:3000`**.

## Scripts utiles

| Commande | Emplacement |
|----------|-------------|
| `npm start` | Frontend — serveur de dev |
| `npm run build` | Frontend — build production |
| `npm test` | Frontend — tests Jest |
| `.\mvnw.cmd test` | Backend — tests Maven |
| `.\mvnw.cmd spring-boot:run` | Backend — API |

## API (résumé)

| Méthode | Route | Accès |
|---------|-------|--------|
| `GET` | `/api/projects` | Public — liste des projets |
| `POST` | `/api/projects` | Authentifié — rôle `ADMIN` |
| `POST` | `/api/contact` | Public — message de contact (validation) |
| `POST` | `/api/auth/login` | Public — JWT |

## Sécurité (rappels)

- Remplacer **`JWT_SECRET`** et les identifiants **DB** pour tout environnement exposé.
- Ne pas pousser de secrets dans Git ; utiliser les variables d’environnement ou un gestionnaire de secrets sur la plateforme d’hébergement.

## Licence / usage

Projet personnel / académique — consultable pour candidature et présentation de compétences.
