
use("coworking_db");

db.reservations.aggregate([

  // Étape 1 - $match : exclure les réservations annulées
  {
    $match: {
      statut: { $in: ["confirmee", "terminee"] }
    }
  },

  // Étape 2 - $group : regrouper par salle et calculer les statistiques
  {
    $group: {
      _id: "$salle.nom",
      type_salle: { $first: "$salle.type" },
      nb_reservations: { $sum: 1 },
      revenu_total: { $sum: "$prix_total" },
      revenu_moyen: { $avg: "$prix_total" },
      capacite: { $first: "$salle.capacite" }
    }
  },

  // Étape 3 - $sort : trier par revenu total décroissant
  {
    $sort: { revenu_total: -1 }
  },

  // Étape 4 - $project : formater le résultat final
  {
    $project: {
      _id: 0,
      salle: "$_id",
      type_salle: 1,
      capacite: 1,
      nb_reservations: 1,
      revenu_total: { $round: ["$revenu_total", 2] },
      revenu_moyen: { $round: ["$revenu_moyen", 2] }
    }
  }
])