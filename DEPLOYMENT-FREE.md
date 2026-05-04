# Guide de Déploiement Gratuit (Étudiants)

Ce guide vous explique comment déployer votre portfolio gratuitement en utilisant des services cloud gratuits.

## Architecture du Déploiement Gratuit

- **Frontend (React)**: Vercel (gratuit)
- **Backend (Spring Boot)**: Render (gratuit)
- **Base de données (PostgreSQL)**: Neon (gratuit)

## Prérequis

- Un compte GitHub
- Un nom de domaine (optionnel, vous pouvez utiliser les sous-domaines gratuits)

## Étape 1: Préparer le Repository

### Séparer Frontend et Backend

Créez deux repositories séparés sur GitHub:
1. `portfolio-frontend` - contient le dossier `frontend/`
2. `portfolio-backend` - contient le dossier `backend/`

### Structure du repository Frontend
```
portfolio-frontend/
├── public/
├── src/
├── package.json
├── Dockerfile (optionnel pour Vercel)
└── vercel.json (configuration)
```

### Structure du repository Backend
```
portfolio-backend/
├── src/
├── pom.xml
└── Dockerfile (optionnel pour Render)
```

## Étape 2: Configurer la Base de Données (Neon)

### 1. Créer un compte Neon
- Allez sur https://neon.tech
- Créez un compte gratuit (GitHub ou email)
- Créez un nouveau projet "portfolio"

### 2. Obtenir les informations de connexion
Dans le dashboard Neon:
- Copiez la **Connection String** (format: `postgresql://user:password@host/dbname`)
- Notez les informations:
  - Database name
  - Username
  - Password
  - Host

### 3. Configurer Flyway
Ajoutez ces variables dans votre configuration backend (plus tard sur Render):
```
DB_URL=jdbc:postgresql://your-neon-host/your-db?sslmode=require
DB_USERNAME=your-username
DB_PASSWORD=your-password
```

## Étape 3: Déployer le Frontend sur Vercel

### 1. Créer un compte Vercel
- Allez sur https://vercel.com
- Connectez-vous avec GitHub

### 2. Importer le projet
- Cliquez sur "Add New Project"
- Sélectionnez votre repository `portfolio-frontend`
- Cliquez sur "Import"

### 3. Configuration du projet
Vercel détectera automatiquement que c'est un projet React.

**Framework Preset**: Create React App

**Environment Variables**:
```
REACT_APP_API_BASE_URL=https://votre-backend-url.onrender.com/api
```

### 4. Déployer
- Cliquez sur "Deploy"
- Attendez quelques minutes
- Vercel vous donnera une URL: `https://portfolio-frontend.vercel.app`

### 5. Configuration avancée (optionnel)
Créez un fichier `vercel.json` à la racine du frontend:
```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://votre-backend-url.onrender.com/api/:path*"
    }
  ]
}
```

## Étape 4: Déployer le Backend sur Render

### 1. Créer un compte Render
- Allez sur https://render.com
- Connectez-vous avec GitHub

### 2. Créer un nouveau Web Service
- Cliquez sur "New" → "Web Service"
- Sélectionnez votre repository `portfolio-backend`
- Configurez les options:

**Name**: `portfolio-backend`

**Environment**: Docker (si vous avez un Dockerfile) ou Java

**Build Command**:
```bash
./mvnw clean package -DskipTests
```

**Start Command**:
```bash
java -jar target/*.jar
```

### 3. Variables d'environnement
Ajoutez ces variables dans la section "Environment":

```bash
# Base de données Neon
DB_URL=jdbc:postgresql://your-neon-host/your-db?sslmode=require
DB_USERNAME=your-username
DB_PASSWORD=your-password

# Configuration JWT
JWT_SECRET=votre-secret-jwt-base64
JWT_EXPIRATION_MS=86400000

# Configuration serveur
SERVER_PORT=8080
DDL_AUTO=update
SHOW_SQL=false
SPRING_FLYWAY_ENABLED=true

# Email (optionnel)
MAIL_ENABLED=false
```

### 4. Déployer
- Cliquez sur "Create Web Service"
- Render déploiera automatiquement votre backend
- Vous obtiendrez une URL: `https://portfolio-backend.onrender.com`

### 5. Note importante sur Render
- Le service gratuit s'endort après 15 minutes d'inactivité
- Le premier chargement peut prendre 30-60 secondes (cold start)
- Pour éviter cela, vous pouvez utiliser un service de ping gratuit (voir étape 6)

