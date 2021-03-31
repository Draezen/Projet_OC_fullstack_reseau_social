//importer express
const express = require("express")
//importer body-parser pour gérer le corps de la demande
const bodyParser = require("body-parser")

//package node pour trouver le chemin d'un ficher/dossier
const path = require("path")

//import du router
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const articlesRoutes = require("./routes/articles")
const commentsRoutes = require("./routes/comments")
const avatarsRoutes = require("./routes/avatars")
const likesRoutes = require("./routes/likes")

//gestion des erreurs 404
const error404 = require("./middleware/errors")

//créer l'application express
const app = express()

app.use((req, res, next) => {
    //permet d'accéder à l'api de n'importe quelle origin
    res.setHeader('Access-Control-Allow-Origin', '*');
    //permet d'ajouter les headers mentionnés aux requêtes envoyées vers notre API 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    //permet d'envoyer des requêtes avec les méthodes mentionnées 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

//analyse du corps de la demande
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//définiition du chemin d'enregistrement des images
app.use("/images", express.static(path.join(__dirname, "images")))

//utilisation du router
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/articles", articlesRoutes)
app.use("/api/comments", commentsRoutes)
app.use("/api/avatars", avatarsRoutes)
app.use("/api/likes", likesRoutes)

//gestion des erreurs 404
app.use(error404)

//exporter l'application pour y accéder depuis les autres fichiers du projet (ex server node)
module.exports = app