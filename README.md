# INFAL26 — Introduction aux API REST

Support d'exercice pour un module de formation (CESI). Les participants implémentent une mini API REST de gestion d'utilisateurs à partir d'un squelette (routes, contrôleurs, store) et d'un sujet précis. Seule la route de santé `GET /test` est fournie ; le CRUD `/users` est à concevoir et coder par eux, avec critères de validation et codes HTTP imposés.

L'exercice vise l'application concrète de la sémantique REST (méthodes, statuts), la distinction PUT / PATCH, et une structure de projet claire (séparation des responsabilités). Pas de base de données : stockage en mémoire pour rester focalisé sur l'API.

---

## 1. Contexte

**Problème adressé :** après un cours théorique sur les API REST, les apprenants doivent mettre en pratique sans solution clé en main. Il faut un cadre contraint (endpoints imposés, codes HTTP, PUT vs PATCH) et une arborescence définie pour que l'évaluation porte sur la compréhension et l'implémentation, pas sur les choix de design. Le sujet inclut validation des entrées, gestion d'erreurs (404, 400, 422) et documentation (ressources pour Express, MDN).

---

## 2. Stack technique

| Couche             | Technologie                                  |
| ------------------ | -------------------------------------------- |
| Runtime            | Node.js (version fixée par `.nvmrc`)         |
| Framework HTTP     | Express 4.x                                  |
| Gestion de paquets | pnpm                                         |
| Dev                | nodemon (hot reload)                         |
| Stockage           | Mémoire (tableau JS), pas de base de données |

---

## 3. Architecture

```
├── index.js              # Point d'entrée : Express, express.json(), montage des routeurs
├── routes/
│   ├── test.js           # GET /test → contrôleur test (exemple fourni)
│   └── users.js          # 6 routes /users → délégation au contrôleur users
├── controllers/
│   ├── test.js           # Handler GET /test (réponse 200 JSON)
│   └── users.js          # Logique CRUD : getAll, getById, create, updatePartial, updateFull, remove
├── data/
│   └── store.js          # Store en mémoire + helpers (getUserById, addUser, updateUser, deleteUser)
└── middlewares/
    └── requestLogger.js  # Optionnel (exemple pour aller plus loin)
```

- **Routes :** uniquement le mapping méthode + chemin → handler du contrôleur. Aucune logique métier.
- **Contrôleurs :** lecture/écriture du store, validation des entrées, choix du code HTTP, `res.status(...).json(...)`.
- **Store :** tableau d'utilisateurs, génération d'id unique, API interne (getUsers, getUserById, addUser, updateUser, deleteUser) consommée par le contrôleur.

---

## 4. Choix techniques et justifications

| Choix                                  | Justification                                                                                                                                                          |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Séparation routes / contrôleurs / data | Lisibilité, testabilité, alignement avec les bonnes pratiques backend. Les routes restent déclaratives.                                                                |
| Stockage en mémoire                    | Pas de dépendance DB ; focus sur le contrat HTTP et la structure du code. Suffisant pour une séance d'exercice.                                                        |
| PUT vs PATCH au programme              | Mise en avant de la sémantique REST : PUT = remplacement complet (tous champs requis), PATCH = mise à jour partielle. Critères de validation explicites dans le sujet. |
| Squelette + sujet sans solution        | Évaluation de l'autonomie et de la capacité à lire la doc (liens fournis : Express, MDN).                                                                              |
| pnpm + nvm                             | Cohérence avec un environnement pro (pnpm pour la perf et le lockfile, .nvmrc pour reproductibilité).                                                                  |

---

## 5. Points complexes / challenges techniques

- **Distinction PUT / PATCH** : le sujet impose que PUT exige `nom`, `email`, `age` (sinon 400/422) et que PATCH n'applique que les champs présents dans le corps. La validation et le comportement du store (update partiel vs remplacement) doivent refléter cette différence.
- **Codes HTTP cohérents** : 201 pour POST, 204 pour DELETE, 400/404/422 selon le cas (données invalides, ressource absente, contraintes métier). Les critères de validation listent les cas attendus.
- **Validation des entrées** : types, champs requis pour PUT, unicité d'email, âge positif. À faire dans le contrôleur (ou via un middleware optionnel dans "aller plus loin").

---

## 6. Sécurité / performance

Pour ce support pédagogique (exécution locale, pas d'exposition publique) : pas d'auth, pas de rate limiting. Le sujet mentionne la nécessité de valider les entrées et d'éviter de renvoyer 500 pour des erreurs métier. En "aller plus loin", possibilité d’ajouter un middleware de validation ou un 404 global. Performance hors scope (pas de volumétrie).

---

## 7. Déploiement / infra

Usage local uniquement. Pas de déploiement ni d’infra décrite. Démarrage : `nvm use`, `pnpm install`, `pnpm dev` (port par défaut 3000). `.nvmrc` et `package.json` suffisent pour reproduire l’environnement.

---

## Sujet et instructions pour les participants

Le sujet détaillé (objectifs, endpoints attendus, contraintes PUT/PATCH, codes HTTP, structure des données, critères de validation, indications de test, erreurs à éviter, aller plus loin, auto-évaluation) est dans **[SUJET.md](./SUJET.md)**.

**Démarrage rapide :** `nvm use` → `pnpm install` → `pnpm dev`. Vérifier que `GET http://localhost:3000/test` renvoie `200` et un JSON de santé avant de commencer l’implémentation des routes `/users`.
