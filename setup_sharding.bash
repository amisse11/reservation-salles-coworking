##############################################
# 1. DÉMARRAGE DES SERVEURS CONFIG ET SHARDS
##############################################

# Démarrer le serveur de configuration (config server)
mongod --configsvr --replSet configReplSet --port 27100 --dbpath C:/data/configsvr --bind_ip localhost

# Démarrer le shard 1
mongod --shardsvr --replSet shard1ReplSet --port 27200 --dbpath C:/data/shard1 --bind_ip localhost

# Démarrer le shard 2
mongod --shardsvr --replSet shard2ReplSet --port 27300 --dbpath C:/data/shard2 --bind_ip localhost


##############################################
# 2. INITIALISATION DES REPLICA SETS
##############################################

# Connexion au config server
mongosh --port 27100

# Initialisation du replica set pour le config server
rs.initiate({
  _id: "configReplSet",
  configsvr: true,
  members: [
    { _id: 0, host: "localhost:27100" }
  ]
})


# Connexion au shard 1
mongosh --port 27200

# Initialisation du replica set du shard 1
rs.initiate({
  _id: "shard1ReplSet",
  members: [
    { _id: 0, host: "localhost:27200" }
  ]
})


# Connexion au shard 2
mongosh --port 27300

# Initialisation du replica set du shard 2
rs.initiate({
  _id: "shard2ReplSet",
  members: [
    { _id: 0, host: "localhost:27300" }
  ]
})


##############################################
# 3. DÉMARRAGE DU ROUTEUR (mongos)
##############################################

# Démarrer mongos en pointant vers le config server
mongos --configdb configReplSet/localhost:27100 --port 27020 --bind_ip localhost


##############################################
# 4. CONFIGURATION DU SHARDING
##############################################

# Connexion au routeur mongos
mongosh --port 27020

# Ajouter les shards au cluster
sh.addShard("shard1ReplSet/localhost:27200")
sh.addShard("shard2ReplSet/localhost:27300")

# Activer le sharding sur une collection
sh.shardCollection(
  "coworking_db.reservations",
  { "salle._id": 1, date_debut: 1 }
)


##############################################
# 5. CONNEXION AVEC UTILISATEUR (AUTH)
##############################################

# Connexion avec un utilisateur en lecture seule
mongosh --port 27017 -u "analyste_coworking" -p "ReadOnly789!" --authenticationDatabase "coworking_db"


##############################################
# 6. DÉMARRAGE D’UNE INSTANCE AVEC AUTHENTIFICATION
##############################################

# Démarrer MongoDB avec authentification activée
mongod --auth --port 27017 --dbpath C:/data/rs0 --bind_ip localhost