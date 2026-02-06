# Mini API REST — Gestion d'utilisateurs

**Exercice pédagogique** — Mise en pratique des notions d’API REST, CRUD et codes HTTP.

---

## 🎯 Objectifs pédagogiques

À l’issue de cet exercice, vous serez capable de :

- Concevoir et implémenter une **API REST** avec Node.js et Express.
- Appliquer le modèle **CRUD** (Create, Read, Update, Delete) de façon cohérente.
- Choisir les **méthodes HTTP** et les **codes de statut** adaptés à chaque action.
- Distinguer clairement **PUT** et **PATCH** dans un cas concret.
- Structurer un petit projet backend (routes, contrôleurs, logique, stockage en mémoire).

**Prérequis :** notions d’API, routes/endpoints, CRUD, différence PUT/PATCH, codes HTTP. Aucune implémentation complète d’API n’est requise.

**Environnement :** Ce projet utilise **pnpm** (gestion des paquets) et **nvm** (version de Node.js). Le serveur peut être lancé avec **nodemon** pour le rechargement à chaud (hot reload) pendant le développement.

**Important — Théorie vs pratique :** En cours vous avez vu la **théorie** ; ici on passe à la **pratique**. Aucune solution complète n'est fournie : vous devez concevoir et coder par vous-même. Cet exercice vise aussi à évaluer votre **capacité à chercher** (documentation, exemples), votre **prise d'initiative** et votre **autonomie**. Consulter la doc, tester, faire des essais et corriger les erreurs fait partie du travail attendu. Les liens ci-dessous sont des points de départ ; n'hésitez pas à en trouver d'autres.

---

## 📚 Ressources et documentation utiles

Utilisez ces ressources pour implémenter l'API. Savoir s'y repérer et en tirer parti fait partie de l'évaluation.

