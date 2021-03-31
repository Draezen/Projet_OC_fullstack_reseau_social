//in controllers
const CommentManager = require("../Models/CommentManager")
const LikeManager = require("../Models/LikeManager")

exports.getAllComments = (req, res, next) => {
    const comment = new CommentManager()

    const values = [req.params.id]

    comment.getAllComments(values)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(error => res.status(500).json({ error }))

}

exports.modifyComment = (req, res, next) => {
    const comment = new CommentManager()

    comment.getOneComment([req.params.id])
        .then(data => {
            //get the id
            const userId = req.token.userId
            //get user role
            const userRole = req.token.userRole

            if(data[0].idAuthor !== userId  && userRole !== "admin"){
                res.status(401).json({ error : "User ID non valide !" })
            }else {
                const values = [req.body.text, data[0].id]

                comment.modifyComment(values)
                    .then(response => res.status(201).json(response))
                    .catch(error => res.status(500).json({ error })) 
            }
        })
        .catch(error => res.status(500).json({ error }))

}

exports.deleteComment = (req, res, next) => {
    const comment = new CommentManager()

    comment.getOneComment([req.params.id])
        .then(data => {
            //get the id
            const userId = req.token.userId
            //get user role
            const userRole = req.token.userRole

            if(data[0].idAuthor !== userId  && userRole !== "admin"){
                res.status(401).json({ error : "User ID non valide !" })
            }else {
                const values = [data[0].id]

                comment.deleteComment(values)
                    .then(response => res.status(201).json(response))
                    .catch(error => res.status(500).json({ error })) 
            }
        })
        .catch(error => res.status(500).json({ error }))
}

exports.likeComment = (req, res, next) => {
    const like = new LikeManager()
    let values = [] 

    //get the id
    const userId = req.token.userId
    
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
                res.status(200).json({ message : "Vous avez déjà noté ce commentaire !" })
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
