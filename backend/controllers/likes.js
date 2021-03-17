//in controllers

const LikeSchema = require("../Models/LikeSchema")

const jwt = require("jsonwebtoken")

exports.getUserLikes = (req, res, next) => {
    const like = new LikeSchema()

    //split authorisation header to get the token part
    const token = req.headers.authorization.split(" ")[1]
    //check token with encoding key 
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
    //get the id
    const userId = decodedToken.userId

    like.getUserLikes(userId)
        .then(data => {res.status(200).json(data)})
        .catch(error => res.status(500).json({ error }))
}