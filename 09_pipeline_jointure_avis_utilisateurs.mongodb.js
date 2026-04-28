use("coworking_db");

db.avis.aggregate([

    // Étape 1 - $lookup : joindre avec la collection utilisateurs
    {
        $lookup: {
            from: "utilisateurs",
            localField: "utilisateur_id",
            foreignField: "_id",
            as: "utilisateur_info"
        }
    },

    // Étape 2 - $unwind : dérouler le tableau (toujours 1 seul élément ici)
    // $lookup retourne toujours un tableau, même pour une jointure 1-à-1
    {
        $unwind: "$utilisateur_info"
    },

    // Étape 3 - $project : formater le résultat final
    {
        $project: {
            _id: 0,
            salle_id: 1,
            note: 1,
            commentaire: 1,
            date: 1,
            auteur: "$utilisateur_info.nom",
            email: "$utilisateur_info.email"
        }
    }
])
