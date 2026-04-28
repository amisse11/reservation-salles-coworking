# Reservation de Salles — Coworking (MongoDB)

Projet de gestion d'espaces coworking développé avec MongoDB dans le
cadre du cours de bases de données NoSQL. La base de données
`coworking_db` couvre la modélisation, les requêtes, l'indexation,
les pipelines d'agrégation, la réplication, le sharding et la sécurité.

---

## Documentation

| Fichier | Contenu |
|---|---|
| `IBM Rapport - Projet Coworking (UA2).pdf` | Modélisation, design patterns, CRUD et requêtes |
| `IBM Rapport - Projet Coworking (UA3).pdf` | Indexation, agrégation, réplication, sharding et sécurité |

---

## Fichiers

| Fichier | Description |
|---|---|
| `01_collections.mongodb.js` | Création des collections et structure du schéma |
| `02_index.mongodb.js` | Création de tous les index |
| `03_insertion.mongodb.js` | Insertion des données de test |
| `04_requetes.mongodb.js` | Requêtes principales (conflit de créneaux, annulation, avis) |
| `06_requetes simples.mongodb.js` | Requêtes de base sur les collections |
| `07_pipeline_performance_salle.mongodb.js` | Pipeline — revenus et performances par salle |
| `08_pipeline_analyse_equipements.mongodb.js` | Pipeline — analyse des équipements avec `$unwind` |
| `09_pipeline_jointure_avis_utilisateurs.mongodb.js` | Pipeline — jointure avis/utilisateurs avec `$lookup` |
| `10_pipeline_tableau_bord_global.mongodb.js` | Pipeline — tableau de bord global avec `$facet` |
| `11_evolution_ajout_politique_annulation.mongodb.js` | Migration — ajout du champ `politique_annulation` |
| `12_evolution_ajout_source_reservation.mongodb.js` | Migration — ajout du champ `source_reservation` |
| `12_creation_utilisateurs.mongodb.js` | Création des utilisateurs et gestion des droits |
| `setup_sharding.bash` | Script de configuration du Replica Set et du Sharding |

---

## Stack

- **MongoDB 7.x** — moteur de base de données
- **mongosh** — shell de requêtes
- **MongoDB Compass** — visualisation des données
- **IntelliJ IDEA** — environnement de développement