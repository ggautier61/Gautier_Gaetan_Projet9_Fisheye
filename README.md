# Fisheye

Projet réalisé dans le cadre de la formation OpenClassrooms "Développeur IA".

## Technologies utilisées

- [Next.js](https://nextjs.org/) 16 (App Router)
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/) 7 avec SQLite
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)

## Installation

### 1) Installer les dépendances

```bash
npm install
```

### 2) Configurer les variables d'environnement

Un fichier `.env` peut être utilisé pour définir l'URL de la base de données. Par défaut, Prisma utilise `file:./dev.db`.

Exemple de `.env` :

```env
DATABASE_URL="file:./dev.db"
```

### 3) Générer la base de données locale à partir des fichiers JSON

Les données sources se trouvent dans `app/src/datas/photographer.json` et `app/src/datas/media.json`. Le seed Prisma (`prisma/seed.ts`) charge ces fichiers et insère les données dans la base SQLite.

Exécutez les commandes dans l'ordre :

```bash
# Générer le client Prisma (dossier generated/prisma)
npm run db:generate

# Créer/appliquer les migrations et générer dev.db
npm run db:migrate

# Peupler la base avec les données issues des fichiers JSON
npm run db:seed
```

Ou en une seule commande (réinitialise complètement la base, relance migrations + seed) :

```bash
npm run db:reset
```

Après exécution, le fichier `dev.db` est créé à la racine du projet avec les tables `Photographer` et `Media`.

### 4) Lancer le serveur de développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur.

## Scripts disponibles

| Script | Description |
| --- | --- |
| `npm run dev` | Démarre le serveur de développement Next.js |
| `npm run build` | Build de production |
| `npm run start` | Démarre le serveur en mode production |
| `npm run lint` | Vérification ESLint |
| `npm run db:generate` | Génère le client Prisma dans `generated/prisma` |
| `npm run db:migrate` | Crée et applique une migration Prisma |
| `npm run db:seed` | Exécute le seed pour insérer les données depuis les JSON |
| `npm run db:reset` | Réinitialise la base (supprime, migre, seed) |
| `npm run db:studio` | Ouvre Prisma Studio pour visualiser les données |

## Structure de la base de données

- `Photographer` : informations des photographes (nom, ville, pays, tagline, prix, portrait)
- `Media` : médias associés à un photographe (titre, image/vidéo, likes, date, prix). Relation 1:N avec `Photographer`
