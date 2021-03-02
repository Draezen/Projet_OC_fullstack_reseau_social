//in controllers
const CommentSchema = require("../Models/CommentSchema")
const LikeSchema = require("../Models/LikeSchema")

const jwt = require("jsonwebtoken")

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

            like.deleteLike(set, values)
                .then(response => res.status(201).json(response))
                .catch(error => res.status(500).json({ error })) 
        })
        .catch(error => {
            if("syntax error"){
                const set = "idUser = ?, idComment = ?, likeDislike = ?"
                values = [userId, req.params.id, req.body.like]
    
                like.createLike(set, values)
                    .then(response => res.status(201).json(response))
                    .catch(error => res.status(500).json({ error })) 
            }else {
                res.status(500).json({ error })
            }
        })

}
