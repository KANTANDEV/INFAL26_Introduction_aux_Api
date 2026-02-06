// Routes /test — Déclaration des endpoints (même structure que users)
// La logique est dans controllers/test.js
// ~ IMPORTS
const express = require("express");
const router = express.Router();
const testController = require("../controllers/test.js");

// GET /test → vérifier que l'API répond avant de coder /users
router.get("/", testController.getTest);

module.exports = router;
