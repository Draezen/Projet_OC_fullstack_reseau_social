const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    try {
        //split authorisation header to get the token part
        const token = req.headers.authorization.split(" ")[1]
        //decoded token
        req.token = jwt.verify(token, process.env.JWT_TOKEN)
        next()
    } catch {
        res.status(401).json({ error : "Token non valide !" })
    }
}

