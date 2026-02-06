// Routes /users et /users/:id — Déclaration des endpoints uniquement
// La logique métier est dans controllers/users.js (pas ici)
// ~ IMPORTS
const express = require("express");
const router = express.Router();

// TODO : importer le contrôleur utilisateurs (controllers/users.js)

// ---
// GET    /users      → controller.getAll
// GET    /users/:id  → controller.getById
// POST   /users      → controller.create
// PATCH  /users/:id  → controller.updatePartial
// PUT    /users/:id  → controller.updateFull
// DELETE /users/:id  → controller.remove
// ---

// TODO : enregistrer les 6 routes en passant les fonctions du contrôleur
// Exemple : router.get('/', controller.getAll);

module.exports = router;
