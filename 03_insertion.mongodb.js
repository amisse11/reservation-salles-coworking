use("coworking_db");

// Nettoyage avant insertion
db.utilisateurs.deleteMany({});
db.espaces_coworking.deleteMany({});
db.salles.deleteMany({});
db.reservations.deleteMany({});
db.avis.deleteMany({});

// Utilisateurs
const user1 = db.utilisateurs.insertOne({
    nom: "Talling",
    prenom: "Channel",
    email: "2751491@coworking.ca",
    telephone: "+1 613-111-2222",
    mot_de_passe: "$2b$10$hashedpassword1",
    type: "membre",
    date_inscription: ISODate("2025-09-01T00:00:00Z")
})

const user2 = db.utilisateurs.insertOne({
    nom: "Mutanda",
    prenom: "Josue",
    email: "2751096@coworking.ca",
    telephone: "+1 343-333-4444",
    mot_de_passe: "$2b$10$hashedpassword2",
    type: "membre",
    date_inscription: ISODate("2025-11-15T00:00:00Z")
})

const user3 = db.utilisateurs.insertOne({
    nom: "Zahabi",
    prenom: "Sherine",
    email: "2711188@coworking.ca",
    telephone: "+1 438-555-6666",
    mot_de_passe: "$2b$10$hashedpassword3",
    type: "admin",
    date_inscription: ISODate("2025-01-10T00:00:00Z")
})

const user4 = db.utilisateurs.insertOne({
    nom: "Misse",
    prenom: "Anthony",
    email: "2753251@coworking.ca",
    telephone: "+1 613-555-6666",
    mot_de_passe: "$2b$10$hashedpassword3",
    type: "admin",
    date_inscription: ISODate("2025-01-10T00:00:00Z")
})

// Espaces Coworking
const espace1 = db.espaces_coworking.insertOne({
    nom: "CoWork Québec Vieux-Port",
    telephone: "+1 418-000-0001",
    description: "Espace chaleureux dans le Vieux-Port de Québec",
    adresse: {
        rue: "Rue Saint-Pierre",
        numero: "85",
        ville: "Québec",
        code_postal: "G1K 4A3",
        province: "Québec",
        pays: "Canada",
        complement: "Étage 2"
    },
    horaires_ouverture: [
        { jour: "lundi", heure_ouverture: "08:00", heure_fermeture: "20:00", ferme: false },
        { jour: "mardi", heure_ouverture: "08:00", heure_fermeture: "20:00", ferme: false },
        { jour: "mercredi", heure_ouverture: "08:00", heure_fermeture: "20:00", ferme: false },
        { jour: "jeudi", heure_ouverture: "08:00", heure_fermeture: "20:00", ferme: false },
        { jour: "vendredi", heure_ouverture: "08:00", heure_fermeture: "18:00", ferme: false },
        { jour: "samedi", heure_ouverture: "10:00", heure_fermeture: "16:00", ferme: false },
        { jour: "dimanche", heure_ouverture: null, heure_fermeture: null, ferme: true }
    ]
})

const espace2 = db.espaces_coworking.insertOne({
    nom: "CoWork Ottawa ByWard",
    telephone: "+1 613-000-0002",
    description: "Espace de travail moderne au cœur du marché ByWard d'Ottawa",
    adresse: {
        rue: "Rue York",
        numero: "55",
        ville: "Ottawa",
        code_postal: "K1N 5T2",
        province: "Ontario",
        pays: "Canada",
        complement: "Étage 1"
    },
    horaires_ouverture: [
        { jour: "lundi", heure_ouverture: "07:00", heure_fermeture: "21:00", ferme: false },
        { jour: "mardi", heure_ouverture: "07:00", heure_fermeture: "21:00", ferme: false },
        { jour: "mercredi", heure_ouverture: "07:00", heure_fermeture: "21:00", ferme: false },
        { jour: "jeudi", heure_ouverture: "07:00", heure_fermeture: "21:00", ferme: false },
        { jour: "vendredi", heure_ouverture: "07:00", heure_fermeture: "19:00", ferme: false },
        { jour: "samedi", heure_ouverture: "09:00", heure_fermeture: "17:00", ferme: false },
        { jour: "dimanche", heure_ouverture: null, heure_fermeture: null, ferme: true }
    ]
})


// Salles
const salle1 = db.salles.insertOne({
    espace_id: espace1.insertedId,
    nom: "Salle Boréale",
    capacite: 8,
    type: "reunion",
    superficie_m2: Double(25),
    prix_heure: Double(35),
    prix_journee: Double(210),
    disponible: true,
    note_moyenne: 4.3,
    nombre_avis: 12,
    equipements: [
        { nom: "Projecteur HD", type: "technologique", quantite: 1 },
        { nom: "Tableau blanc", type: "mobilier", quantite: 2 },
        { nom: "Vidéoconférence", type: "technologique", quantite: 1 },
        { nom: "Climatisation", type: "service", quantite: 1 }
    ],
    avis_recents: []
})

