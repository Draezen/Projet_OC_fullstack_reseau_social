//handler for 404 routes
const error404 = (req, res, next) => {
    res.status(404).json({ error : "Le chemin " + req.url + " n'existe pas !" })
}

module.exports = error404