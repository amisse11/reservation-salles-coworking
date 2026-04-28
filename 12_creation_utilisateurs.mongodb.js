// Création de l'utilisateur admin (Administration complète sur toutes les bases)
use("admin");

db.createUser({
    user: "admin",
    pwd: "AdminPassword123!",
    roles: [
        { role: "userAdminAnyDatabase", db: "admin" },
        { role: "readWriteAnyDatabase", db: "admin" },
        { role: "dbAdminAnyDatabase", db: "admin" },
        { role: 'root', db: 'admin' }
    ]
});

// Création de l'utilisateur application (Lecture/Écriture sur la base coworking_db)
use("coworking_db");

db.createUser({
    user: "app_coworking",
    pwd: "AppSecure456!",
    roles: [
        {
            role: "readWrite",
            db: "coworking_db"
        }
    ],
    customData: {
        description: "Utilisateur pour l'application web coworking"
    }
});

// Création de l'utilisateur analyste (Lecture seule sur la base coworking_db)
db.createUser({
    user: "analyste_coworking",
    pwd: "ReadOnly789!",
    roles: [
        {
            role: "read",
            db: "coworking_db"
        }
    ],
    customData: {
        description: "Accès lecture seule pour analyses et rapports"
    }
});