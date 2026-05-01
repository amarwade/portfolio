---
name: Portfolio Stage React Spring
overview: Construire un portfolio orienté stage avec un frontend React soigné et un backend Spring Boot utile mais léger, en priorisant une V1 rapide puis des itérations de qualité.
todos:
  - id: stabiliser-socle
    content: Harmoniser sécurité/config backend et préparer l’environnement de dev
    status: completed
  - id: definir-contenu
    content: Structurer les sections portfolio et formaliser les données projets
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

# Plan de réalisation du portfolio (stage)

## Objectif
Créer un portfolio clair, moderne et crédible pour candidatures de stage, avec un frontend React principal et un backend Spring Boot pour gérer les données/projets et un formulaire de contact.

## Portée V1 (livrable rapide)
- **Frontend**: page d’accueil, à propos, compétences, projets, contact.
- **Backend**: API projets (lecture publique), API contact (enregistrement + validation).
- **Données**: 3 à 6 projets réels avec descriptions, stack et liens.
- **Design**: responsive, sobre, lisible, CTA vers CV/GitHub/LinkedIn.

## Implémentation par étapes

### 1) Stabiliser le socle existant
- Harmoniser la sécurité backend (routes publiques/privées cohérentes).
- Préparer la configuration via variables d’environnement (DB/JWT).
- Vérifier scripts de démarrage front/back pour développement local.

Fichiers ciblés:
- [backend/src/main/java/com/portfolio/backend/security/SecurityConfig.java](backend/src/main/java/com/portfolio/backend/security/SecurityConfig.java)
- [backend/src/main/java/com/portfolio/backend/security/JwtUtil.java](backend/src/main/java/com/portfolio/backend/security/JwtUtil.java)
- [backend/src/main/resources/application.properties](backend/src/main/resources/application.properties)

### 2) Définir le contenu “recruteur-first”
- Structurer les sections et le storytelling (qui tu es, ce que tu sais faire, preuves).
- Formaliser les données projets (titre, problème, solution, impact, stack, liens).
- Préparer les textes courts et concrets pour chaque section.

Fichiers ciblés:
- [frontend/src/pages/ProjectsPage.js](frontend/src/pages/ProjectsPage.js)
- [frontend/src/pages/LoginPage.js](frontend/src/pages/LoginPage.js) (à réévaluer selon besoin)
- [README.md](README.md)

### 3) Construire la V1 frontend
- Mettre en place une page unique ou multi-sections avec navigation claire.
- Ajouter composants réutilisables (Hero, ProjectCard, SkillBadge, ContactForm).
- Connecter l’API projets pour affichage dynamique.

Fichiers probables:
- [frontend/src/App.js](frontend/src/App.js)
- [frontend/src/services/projectService.js](frontend/src/services/projectService.js)
- [frontend/src/api/axios.js](frontend/src/api/axios.js)
- `frontend/src/components/*` (nouveaux fichiers)

### 4) Ajouter la brique contact backend
- Créer endpoint `POST /api/contact` avec validation serveur.
- Journaliser/stockage basique (DB) pour démontrer la compétence backend.
- Gérer retours d’erreurs propres côté frontend.

Fichiers probables:
- `backend/src/main/java/com/portfolio/backend/controller/ContactController.java` (nouveau)
- `backend/src/main/java/com/portfolio/backend/service/ContactService.java` (nouveau)
- `backend/src/main/java/com/portfolio/backend/model/ContactMessage.java` (nouveau)
- `backend/src/main/java/com/portfolio/backend/repository/ContactRepository.java` (nouveau)

### 5) Qualité minimale avant diffusion
- Tests ciblés (API projets/contact + rendu sections clés front).
- README racine clair (setup, variables d’env, commandes, architecture).
- Préparer un flux de déploiement simple (frontend + backend).

Fichiers ciblés:
- [frontend/src/App.test.js](frontend/src/App.test.js)
- [backend/src/test/java/com/portfolio/backend/BackendApplicationTests.java](backend/src/test/java/com/portfolio/backend/BackendApplicationTests.java)
- [README.md](README.md)

## Priorités d’exécution
- **P1**: V1 frontend + données projets réelles + cohérence sécurité backend.
- **P2**: formulaire contact connecté API.
- **P3**: tests améliorés + documentation + polishing UI.

## Critères de succès
- Un recruteur comprend ton profil en moins de 60 secondes.
- Les projets sont concrets, mesurables, avec liens vérifiables.
- Le site est propre sur mobile et desktop.
- Le projet se lance facilement avec une documentation claire.