## Étape 5: Configurer le CORS dans le Backend

Modifiez votre `SecurityConfig.java` pour autoriser Vercel:

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**", "/api/projects", "/api/skills").permitAll()
                .anyRequest().authenticated()
            )
            .cors(cors -> cors.configurationSource(corsConfigurationSource()));
        
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList(
            "https://portfolio-frontend.vercel.app",
            "http://localhost:3000"
        ));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

## Étape 6: Maintenir le Backend Actif (Optionnel)

Pour éviter le cold start de Render, utilisez un service de ping gratuit:

### Option 1: UptimeRobot (gratuit)
1. Allez sur https://uptimerobot.com
2. Créez un compte gratuit
3. Ajoutez un nouveau monitor:
   - Type: HTTP
   - URL: `https://portfolio-backend.onrender.com/api/projects`
   - Monitoring Interval: 5 minutes

### Option 2: Ping service gratuit
Utilisez https://cron-job.org pour pinger votre backend toutes les 10 minutes.

## Étape 7: Configurer un Domaine Personnalisé (Optionnel)

### Pour Vercel
1. Allez dans les settings de votre projet Vercel
2. Cliquez sur "Domains"
3. Ajoutez votre domaine (ex: `votre-nom.com`)
4. Suivez les instructions DNS fournies par Vercel

### Pour Render
1. Allez dans les settings de votre service Render
2. Cliquez sur "Custom Domains"
3. Ajoutez votre domaine
4. Configurez le DNS selon les instructions

## Étape 8: Tester le Déploiement

### 1. Tester le Backend
```bash
curl https://portfolio-backend.onrender.com/api/projects
```

### 2. Tester le Frontend
Ouvrez votre URL Vercel dans le navigateur.

### 3. Tester l'authentification
- Créez un compte sur l'application
- Vérifiez que vous pouvez vous connecter

## Limitations des Plans Gratuits

### Vercel (Hobby Plan - Gratuit)
- ✅ Déploiements illimités
- ✅ Bande passante: 100GB/mois
- ✅ Build time: 6000 minutes/mois
- ❌ Pas de fonctions serverless personnalisées

### Render (Free Plan)
- ✅ 1 web service gratuit
- ✅ 512MB RAM
- ✌ 15 minutes d'inactivité = sleep
- ❌ Bande passante limitée
- ❌ Pas de support prioritaire

### Neon (Free Plan)
- ✅ 1 projet gratuit
- ✅ 0.5GB de stockage
- ✅ 100 heures de compute/mois
- ❌ Connexion limitée

## Alternative: GitHub Pages (Frontend uniquement)

Si vous ne voulez utiliser que le frontend (sans backend):

### 1. Configurer pour GitHub Pages
Dans `package.json`:
```json
{
  "homepage": "https://votre-username.github.io/portfolio-frontend"
}
```

### 2. Installer gh-pages
```bash
npm install gh-pages --save-dev
```

### 3. Ajouter script de déploiement
Dans `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

### 4. Déployer
```bash
npm run deploy
```

## Alternative: Railway (pour Backend)

Railway est une alternative à Render avec un plan gratuit similaire.

1. Créez un compte sur https://railway.app
2. Importez votre repository backend
3. Ajoutez un service PostgreSQL
4. Configurez les variables d'environnement
5. Déployez

## Monitoring et Logs

### Vercel
- Allez dans l'onglet "Logs" de votre projet
- Les logs sont conservés pendant 24-48 heures

### Render
- Allez dans l'onglet "Logs" de votre service
- Les logs sont conservés pendant 7 jours

### Neon
- Allez dans le dashboard Neon
- Consultez les logs SQL

## Mise à jour

### Pour mettre à jour le frontend
```bash
git push origin main
# Vercel déploie automatiquement
```

### Pour mettre à jour le backend
```bash
git push origin main
# Render déploie automatiquement
```

## Support et Ressources

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **Neon Docs**: https://neon.tech/docs
- **GitHub Pages**: https://docs.github.com/pages

## Prochaines étapes (quand vous aurez un budget)

1. Migrer vers un VPS (DigitalOcean, Hetzner)
2. Utiliser un CDN pour les assets statiques
3. Configurer un monitoring avancé (Sentry, Datadog)
4. Mettre en place des backups automatiques
5. Configurer une CI/CD plus robuste
