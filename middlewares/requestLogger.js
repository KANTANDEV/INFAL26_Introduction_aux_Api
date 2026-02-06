// Middleware optionnel — Exemple : logger les requêtes entrantes
// À utiliser uniquement si vous souhaitez aller plus loin (voir README § Aller plus loin).
// Non requis pour valider l'exercice.
// ~ IMPORTS
// (aucun import obligatoire pour un middleware simple)

// Un middleware Express reçoit (req, res, next).
// Il peut lire req (method, url, body...), modifier res, ou appeler next() pour passer au suivant.

// TODO (optionnel) : créer une fonction requestLogger(req, res, next) qui :
//   - affiche en console la méthode et l'URL (ex. "GET /users")
//   - appelle next() pour laisser la requête continuer
// TODO (optionnel) : exporter la fonction pour l'utiliser dans index.js avec app.use(requestLogger)
