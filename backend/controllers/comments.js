//in controllers
const CommentSchema = require("../Models/CommentSchema")
const LikeSchema = require("../Models/LikeSchema")

const jwt = require("jsonwebtoken")

exports.getAllComments = (req, res, next) => {
    const comment = new CommentSchema()
    const where = " comments.idArticle = ? "
    const select = " comments.id, comments.idArticle, comments.dateCreation, comments.text, users.lastName AS authorLastName, users.firstName AS authorFirstName, avatars.url AS avatarUrl, SUM(CASE WHEN likeDislike = 1 THEN 1 ELSE 0 END) AS nbLikes, SUM(CASE WHEN likeDislike = -1 THEN 1 ELSE 0 END) AS nbDislikes "
    const join = " INNER JOIN users ON comments.idAuthor = users.id INNER JOIN avatars ON users.avatarId = avatars.id LEFT OUTER JOIN likes ON likes.idComment = comments.id "
    const group = " GROUP BY comments.id "
    const order = " ORDER BY dateCreation DESC "

    comment.readComment(where, req.params.id, select, join, group, order)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(error => res.status(500).json({ error }))

}

exports.modifyComment = (req, res, next) => {
    const comment = new CommentSchema()
    const where = "id = ?"

    comment.readComment(where, req.params.id)
        .then(data => {
            //split authorisation header to get the token part
            const token = req.headers.authorization.split(" ")[1]
            //check token with encoding key 
            const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
            //get the id
            const userId = decodedToken.userId

            if(data.idAuthor !== userId){
                res.status(401).json({ error : "Invalid user Id !" })
            }else {
                const set = "text = ?"
                const values = [req.body.text, data.id]

                comment.updateComment(set, where, values)
                    .then(response => res.status(201).json(response))
                    .catch(error => res.status(500).json({ error })) 
            }
        })
        .catch(error => res.status(500).json({ error }))

}

exports.deleteComment = (req, res, next) => {
    const comment = new CommentSchema()
    const where = "id = ?"

    comment.readComment(where, req.params.id)
        .then(data => {
            //split authorisation header to get the token part
            const token = req.headers.authorization.split(" ")[1]
            //check token with encoding key 
            const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
            //get the id
            const userId = decodedToken.userId

            if(data.idAuthor !== userId){
                res.status(401).json({ error : "Invalid user Id !" })
            }else {
                const values = [data.id]

                comment.deleteComment(where, values)
                    .then(response => res.status(201).json(response))
                    .catch(error => res.status(500).json({ error })) 
            }
        })
        .catch(error => res.status(500).json({ error }))
}

exports.likeComment = (req, res, next) => {
    const like = new LikeSchema()
    const where = "idUser = ? AND idComment = ?"
    let values = [] 

    //split authorisation header to get the token part
    const token = req.headers.authorization.split(" ")[1]
    //check token with encoding key 
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
    //get the id
    const userId = decodedToken.userId
    
    //Check if user already liked or disliked the article
    values = [userId, req.params.id]

    like.readLike(where, values)
        .then(data => {     

            const set = "id = ?"
            values = [data.id]

            if(req.body.like === 0){
                like.deleteLike(set, values)
                    .then(response => res.status(201).json(response))
                    .catch(error => res.status(500).json({ error })) 
            }else {
                res.status(400).json({ message : "You already marked this comment !" })
            }
        })
        .catch(error => {
            if("syntax error"){
                const set = "idUser = ?, idComment = ?, likeDislike = ?"
                values = [userId, req.params.id, req.body.like]

                if(req.body.like === 0){
                    res.status(400).json({ error : "Like must be 1 or -1" })
                }else {
                    like.createLike(set, values)
                        .then(response => res.status(201).json(response))
                        .catch(error => res.status(500).json({ error })) 
                }
            }else {
                res.status(500).json({ error })
            }
        })

}