const salle2 = db.salles.insertOne({
    espace_id: espace1.insertedId,
    nom: "Bureau Privé Laurentides",
    capacite: 2,
    type: "bureau_prive",
    superficie_m2: Double(10),
    prix_heure: Double(20),
    prix_journee: Double(120),
    disponible: true,
    note_moyenne: 4.7,
    nombre_avis: 8,
    equipements: [
        { nom: "Écran externe", type: "technologique", quantite: 2 },
        { nom: "Bureau ergonomique", type: "mobilier", quantite: 1 },
        { nom: "WiFi dédié", type: "service", quantite: 1 }
    ],
    avis_recents: []
})

const salle3 = db.salles.insertOne({
    espace_id: espace2.insertedId,
    nom: "Le Hub Capital",
    capacite: 20,
    type: "espace_ouvert",
    superficie_m2: Double(80),
    prix_heure: Double(15),
    prix_journee: Double(90),
    disponible: true,
    note_moyenne: 4.1,
    nombre_avis: 5,
    equipements: [
        { nom: "WiFi haut débit", type: "service", quantite: 1 },
        { nom: "Imprimante", type: "technologique", quantite: 1 },
        { nom: "Casiers", type: "mobilier", quantite: 10 }
    ],
    avis_recents: []
})

// Réservations
const resa1 = db.reservations.insertOne({
    date_debut: ISODate("2026-04-01T09:00:00Z"),
    date_fin: ISODate("2026-04-01T12:00:00Z"),
    statut: "confirmee",
    prix_total: Double(105),
    date_creation: ISODate("2026-03-19T10:00:00Z"),
    utilisateur: {
        _id: user1.insertedId,
        nom: "Talling",
        prenom: "Channel",
        email: "2751491@coworking.ca"
    },
    salle: {
        _id: salle1.insertedId,
        nom: "Salle Boréale",
        type: "reunion",
        capacite: 8,
        espace_nom: "CoWork Québec Vieux-Port"
    },
    paiement: {
        montant: Double(105),
        date_paiement: ISODate("2026-03-19T10:05:00Z"),
        methode: "carte",
        statut: "effectue",
        reference_transaction: "TXN-20260401-0001"
    }
})

const resa2 = db.reservations.insertOne({
    date_debut: ISODate("2026-04-02T13:00:00Z"),
    date_fin: ISODate("2026-04-02T18:00:00Z"),
    statut: "confirmee",
    prix_total: Double(100),
    date_creation: ISODate("2026-03-19T11:00:00Z"),
    utilisateur: {
        _id: user2.insertedId,
        nom: "Mutanda",
        prenom: "Josue",
        email: "2751096@coworking.ca"
    },
    salle: {
        _id: salle2.insertedId,
        nom: "Bureau Privé Laurentides",
        type: "bureau_prive",
        capacite: 2,
        espace_nom: "CoWork Québec Vieux-Port"
    },
    paiement: {
        montant: Double(100),
        date_paiement: ISODate("2026-03-19T11:05:00Z"),
        methode: "virement",
        statut: "effectue",
        reference_transaction: "TXN-20260402-0002"
    }
})

const resa3 = db.reservations.insertOne({
    date_debut: ISODate("2026-04-03T08:00:00Z"),
    date_fin: ISODate("2026-04-03T17:00:00Z"),
    statut: "annulee",
    prix_total: Double(90),
    date_creation: ISODate("2026-03-20T08:00:00Z"),
    utilisateur: {
        _id: user1.insertedId,
        nom: "Talling",
        prenom: "Channel",
        email: "2751491@coworking.ca"
    },
    salle: {
        _id: salle3.insertedId,
        nom: "Le Hub Capital",
        type: "espace_ouvert",
        capacite: 20,
        espace_nom: "CoWork Ottawa ByWard"
    },
    paiement: {
        montant: Double(90),
        date_paiement: ISODate("2026-03-20T08:10:00Z"),
        methode: "carte",
        statut: "rembourse",
        reference_transaction: "TXN-20260403-0003"
    }
})

// Avis
db.avis.insertMany([
    {
        salle_id: salle1.insertedId,
        utilisateur_id: user1.insertedId,
        utilisateur_nom: "Channel T.",
        note: 5,
        commentaire: "Salle très bien équipée, parfaite pour nos réunions d'équipe.",
        date: ISODate("2026-03-15T14:30:00Z")
    },
    {
        salle_id: salle1.insertedId,
        utilisateur_id: user2.insertedId,
        utilisateur_nom: "Josue M.",
        note: 4,
        commentaire: "Bonne salle, le projecteur est un peu vieux mais fonctionnel.",
        date: ISODate("2026-03-10T10:00:00Z")
    },
    {
        salle_id: salle2.insertedId,
        utilisateur_id: user2.insertedId,
        utilisateur_nom: "Josue M.",
        note: 5,
        commentaire: "Bureau calme et très bien installé, je reviendrai.",
        date: ISODate("2026-03-12T16:00:00Z")
    },
    {
        salle_id: salle3.insertedId,
        utilisateur_id: user1.insertedId,
        utilisateur_nom: "Channel T.",
        note: 4,
        commentaire: "Grand espace agréable, idéal pour travailler en équipe.",
        date: ISODate("2026-03-05T09:00:00Z")
    }
])
