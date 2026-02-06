// Contrôleur test — Vérifier que l'API répond (même structure que users)
// ~ IMPORTS
// (aucun import nécessaire pour cette route simple)

// & FONCTIONS (handlers)
function getTest(req, res) {
  res.status(200).json({
    ok: true,
    message: "API Mini Users — serveur opérationnel",
  });
}

// * EXPORTS
module.exports = {
  getTest,
};
