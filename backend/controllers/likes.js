//in controllers

const LikeManager = require("../Models/LikeManager")


exports.getUserLikes = (req, res, next) => {
    const like = new LikeManager()

    //get the id
    const userId = req.token.userId
    const values = [userId]

    like.getUserLikes(values)
        .then(data => {res.status(200).json(data)})
        .catch(error => {
            if(error === "Pas de like trouvé"){
                res.status(200).json({message : "Cet utilisateur n'a encore rien liké"})
            }else {
                res.status(500).json({ error })
            }
        })
}