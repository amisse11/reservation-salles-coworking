use("coworking_db");

// Nettoyage des collections existantes
db.utilisateurs.drop();
db.espaces_coworking.drop();
db.salles.drop();
db.reservations.drop();
db.avis.drop();

// Utilisateur
db.createCollection("utilisateurs", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nom", "prenom", "email", "mot_de_passe", "type"],
            properties: {
                nom: { bsonType: "string" },
                prenom: { bsonType: "string" },
                email: { bsonType: "string", pattern: "^.+@.+\\..+$" },
                telephone: { bsonType: "string" },
                mot_de_passe: { bsonType: "string" },
                type: { enum: ["membre", "visiteur", "admin"] },
                date_inscription: { bsonType: "date" }
            }
        }
    }
})

// Espace Coworking
db.createCollection("espaces_coworking", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nom", "adresse", "horaires_ouverture"],
            properties: {
                nom: { bsonType: "string" },
                telephone: { bsonType: "string" },
                description: { bsonType: "string" },
                adresse: {
                    bsonType: "object",
                    required: ["rue", "numero", "ville", "code_postal", "pays"],
                    properties: {
                        rue: { bsonType: "string" },
                        numero: { bsonType: "string" },
                        ville: { bsonType: "string" },
                        code_postal: { bsonType: "string" },
                        province: { bsonType: "string" },
                        pays: { bsonType: "string" }
                    }
                },
                horaires_ouverture: {
                    bsonType: "array",
                    items: {
                        bsonType: "object",
                        required: ["jour", "ferme"],
                        properties: {
                            jour: { enum: ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"] },
                            heure_ouverture: { bsonType: ["string", "null"] },
                            heure_fermeture: { bsonType: ["string", "null"] },
                            ferme: { bsonType: "bool" }
                        }
                    }
                }
            }
        }
    }
})

// Salles
db.createCollection("salles", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["espace_id", "nom", "capacite", "type", "prix_heure"],
            properties: {
                espace_id: { bsonType: "objectId" },
                nom: { bsonType: "string" },
                capacite: { bsonType: "int" },
                type: { enum: ["reunion", "bureau_prive", "espace_ouvert", "cabine"] },
                superficie_m2: { bsonType: "double" },
                prix_heure: { bsonType: "double" },
                prix_journee: { bsonType: "double" },
                disponible: { bsonType: "bool" },
                note_moyenne: { bsonType: "double" },
                nombre_avis: { bsonType: "int" },
                equipements: {
                    bsonType: "array",
                    items: {
                        bsonType: "object",
                        required: ["nom", "type", "quantite"],
                        properties: {
                            nom: { bsonType: "string" },
                            type: { enum: ["technologique", "mobilier", "service"] },
                            quantite: { bsonType: "int" }
                        }
                    }
                },
                avis_recents: { bsonType: "array" }
            }
        }
    }
})

// Réservations
db.createCollection("reservations", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["date_debut", "date_fin", "statut", "utilisateur", "salle"],
            properties: {
                date_debut: { bsonType: "date" },
                date_fin: { bsonType: "date" },
                statut: { enum: ["en_attente", "confirmee", "annulee", "terminee"] },
                prix_total: { bsonType: "double" },
                date_creation: { bsonType: "date" },
                utilisateur: {
                    bsonType: "object",
                    required: ["_id", "nom", "prenom", "email"],
                    properties: {
                        _id: { bsonType: "objectId" },
                        nom: { bsonType: "string" },
                        prenom: { bsonType: "string" },
                        email: { bsonType: "string" }
                    }
                },
                salle: {
                    bsonType: "object",
                    required: ["_id", "nom", "type"],
                    properties: {
                        _id: { bsonType: "objectId" },
                        nom: { bsonType: "string" },
                        type: { bsonType: "string" },
                        capacite: { bsonType: "int" },
                        espace_nom: { bsonType: "string" }
                    }
                },
                paiement: {
                    bsonType: "object",
                    properties: {
                        montant: { bsonType: "double" },
                        date_paiement: { bsonType: "date" },
                        methode: { enum: ["carte", "virement", "especes"] },
                        statut: { enum: ["en_attente", "effectue", "rembourse"] },
                        reference_transaction: { bsonType: "string" }
                    }
                }
            }
        }
    }
})

// Avis
db.createCollection("avis", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["salle_id", "utilisateur_id", "note"],
            properties: {
                salle_id: { bsonType: "objectId" },
                utilisateur_id: { bsonType: "objectId" },
                utilisateur_nom: { bsonType: "string" },
                note: { bsonType: "int", minimum: 1, maximum: 5 },
                commentaire: { bsonType: "string" },
                date: { bsonType: "date" }
            }
        }
    }
})