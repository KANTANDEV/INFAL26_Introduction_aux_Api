// Point d'entrée du serveur — Mini API Users
// ~ IMPORTS
const express = require("express");

const testRouter = require("./routes/test.js");
// TODO : importer le routeur des utilisateurs (depuis routes/users.js)

// ^ CONFIG
const PORT = process.env.PORT || 3000;
const app = express();

// Middleware pour parser le JSON des requêtes
app.use(express.json());

// Route de test (structure routes → contrôleur, comme pour /users)
app.use("/test", testRouter);

// TODO (optionnel) : ajouter un middleware personnalisé (ex. logging) depuis middlewares/
// Exemple : const requestLogger = require('./middlewares/requestLogger'); app.use(requestLogger);

// TODO : monter le routeur des utilisateurs sur le préfixe /users
// Exemple : app.use('/users', usersRouter);

// TODO (optionnel) : route 404 globale pour les URLs non gérées

// * DÉMARRAGE
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
