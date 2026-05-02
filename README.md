# Portfolio — Amar WADE

Site vitrine full-stack (**React** + **Spring Boot**) pour candidatures (alternance / stage).  
Le frontend est public. Le backend expose une API projets/contact et un endpoint d'authentification admin.

[![CI](https://github.com/amarwade/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/amarwade/portfolio/actions/workflows/ci.yml)

## Stack

| Couche | Technologies |
|---|---|
| Frontend | React (CRA), axios |
| Backend | Spring Boot 3.3, Java 17, Spring Security, JWT, JPA |
| Database | PostgreSQL |
| Migrations | Flyway |

## Structure du depot

```text
portfolio/
├── backend/
│   ├── src/main/java/
│   ├── src/main/resources/
│   │   └── db/migration/
│   ├── scripts/
│   └── .env.example
├── frontend/
│   ├── public/
│   └── src/
└── README.md
```

## Prerequis

- Node.js 18+
- Java 17
- PostgreSQL

## Variables d'environnement

### Backend

Copier `backend/.env.example` et definir des valeurs locales (sans commit de secrets).

Variables principales :

- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`
- `JWT_SECRET` (base64, 32+ bytes avant encodage)
- `JWT_EXPIRATION_MS`
- `MAIL_ENABLED`, `MAIL_TO`, `MAIL_FROM`, `MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD`
- `DDL_AUTO` (par defaut `validate`)
- `SHOW_SQL` (par defaut `false`)

### Frontend

- `REACT_APP_API_BASE_URL` (ex: `http://localhost:8081/api`)

## Lancer en local

### 1) Configurer PostgreSQL

- Creer la base `portfolio_db`.
- Definir `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` dans le terminal avant demarrage.

### 2) Definir une cle JWT valide

`JWT_SECRET` est obligatoire et doit etre suffisamment forte pour HS256.

Exemple PowerShell :

```powershell
$bytes = New-Object byte[] 32
[System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
$env:JWT_SECRET = [Convert]::ToBase64String($bytes)
```

### 3) Demarrer le backend

```powershell
cd backend
$env:DB_URL="jdbc:postgresql://localhost:5432/portfolio_db"
$env:DB_USERNAME="postgres"
$env:DB_PASSWORD="your_password"
.\mvnw.cmd spring-boot:run
```

Backend disponible sur `http://localhost:8081`.

### 4) Demarrer le frontend

```powershell
cd frontend
npm ci
npm start
```

Frontend disponible sur `http://localhost:3000`.

## Endpoints API (resume)

| Methode | Route | Acces |
|---|---|---|
| `GET` | `/api/projects` | Public |
| `POST` | `/api/projects` | Admin (JWT) |
| `POST` | `/api/contact` | Public |
| `POST` | `/api/auth/login` | Public (retourne JWT) |

## Notes importantes

- Le portfolio visiteur n'a pas besoin de login public.
- La page login frontend peut servir a un usage admin interne.
- `backend/.env.example` est un modele ; il n'est pas charge automatiquement par Spring.
- Si Flyway echoue avec `Unsupported Database` (ex: PostgreSQL 18.x), utilisez une version supportee de Postgres (16/17) ou mettez a jour la stack Flyway.

## Scripts utiles

### Backend

- `.\mvnw.cmd test`  
- `.\mvnw.cmd spring-boot:run`

### Frontend

- `npm test -- --watchAll=false`
- `npm run build`

## Securite

- Ne jamais committer de secrets (`DB_PASSWORD`, `JWT_SECRET`, `MAIL_PASSWORD`).
- Utiliser des variables d'environnement par environnement (local/staging/prod).
- Adapter CORS en production dans `backend/src/main/java/com/portfolio/backend/security/SecurityConfig.java`.

## Licence / usage

Projet personnel / academique, consultable pour candidature et presentation de competences.

