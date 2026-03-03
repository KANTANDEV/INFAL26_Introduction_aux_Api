# Sujet — Mini API REST (gestion d'utilisateurs)

Document destiné aux participants du module. À lire en complément du [README](./README.md).

---

## Objectifs pédagogiques

À l'issue de cet exercice, vous serez capable de :

- Concevoir et implémenter une **API REST** avec Node.js et Express.
- Appliquer le modèle **CRUD** (Create, Read, Update, Delete) de façon cohérente.
- Choisir les **méthodes HTTP** et les **codes de statut** adaptés à chaque action.
- Distinguer clairement **PUT** et **PATCH** dans un cas concret.
- Structurer un petit projet backend (routes, contrôleurs, logique, stockage en mémoire).

**Prérequis :** notions d'API, routes/endpoints, CRUD, différence PUT/PATCH, codes HTTP. Aucune implémentation complète n'est requise en entrée.

**Environnement :** pnpm, nvm (voir `.nvmrc`), nodemon pour le hot reload. Aucune solution complète n'est fournie : vous devez concevoir et coder par vous-même. La recherche documentaire et les essais font partie du travail attendu.

---

## Ressources et documentation

| Thème | Lien | Usage |
|-------|------|--------|
| Express | [Documentation Express](https://expressjs.com/) | Démarrage, routing, API |
| Express — Routing | [Guide Routing](https://expressjs.com/en/guide/routing.html) | GET, POST, paramètres `:id` |
| Express — Middleware | [Writing middleware](https://expressjs.com/en/guide/writing-middleware.html) | `req`, `res`, `next` |
| Express — API | [express.json](https://expressjs.com/en/api.html#express.json), [res.status](https://expressjs.com/en/api.html#res.status), [res.json](https://expressjs.com/en/api.html#res.json) | JSON, codes de statut |
| Node.js | [Documentation Node.js](https://nodejs.org/docs/latest/api/) | Modules, `require` |
| Méthodes HTTP | [MDN — Méthodes HTTP](https://developer.mozilla.org/fr/docs/Web/HTTP/Methods) | GET, POST, PUT, PATCH, DELETE |
| Codes de statut | [MDN — Codes de statut](https://developer.mozilla.org/fr/docs/Web/HTTP/Status) | 200, 201, 204, 400, 404, 422, 500 |
| REST | [MDN — REST](https://developer.mozilla.org/fr/docs/Glossary/REST) | Rappel REST |
| pnpm | [Documentation pnpm](https://pnpm.io/) | `pnpm install`, `pnpm dev` |
| nvm | [nvm](https://github.com/nvm-sh/nvm) | `nvm use`, `.nvmrc` |
| nodemon | [nodemon](https://nodemon.io/) | Hot reload |

---

## Sujet

Créer une **mini API REST** de gestion d'**utilisateurs**. Stockage **en mémoire** (tableau JavaScript), pas de base de données.

### Modèle de données — Utilisateur

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

## Endpoints à implémenter

| Méthode | Endpoint     | Rôle                                                                  |
| ------- | ------------ | --------------------------------------------------------------------- |
| GET     | `/users`     | Lister tous les utilisateurs                                          |
| GET     | `/users/:id` | Récupérer un utilisateur par son `id`                                 |
| POST    | `/users`     | Créer un nouvel utilisateur                                           |
| PATCH   | `/users/:id` | Modifier **partiellement** un utilisateur (champs fournis uniquement) |
| PUT     | `/users/:id` | **Remplacer** entièrement un utilisateur (tous les champs requis)     |
| DELETE  | `/users/:id` | Supprimer un utilisateur                                              |

---

## Contraintes techniques et REST

### PUT vs PATCH

- **PUT `/users/:id`**  
  Corps : **tous** les champs `nom`, `email`, `age` (sauf `id`, fourni par l’URL). Comportement : **remplacement complet**. Champ manquant → 400 ou 422.

- **PATCH `/users/:id`**  
  Corps : **un ou plusieurs** champs. Comportement : **mise à jour partielle**. Seuls les champs envoyés sont modifiés.

Exemples :  
- PUT avec `{ "nom": "Martin", "email": "jane@example.com" }` → **invalide** (il manque `age`).  
- PATCH avec `{ "age": 30 }` → **valide**.

### Méthodes HTTP

Utiliser uniquement les méthodes listées. Méthode non prévue (ex. POST sur `/users/1`) → **405 Method Not Allowed** possible.

### Codes HTTP à utiliser

| Code    | Signification         | Cas d'usage typique                                                                        |
| ------- | --------------------- | ------------------------------------------------------------------------------------------ |
| **200** | OK                    | GET réussi, PUT/PATCH réussi (corps si pertinent).                                         |
| **201** | Created               | POST réussi (idéalement en-tête `Location` et/ou corps).                                    |
| **204** | No Content            | DELETE réussi, pas de corps.                                                               |
| **400** | Bad Request           | Données invalides (format, types, champs manquants pour PUT).                              |
| **404** | Not Found             | Utilisateur avec cet `id` inexistant.                                                      |
| **422** | Unprocessable Entity  | Données correctes mais incohérentes (email déjà utilisé, âge négatif, etc.).               |
| **500** | Internal Server Error | Erreur serveur non gérée (à utiliser avec parcimonie).                                     |

Affinage possible (ex. 409 Conflict pour email dupliqué) à préciser en commentaire ou dans le README.

---

## Structure du projet

```
├── index.js                  # Point d'entrée : Express, montage des routes
├── routes/
│   ├── test.js               # Route de test (exemple fourni)
│   └── users.js              # 6 endpoints → délègue au contrôleur
├── controllers/
│   ├── test.js               # Contrôleur test (exemple)
│   └── users.js              # Logique : store, validation, réponses HTTP
├── data/
│   └── store.js              # Stockage en mémoire + fonctions d'accès
└── middlewares/
    └── requestLogger.js      # Optionnel (ex. logging)
```

- **`index.js`** : création de l’app Express, montage des routeurs (test, users), écoute sur un port. Pas de logique CRUD.
- **`routes/users.js`** : uniquement le mapping URL → contrôleur (ex. `router.get('/', controller.getAll)`).
- **`controllers/users.js`** : logique des endpoints (store, validation, codes HTTP, `res.status(...).json(...)`). Une fonction par action : `getAll`, `getById`, `create`, `updatePartial`, `updateFull`, `remove`.
- **`data/store.js`** : tableau en mémoire, id unique, fonctions (getUsers, getUserById, addUser, updateUser, deleteUser).
- **`middlewares/`** : optionnel (logging, validation, 404 global).

---

## Mise en place et démarrage

1. **Node.js** : `nvm use` (version du `.nvmrc`).
2. **Dépendances** : `pnpm install`.
3. **Serveur** :  
   - Dev (hot reload) : `pnpm dev`  
   - Sans hot reload : `pnpm start`

Le serveur écoute sur un port (ex. `http://localhost:3000`).

### Vérifier que l'API répond

**GET** `http://localhost:3000/test`

Réponse attendue (200) : `{"ok":true,"message":"API Mini Users — serveur opérationnel"}`.

### Exemples curl

- GET tous : `curl -X GET http://localhost:3000/users`
- GET un : `curl -X GET http://localhost:3000/users/1`
- POST : `curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"nom":"Dupont","email":"jean@example.com","age":28}'`
- PATCH : `curl -X PATCH http://localhost:3000/users/1 -H "Content-Type: application/json" -d '{"age":30}'`
- PUT : `curl -X PUT http://localhost:3000/users/1 -H "Content-Type: application/json" -d '{"nom":"Martin","email":"jane@example.com","age":25}'`
- DELETE : `curl -X DELETE http://localhost:3000/users/1`

Tester aussi les cas d’erreur : id inexistant (404), données invalides (400/422), PUT sans tous les champs.

---

## Erreurs fréquentes à éviter

1. Confondre PUT et PATCH (PUT = tous les champs ; PATCH = champs envoyés uniquement).
2. Répondre 200 à un POST de création → préférer **201 Created**.
3. Renvoyer un corps après un DELETE réussi → **204 No Content** sans corps.
4. Renvoyer 500 pour des erreurs métier → utiliser 400/404/422.
5. Oublier `Content-Type: application/json` pour POST/PUT/PATCH avec JSON.
6. Ne pas valider les entrées (présence, types, email unique, age > 0).
7. Utiliser l’id du corps au lieu de l’id de l’URL pour GET/PATCH/PUT/DELETE `/users/:id`.

---

## Critères de validation

- Les **6 endpoints** sont implémentés et accessibles.
- **GET /users** retourne la liste (tableau JSON).
- **GET /users/:id** retourne un utilisateur ou **404** si absent.
- **POST /users** crée un utilisateur avec `id` généré, retourne **201** et des données cohérentes.
- **PATCH /users/:id** met à jour uniquement les champs fournis ; **404** si absent.
- **PUT /users/:id** exige tous les champs (nom, email, age), remplace la ressource ; **400/422** si invalide, **404** si absent.
- **DELETE /users/:id** supprime et retourne **204** (ou 200 sans corps) ; **404** si absent.
- Codes HTTP cohérents avec la sémantique REST.
- Projet structuré (routes / contrôleurs / point d’entrée / données).
- Cas d’erreur gérés (id inexistant, données manquantes ou invalides).
- Recherche documentaire et prise d’initiative (tests, corrections).

---

## Aller plus loin (optionnel)

- Validation avancée : format email, âge dans une plage raisonnable (ex. 0–120).
- **409 Conflict** si email déjà utilisé.
- Middlewares : `requestLogger.js` (log méthode + URL), validation du corps (400/422), 404 global après les routes.
- En-tête **Location** dans la réponse POST 201 : `Location: /users/<id>`.
- Pagination : GET `/users?page=1&limit=10`.

---

## Auto-évaluation

1. PUT vs PATCH : savez-vous expliquer la différence et l’avoir codée correctement ?
2. Codes HTTP : pour chaque endpoint, pouvez-vous justifier le code renvoyé ?
3. Cas limites : id inexistant, email dupliqué, champs manquants ou invalides — testés ?
4. Structure : un autre développeur comprend-il rapidement où sont les routes, le contrôleur et le store ?
5. Avez-vous consulté la doc, testé et cherché des réponses avant de demander de l’aide ?

Si oui et que les critères de validation sont remplis, les objectifs de l’exercice sont atteints.
