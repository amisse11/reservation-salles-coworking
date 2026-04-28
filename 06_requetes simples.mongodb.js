// Afficher tous les utilisateurs
db.utilisateurs.find()

// Afficher un utilisateur par email
db.utilisateurs.findOne({ email: "2753251@coworking.ca" })

// Afficher uniquement les salles disponibles
db.salles.find({ disponible: true })

// Afficher les salles avec une capacité d'au moins 5 personnes ($gte signie "greater than or equal" >= 5)
db.salles.find({ capacite: {$gte: 5 } })

// Afficher uniquement le nom et le prix des salles (projection 1 affiche et 0 cache)
db.salles.find({}, { nom: 1, prix_heure: 1, _id: 0 })

// Afficher les reservations confirmées
db.reservations.find({ statut: "confirmee" })

// Afficher les réservations d'un utilisateur spécifique (notation pointée permet d'acceder à un champ à l'intérieur d'un sous document imbriqué)
db.reservations.find({ "utilisateur.email": "2751497@coworking.ca" })

---

// Insérer un nouvel utilisateur (new Date génère une nouvelle Data automatiquement)
db.utilisateurs.insertOne({
    nom: "Dupont",
    prenom: "Marie",
    email: "marie.dupont@email.com",
    telephone: "+1 514-000-9999",
    mot_de_passe: "mot_depasse_",
    type: "visiteur",
    data_inscription: new Date()
})

---

// Mettre à jour le statut d'une réservation (set met à jour uniquement le champ spécifié sans toucher les autres)
db.reservations.updateOne(
    { "paiement.reference_transaction": "TXN-202060320-0001" },
    { $set: { statut: "terminee" } }
)

---

// Marquer une salle comme non disponible
db.salles.updateOne(
    { nom: "Salle Boréale" },
    { $set: { disponible: false } }
)

---

// Supprimer un avis spécifique (deleteMany supprime tous les documents correspondants)
db.reservations.deleteMany({ statut: "annulee" })

---

// Compter le nombre de réservations par statut ($group regroupe les documents par valeur de $statut et compte combien il y en a dans chaque groupe)
db.reservations.aggregate([
    { $group: { _id: "$statut", total: { $sum: 1 } } }
])