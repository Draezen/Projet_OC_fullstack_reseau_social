//in controllers
const CommentSchema = require("../Models/CommentSchema")
const LikeSchema = require("../Models/LikeSchema")

const jwt = require("jsonwebtoken")

exports.getAllComments = (req, res, next) => {
    const comment = new CommentSchema()

    comment.getAllComments(req.params.id)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(error => res.status(500).json({ error }))

}

exports.modifyComment = (req, res, next) => {
    const comment = new CommentSchema()

    comment.getOneComment(req.params.id)
        .then(data => {
            //split authorisation header to get the token part
            const token = req.headers.authorization.split(" ")[1]
            //check token with encoding key 
            const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
            //get the id
            const userId = decodedToken.userId
            //get user role
            const userRole = decodedToken.userRole

            if(data.idAuthor !== userId  && userRole !== "admin"){
                res.status(401).json({ error : "User ID non valide !" })
            }else {
                const values = [req.body.text, data.id]

                comment.modifyComment(values)
                    .then(response => res.status(201).json(response))
                    .catch(error => res.status(500).json({ error })) 
            }
        })
        .catch(error => res.status(500).json({ error }))

}

exports.deleteComment = (req, res, next) => {
    const comment = new CommentSchema()

    comment.getOneComment(req.params.id)
        .then(data => {
            //split authorisation header to get the token part
            const token = req.headers.authorization.split(" ")[1]
            //check token with encoding key 
            const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
            //get the id
            const userId = decodedToken.userId
            //get user role
            const userRole = decodedToken.userRole

            if(data.idAuthor !== userId  && userRole !== "admin"){
                res.status(401).json({ error : "User ID non valide !" })
            }else {
                const values = [data.id]

                comment.deleteComment(values)
                    .then(response => res.status(201).json(response))
                    .catch(error => res.status(500).json({ error })) 
            }
        })
        .catch(error => res.status(500).json({ error }))
}

exports.likeComment = (req, res, next) => {
    const like = new LikeSchema()
    let values = [] 

    //split authorisation header to get the token part
    const token = req.headers.authorization.split(" ")[1]
    //check token with encoding key 
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
    //get the id
    const userId = decodedToken.userId
    
    //Check if user already liked or disliked the article
    values = [userId, req.params.id]

    like.getLikeComment(values)
        .then(data => {     

            values = [data[0].id]

            if(req.body.like === 0){
                like.deleteLikeComment(values)
                    .then(response => res.status(201).json({ message : response}))
                    .catch(error => res.status(500).json({ error })) 
            }else {
                res.status(400).json({ message : "Vous avez déjà noté ce commentaire !" })
            }
        })
        .catch(error => {
            if("syntax error"){
                values = [userId, req.params.id, req.body.like]

                if(req.body.like === 0){
                    res.status(400).json({ error : "Le like doit être 1 ou -1" })
                }else {
                    like.createLikeComment(values)
                        .then(response => res.status(201).json({ message : response }))
                        .catch(error => res.status(500).json({ error })) 
                }
            }else {
                res.status(500).json({ error })
            }
        })

}
