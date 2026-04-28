
use("coworking_db");

db.salles.updateMany(
    // Filtre : uniquement les documents sans ce champ
    { politique_annulation: { $exists: false } },

    // Ajout du champ avec une valeur par défaut
    {
        $set: {
            politique_annulation: {
                delai_annulation_heures: 24,
                remboursement_pct: 100,
                description: "Annulation gratuite jusqu'à 24h avant"
            }
        }
    }
)

db.salles.findOne( { nom: "Salle Boréale" }, { nom: 1, politique_annulation: 1, _id: 0 } )