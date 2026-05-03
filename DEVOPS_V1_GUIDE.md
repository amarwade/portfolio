# DevOps V1 - Guide rapide (avec explications)

Ce guide explique les nouveaux fichiers DevOps ajoutes au projet et comment les utiliser.

## Fichiers ajoutes

- `backend/Dockerfile`
  - Build multi-stage pour le backend Spring Boot.
  - Stage 1: compile le projet avec Maven.
  - Stage 2: lance uniquement le jar dans une image JRE plus legere.

- `frontend/Dockerfile`
  - Build multi-stage pour le frontend React.
  - Stage 1: `npm ci` + `npm run build`.
  - Stage 2: sert les fichiers statiques via Nginx.

- `frontend/nginx.conf`
  - Configuration Nginx pour SPA React.
  - `try_files` permet aux routes frontend de fonctionner (fallback vers `index.html`).

- `docker-compose.yml`
  - Orchestration locale de 3 services:
    - `db` (PostgreSQL 16),
    - `backend` (Spring Boot),
    - `frontend` (Nginx + build React).
  - Variables d'environnement commentees dans le fichier.

## Commandes a executer

## 1) Aller a la racine du projet

```powershell
cd D:\portfolio
```

## 2) Generer une cle JWT base64 (32 bytes)

```powershell
$bytes = New-Object byte[] 32
[System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
[Convert]::ToBase64String($bytes)
```

Copie la valeur et remplace `JWT_SECRET` dans `docker-compose.yml`.

## 3) Lancer toute la stack

```powershell
docker compose up --build
```

Acces:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8081`
- API projets: `http://localhost:8081/api/projects`

## 4) Arreter la stack

```powershell
docker compose down
```

## 5) Arreter et supprimer aussi le volume DB (reset complet)

```powershell
docker compose down -v
```

## Notes importantes

- En local Docker, `MAIL_ENABLED=false` par defaut.
- La DB est ephemere si tu supprimes le volume (`down -v`).
- `SPRING_FLYWAY_ENABLED=true` est force dans `docker-compose.yml` pour executer les migrations.
- Si tu veux utiliser un SMTP reel, complete `MAIL_*` dans `docker-compose.yml` (ou mieux: variables secretes externes).