| Thème                       | Lien                                                                                                                                                                                     | À quoi ça sert                                                 |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| **Express** (framework)     | [Documentation officielle Express](https://expressjs.com/)                                                                                                                               | Présentation, installation, guide de démarrage                 |
| **Express — Routing**       | [Guide Routing](https://expressjs.com/en/guide/routing.html)                                                                                                                             | Définir des routes (GET, POST, etc.), paramètres `:id`         |
| **Express — Middleware**    | [Guide Writing middleware](https://expressjs.com/en/guide/writing-middleware.html)                                                                                                       | Comprendre `req`, `res`, `next`                                |
| **Express — API Reference** | [express.json()](https://expressjs.com/en/api.html#express.json), [res.status()](https://expressjs.com/en/api.html#res.status), [res.json()](https://expressjs.com/en/api.html#res.json) | Réponses HTTP, envoi de JSON, codes de statut                  |
| **Node.js**                 | [Documentation Node.js](https://nodejs.org/docs/latest/api/)                                                                                                                             | Modules, `require`, environnement Node                         |
| **Méthodes HTTP**           | [MDN — Méthodes HTTP](https://developer.mozilla.org/fr/docs/Web/HTTP/Methods)                                                                                                            | GET, POST, PUT, PATCH, DELETE — sémantique                     |
| **Codes de statut HTTP**    | [MDN — Codes de statut](https://developer.mozilla.org/fr/docs/Web/HTTP/Status) ou [httpstatuses.com](https://httpstatuses.com/)                                                          | 200, 201, 204, 400, 404, 422, 500 — signification              |
| **REST (rappel)**           | [MDN — REST](https://developer.mozilla.org/fr/docs/Glossary/REST)                                                                                                                        | Rappel sur les principes REST                                  |
| **pnpm**                    | [Documentation pnpm](https://pnpm.io/)                                                                                                                                                   | Gestion des paquets, `pnpm install`, `pnpm dev`                |
| **nvm**                     | [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm)                                                                                                                              | Changer de version Node (`nvm use`, `.nvmrc`)                  |
| **nodemon**                 | [nodemon](https://nodemon.io/)                                                                                                                                                           | Hot reload : redémarrage auto du serveur à chaque modification |

_Astuce :_ gardez un onglet sur la doc Express (routing + API `res`) pendant que vous codez ; c'est la référence principale pour cet exercice.

---

## 📋 Sujet

Créer une **mini API REST** permettant de gérer des **utilisateurs**.  
Pas de base de données : le stockage se fait **en mémoire** (tableau JavaScript).

### Structure des données — Utilisateur

Chaque utilisateur est représenté par un objet avec les champs suivants :

```json
{
  "id": 1,
  "nom": "Dupont",
  "email": "jean.dupont@example.com",
  "age": 28
}
```

| Champ   | Type   | Description                 |
| ------- | ------ | --------------------------- |
| `id`    | number | Identifiant unique (généré) |
| `nom`   | string | Nom de famille              |
| `email` | string | Adresse e-mail (unique)     |
| `age`   | number | Âge (entier positif)        |

---

## 📌 Endpoints attendus

Vous devez exposer les endpoints suivants. **Aucun code de solution n’est fourni** : c’est à vous de les concevoir et de les implémenter.

| Méthode | Endpoint     | Rôle                                                                  |
| ------- | ------------ | --------------------------------------------------------------------- |
| GET     | `/users`     | Lister tous les utilisateurs                                          |
| GET     | `/users/:id` | Récupérer un utilisateur par son `id`                                 |
| POST    | `/users`     | Créer un nouvel utilisateur                                           |
| PATCH   | `/users/:id` | Modifier **partiellement** un utilisateur (champs fournis uniquement) |
| PUT     | `/users/:id` | **Remplacer** entièrement un utilisateur (tous les champs requis)     |
| DELETE  | `/users/:id` | Supprimer un utilisateur                                              |

---

## ⚠️ Contraintes techniques et REST

### Différence PUT vs PATCH (à respecter dans votre code)

- **PUT `/users/:id`**

  - Le corps de la requête doit contenir **tous** les champs : `nom`, `email`, `age` (sauf `id`, fourni par l’URL).
  - Comportement : **remplacement complet** de la ressource. Si un champ obligatoire manque → erreur (ex. 400 ou 422).

- **PATCH `/users/:id`**
  - Le corps peut contenir **un ou plusieurs** champs à modifier.
  - Comportement : **mise à jour partielle**. Seuls les champs envoyés sont modifiés ; les autres restent inchangés.

**Exemple :**

- PUT avec `{ "nom": "Martin", "email": "jane@example.com" }` → **invalide** (il manque `age`).
- PATCH avec `{ "age": 30 }` → **valide** : seul l’âge est mis à jour.

### Méthodes HTTP

- Utilisez **uniquement** les méthodes listées ci-dessus pour ces URLs.
- Une méthode non prévue (ex. POST sur `/users/1`) peut renvoyer **405 Method Not Allowed**.

### Codes HTTP à utiliser

| Code    | Signification         | Cas d’usage typique                                                                         |
| ------- | --------------------- | ------------------------------------------------------------------------------------------- |
| **200** | OK                    | GET réussi, PUT/PATCH réussi (avec corps de réponse si pertinent).                          |
| **201** | Created               | POST réussi, nouvel utilisateur créé (idéalement avec en-tête `Location` et/ou corps).      |
| **204** | No Content            | DELETE réussi, pas de corps dans la réponse.                                                |
| **400** | Bad Request           | Données invalides (format, types, champs manquants pour PUT).                               |
| **404** | Not Found             | Utilisateur avec cet `id` inexistant.                                                       |
| **422** | Unprocessable Entity  | Données syntaxiquement correctes mais incohérentes (ex. email déjà utilisé, âge négatif).   |
| **500** | Internal Server Error | Erreur serveur non gérée (à utiliser avec parcimonie, après avoir traité les cas attendus). |

Vous êtes libres d’affiner (ex. 409 Conflict pour email dupliqué) si vous le précisez dans le README ou les commentaires.

---

## 📁 Structure du projet

L’arborescence proposée est la suivante. Vous pouvez vous en inspirer ou l’adapter, en gardant une séparation claire entre **routes**, **contrôleurs**, **données** et **point d’entrée**.

```
mini-api-users/
├── README.md
├── package.json
├── .gitignore
├── index.js                  # Point d'entrée : création du serveur Express, montage des routes
├── routes/
│   ├── test.js               # Route de test (exemple fourni : même structure que users)
│   └── users.js              # Déclaration des 6 endpoints → délègue au contrôleur
├── controllers/
│   ├── test.js               # Contrôleur test (exemple fourni : même structure que users)
│   └── users.js              # Logique métier : lecture du store, validation, réponses HTTP
├── data/
│   └── store.js              # Stockage en mémoire (tableau d'utilisateurs) + fonctions d'accès
└── middlewares/              # (optionnel — voir § Aller plus loin)
    └── requestLogger.js      # Exemple de middleware : logging des requêtes
```

**Rôle des fichiers :**

- **`index.js`** : crée l’application Express, monte les routeurs (test, users), lance l’écoute sur un port (ex. 3000). Pas de logique CRUD ici.
- **`routes/test.js`** et **`controllers/test.js`** : route **GET /test** fournie en exemple — **même structure** que pour users (route → contrôleur). À consulter pour comprendre le pattern avant de coder les routes utilisateurs.
- **`routes/users.js`** : enregistrement des 6 endpoints (GET, POST, PATCH, PUT, DELETE). **Uniquement le mapping URL → contrôleur** : chaque route appelle une fonction du contrôleur (ex. `router.get('/', controller.getAll)`). Aucune logique métier dans ce fichier.
- **`controllers/users.js`** : **toute la logique des endpoints** (accès au store, validation des données, choix du code HTTP, `res.status(...).json(...)`). Une fonction par action : `getAll`, `getById`, `create`, `updatePartial`, `updateFull`, `remove`.
- **`data/store.js`** : structure pour stocker les utilisateurs en mémoire (tableau), génération d’un `id` unique, et fonctions utilitaires (trouver par id, ajouter, modifier, supprimer) que vous devez concevoir et implémenter.
- **`middlewares/`** (optionnel) : dossier pour des middlewares personnalisés (ex. logging, validation, 404 global). **Pas obligatoire** pour valider l’exercice — à utiliser seulement si vous souhaitez aller plus loin.

Cette structure évite de tout mettre dans les routes : les routes restent lisibles, la logique est centralisée dans le contrôleur.

---

## 🧪 Indications de test

### Mise en place et démarrage du serveur

**⚠️ Important :** vous devez **installer les dépendances** avec `pnpm install` **avant** de lancer le serveur (`pnpm dev` ou `pnpm start`). Sans cela, le serveur ne démarrera pas (modules manquants).

1. **Node.js** : utilisez la version indiquée par le projet (fichier `.nvmrc` à la racine) avec **nvm** :

   ```bash
   nvm use
   ```

   _(Si vous n'avez pas nvm ou pnpm, consultez les liens du tableau « Ressources et documentation utiles » pour les installer.)_

2. **Dépendances (obligatoire)** : installez les paquets avec **pnpm** avant toute chose :

   ```bash
   pnpm install
   ```

3. **Lancer le serveur** :
   - **En développement (hot reload)** : le serveur redémarre automatiquement à chaque modification du code grâce à **nodemon**.
     ```bash
     pnpm dev
     ```
   - **En production** (sans rechargement à chaud) :
     ```bash
     pnpm start
     ```

Le serveur écoute sur un port (ex. `http://localhost:3000`). Avec `pnpm dev`, modifiez un fichier (routes, contrôleur, etc.) et sauvegardez : le serveur redémarre tout seul.

### Vérifier que l'API répond (avant de coder)

Une route de **test** est déjà en place pour vérifier que le serveur fonctionne avant de coder les endpoints `/users` :

- **GET** `http://localhost:3000/test`

Exemple avec curl :

```bash
curl http://localhost:3000/test
```

Réponse attendue (200) : `{"ok":true,"message":"API Mini Users — serveur opérationnel"}`. Si vous obtenez cette réponse, l'API est bien lancée ; vous pouvez ensuite implémenter les routes utilisateurs.

### Tester avec curl (exemples à adapter)

- **GET tous les utilisateurs**  
  `curl -X GET http://localhost:3000/users`

- **GET un utilisateur**  
  `curl -X GET http://localhost:3000/users/1`

- **POST (création)**  
  `curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"nom":"Dupont","email":"jean@example.com","age":28}'`

- **PATCH (mise à jour partielle)**  
  `curl -X PATCH http://localhost:3000/users/1 -H "Content-Type: application/json" -d '{"age":30}'`

- **PUT (remplacement)**  
  `curl -X PUT http://localhost:3000/users/1 -H "Content-Type: application/json" -d '{"nom":"Martin","email":"jane@example.com","age":25}'`

- **DELETE**  
  `curl -X DELETE http://localhost:3000/users/1`

### Tester avec Postman (ou Insomnia)

1. Créer une collection « Mini API Users ».
2. Créer une requête par endpoint (GET, POST, PATCH, PUT, DELETE).
3. Vérifier pour chaque requête :
   - le **code HTTP** renvoyé ;
   - le **corps** de la réponse (format JSON attendu).
4. Tester les **cas d’erreur** : id inexistant (404), données invalides (400/422), PUT sans tous les champs (400/422).

---

## ❌ Erreurs fréquentes à éviter

1. **Confondre PUT et PATCH**  
   PUT = tous les champs obligatoires ; PATCH = uniquement les champs envoyés.

2. **Répondre 200 à un POST de création**  
   Préférer **201 Created** pour une ressource créée.

3. **Renvoyer un corps après un DELETE réussi**  
   Utiliser **204 No Content** sans corps.

4. **Toujours renvoyer 500**  
   Réserver 500 aux vraies erreurs serveur ; utiliser 400/404/422 pour les erreurs métier ou de requête.

5. **Oublier `Content-Type: application/json`**  
   Nécessaire pour POST, PUT et PATCH lorsque vous envoyez du JSON.

6. **Ne pas valider les entrées**  
   Vérifier présence et type des champs (nom, email, age) et contraintes (email unique, age > 0, etc.).

7. **Ignorer l’id dans l’URL**  
   Pour GET/PATCH/PUT/DELETE `/users/:id`, utiliser l’`id` de l’URL, pas celui du corps (pour PUT/PATCH, l’id ne doit pas être modifiable via le corps).

---

## ✅ Critères de validation

Votre travail pourra être considéré comme validé si :

- [ ] Les **6 endpoints** sont implémentés et accessibles.
- [ ] **GET /users** retourne la liste des utilisateurs (tableau JSON).
- [ ] **GET /users/:id** retourne un utilisateur ou **404** si l’id n’existe pas.
- [ ] **POST /users** crée un utilisateur avec un `id` généré, retourne **201** et des données cohérentes.
- [ ] **PATCH /users/:id** met à jour uniquement les champs fournis ; **404** si l’utilisateur n’existe pas.
- [ ] **PUT /users/:id** exige tous les champs (nom, email, age) et remplace la ressource ; **400/422** si invalide, **404** si absent.
- [ ] **DELETE /users/:id** supprime l’utilisateur et retourne **204** (ou 200 sans corps) ; **404** si absent.
- [ ] Les **codes HTTP** utilisés sont cohérents avec la sémantique REST (200, 201, 204, 400, 404, 422, 500).
- [ ] Le projet est **structuré** (séparation routes / contrôleurs / point d’entrée / données).
- [ ] Les **cas d’erreur** sont gérés (id inexistant, données manquantes ou invalides).
- [ ] Vous avez **cherché** dans la documentation (liens fournis ou autres) et **pris des initiatives** pour avancer (tests, essais, correction d'erreurs) plutôt que d'attendre une solution clé en main.

---

## 🚀 Aller plus loin

Une fois l’exercice de base réalisé, vous pouvez (aucun de ces points n’est requis pour la validation) :

- **Validation avancée** : format d’email (regex ou librairie), âge dans une plage raisonnable (ex. 0–120).
- **Code 409 Conflict** : si l’email est déjà utilisé à la création ou à la mise à jour.
- **Middlewares** : le dossier `middlewares/` est prévu pour ça. Un middleware est une fonction `(req, res, next)` appelée avant les routes ; on l’enregistre avec `app.use(...)` dans `index.js`. Idées :
  - **Logging** : `middlewares/requestLogger.js` — afficher en console chaque requête (méthode + URL) avant de passer à la suite (`next()`).
  - **Validation** : middleware qui vérifie le corps des requêtes POST/PUT/PATCH (présence des champs, types) et renvoie 400/422 si invalide, sinon `next()`.
  - **404 global** : middleware placé _après_ toutes les routes ; si aucune route n’a répondu, renvoyer 404 pour toute URL non gérée.
- **En-tête `Location`** : dans la réponse à un POST 201, ajouter `Location: /users/<id>`.
- **Pagination** : GET `/users?page=1&limit=10` pour limiter le nombre de résultats (optionnel).

---

## 📝 Auto-évaluation

Avant de rendre votre travail, vérifiez :

1. **PUT vs PATCH** : savez-vous expliquer la différence et l’avoir codée correctement ?
2. **Codes HTTP** : pour chaque endpoint, pouvez-vous justifier le code renvoyé (200, 201, 204, 400, 404, 422) ?
3. **Cas limites** : avez-vous testé id inexistant, email dupliqué, champs manquants ou invalides ?
4. **Structure** : un autre développeur pourrait-il comprendre rapidement où sont les routes, le contrôleur et le stockage ?
5. **Recherche et initiative** : avez-vous consulté la doc, testé par vous-même et cherché des réponses (erreurs, syntaxe, exemples) avant de demander de l'aide ?

Si vous répondez oui à ces questions et que les critères de validation sont remplis, vous avez atteint les objectifs de l’exercice.

---

**Bon courage.**  
En cas de doute, revenez au cours sur les API REST, les méthodes HTTP et les codes de statut.
