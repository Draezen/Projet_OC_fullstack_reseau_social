//check if body is empty
module.exports = (req, res, next) => {
    if (Object.entries(req.body).length === 0){
        res.status(400).json({ error: "Le corps de la requête ne peut pas être vide" })
    } else {
        next()
    }
}