use("coworking_db");

// REQUÊTE 1 — READ
// Trouver toutes les salles disponibles selon une capacité minimale
// Pattern : Index composite (type + capacite + prix_heure)

db.salles.find(
    {
        disponible: true,
        capacite: { $gte: 5 }
    },
    {
        nom: 1,
        type: 1,
        capacite: 1,
        prix_heure: 1,
        note_moyenne: 1,
        "equipements.nom": 1
    }
).sort({ prix_heure: 1 });


// REQUÊTE 2 — READ + WRITE
// Vérifier qu'un créneau est libre, puis créer une réservation
// Pattern : Index sur (salle._id + date_debut + date_fin)

// Étape 1 — Vérification du conflit de créneau
const salleId = db.salles.findOne({ nom: "Salle Boréale" })._id;

const conflit = db.reservations.findOne({
    "salle._id": salleId,
    statut: { $in: ["en_attente", "confirmee"] },
    date_debut: { $lt: ISODate("2026-04-10T14:00:00Z") },
    date_fin: { $gt: ISODate("2026-04-10T10:00:00Z") }
});

// Étape 2 — Insertion seulement si pas de conflit
if (!conflit) {
    const salle = db.salles.findOne({ nom: "Salle Boréale" });
    const user = db.utilisateurs.findOne({ email: "2753251@coworking.ca" });

    db.reservations.insertOne({
        date_debut: ISODate("2026-04-10T10:00:00Z"),
        date_fin: ISODate("2026-04-10T14:00:00Z"),
        statut: "confirmee",
        prix_total: Double(salle.prix_heure * 4),
        date_creation: new Date(),
        utilisateur: {
            _id: user._id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email
        },
        salle: {
            _id: salle._id,
            nom: salle.nom,
            type: salle.type,
            capacite: salle.capacite,
            espace_nom: "CoWork Québec Vieux-Port"
        },
        paiement: {
            montant: Double(salle.prix_heure * 4),
            date_paiement: new Date(),
            methode: "carte",
            statut: "effectue",
            reference_transaction: "TXN-20260410-0004"
        }
    });
    print("Réservation créée avec succès.");
} else {
    print("Créneau non disponible — conflit détecté.");
}


// REQUÊTE 3 — UPDATE
// Annuler une réservation et rembourser le paiement en une opération
// Pattern : Embedding (paiement imbriqué dans réservation)

db.reservations.updateOne(
    {
        reference_transaction: "TXN-20260402-0002",
        "paiement.reference_transaction": "TXN-20260402-0002"
    },
    {
        $set: {
            statut: "annulee",
            "paiement.statut": "rembourse"
        }
    }
);

// Vérification
db.reservations.findOne(
    { "paiement.reference_transaction": "TXN-20260402-0002" },
    { statut: 1, "paiement.statut": 1 }
);


// REQUÊTE 4 — WRITE + UPDATE
// Ajouter un avis et mettre à jour note_moyenne + avis_recents
// Pattern : Subset Pattern + Computed Pattern

const salleCible = db.salles.findOne({ nom: "Salle Boréale" });
const userAvis = db.utilisateurs.findOne({ email: "2753251@coworking.ca" });

// Étape 1 — Insérer le nouvel avis dans la collection avis
db.avis.insertOne({
    salle_id: salleCible._id,
    utilisateur_id: userAvis._id,
    utilisateur_nom: userAvis.prenom + " " + userAvis.nom[0] + ".",
    note: 5,
    commentaire: "Excellent espace, très professionnel et bien équipé.",
    date: new Date()
});

// Étape 2 — Recalculer la note moyenne (Computed Pattern)
const stats = db.avis.aggregate([
    { $match: { salle_id: salleCible._id } },
    {
        $group: {
            _id: "$salle_id",
            note_moyenne: { $avg: "$note" },
            nombre_avis: { $sum: 1 }
        }
    }
]).toArray()[0];

// Étape 3 — Récupérer les 5 derniers avis (Subset Pattern)
const avisRecents = db.avis.find(
    { salle_id: salleCible._id },
    { utilisateur_nom: 1, note: 1, commentaire: 1, date: 1 }
).sort({ date: -1 }).limit(5).toArray();

// Étape 4 — Mettre à jour la salle
db.salles.updateOne(
    { _id: salleCible._id },
    {
        $set: {
            note_moyenne: Double(stats.note_moyenne),
            nombre_avis: stats.nombre_avis,
            avis_recents: avisRecents
        }
    }
);

// Vérification
db.salles.findOne(
    { _id: salleCible._id },
    { note_moyenne: 1, nombre_avis: 1, avis_recents: 1 }
);


// REQUÊTE 5 — READ (Aggregation Pipeline)
// Historique complet des réservations d'un utilisateur
// avec total dépensé et nombre de réservations par statut
// Pattern : Extended Reference + Aggregation

db.reservations.aggregate([
    // Étape 1 — Filtrer par utilisateur
    {
        $match: {
            "utilisateur.email": "2751491@coworking.ca"
        }
    },
    // Étape 2 — Trier par date décroissante
    {
        $sort: { date_creation: -1 }
    },
    // Étape 3 — Grouper pour les statistiques globales
    {
        $group: {
            _id: "$utilisateur._id",
            nom_complet: { $first: { $concat: ["$utilisateur.prenom", " ", "$utilisateur.nom"] } },
            reservations: {
                $push: {
                    salle: "$salle.nom",
                    date_debut: "$date_debut",
                    date_fin: "$date_fin",
                    statut: "$statut",
                    prix_total: "$prix_total"
                }
            },
            total_depense: { $sum: "$prix_total" },
            nb_total: { $sum: 1 },
            nb_confirmees: { $sum: { $cond: [{ $eq: ["$statut", "confirmee"] }, 1, 0] } },
            nb_annulees: { $sum: { $cond: [{ $eq: ["$statut", "annulee"] }, 1, 0] } }
        }
    },
    // Étape 4 — Mise en forme du résultat
    {
        $project: {
            _id: 0,
            nom_complet: 1,
            reservations: 1,
            statistiques: {
                total_depense: "$total_depense",
                nb_total: "$nb_total",
                nb_confirmees: "$nb_confirmees",
                nb_annulees: "$nb_annulees"
            }
        }
    }
]);


