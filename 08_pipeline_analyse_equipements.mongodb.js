use("coworking_db");

db.salles.aggregate([

    // Étape 1 - $unwind : dérouler le tableau equipements
    // Chaque équipement devient un document séparé
    {
        $unwind: "$equipements"
    },

    // Étape 2 - $group : compter chaque équipement sur toutes les salles
    {
        $group: {
            _id: "$equipements.nom",
            type: { $first: "$equipements.type" },
            nb_salles: { $sum: 1 },
            quantite_totale: { $sum: "$equipements.quantite" }
        }
    },

    // Étape 3 - $sort : trier par nombre de salles décroissant
    {
        $sort: { nb_salles: -1 }
    },

    // Étape 4 - $project : formater le résultat
    {
        $project: {
            _id: 0,
            equipement: "$_id",
            type: 1,
            nb_salles: 1,
            quantite_totale: 1
        }
    }
])


