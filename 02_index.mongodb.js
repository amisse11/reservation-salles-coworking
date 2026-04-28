use("coworking_db");

// Utilisateurs
db.utilisateurs.createIndex({ email: 1 }, { unique: true })

// Espaces Coworking
db.espaces_coworking.createIndex({ "adresse.ville": 1 })

// Salles
db.salles.createIndex({ espace_id: 1 })
db.salles.createIndex({ type: 1, capacite: 1, prix_heure: 1 })
db.salles.createIndex({ disponible: 1 })

// Réservations
// Index critique — détection des conflits de créneaux
db.reservations.createIndex(
    { "salle._id": 1, date_debut: 1, date_fin: 1 }
)
// Index — historique par utilisateur
db.reservations.createIndex(
    { "utilisateur._id": 1, date_creation: -1 }
)
// Index — filtrage par statut
db.reservations.createIndex({ statut: 1 })

// Avis
db.avis.createIndex({ salle_id: 1, date: -1 })
db.avis.createIndex({ utilisateur_id: 1 })
