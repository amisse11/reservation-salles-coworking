use("coworking_db");

db.reservations.aggregate([

    // $facet : exécuter 3 analyses en parallèle sur les mêmes données
    {
        $facet: {

            // Analyse 1 — Statistiques globales
            "statistiques_globales": [
                {
                    $group: {
                        _id: null,
                        nb_total: { $sum: 1 },
                        revenu_total: { $sum: "$prix_total" },
                        revenu_moyen: { $avg: "$prix_total" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        nb_total: 1,
                        revenu_total: { $round: ["$revenu_total", 2] },
                        revenu_moyen: { $round: ["$revenu_moyen", 2] }
                    }
                }
            ],

            // Analyse 2 — Répartition par statut
            "repartition_par_statut": [
                {
                    $group: {
                        _id: "$statut",
                        total: { $sum: 1 }
                    }
                },
                { $sort: { total: -1 } },
                {
                    $project: {
                        _id: 0,
                        statut: "$_id",
                        total: 1
                    }
                }
            ],

            // Analyse 3 — Top 3 des salles les plus réservées
            "top_salles": [
                {
                    $group: {
                        _id: "$salle.nom",
                        nb_reservations: { $sum: 1 },
                        revenu: { $sum: "$prix_total" }
                    }
                },
                { $sort: { nb_reservations: -1 } },
                { $limit: 3 },
                {
                    $project: {
                        _id: 0,
                        salle: "$_id",
                        nb_reservations: 1,
                        revenu: 1
                    }
                }
            ]
        }
    }
])