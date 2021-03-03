//in controllers
const ArticleSchema = require("../Models/ArticleSchema")
const CommentSchema = require("../Models/CommentSchema")
const LikeSchema = require("../Models/LikeSchema")

const renameFile = require("../middleware/renameFile")

const fs = require("fs")
const jwt = require("jsonwebtoken")

exports.getAllArticles = (req, res, next) => {
    const article = new ArticleSchema()
    const where = " 1 "
    const select = " articles.id, articles.dateCreation, articles.heading, articles.text, articles.image, users.lastName AS authorLastName, users.firstName AS authorFirstName, avatars.url AS avatarUrl, likesCount.nbLikes, likesCount.nbDislikes, SUM(CASE WHEN comments.idArticle = articles.id THEN 1 ELSE 0 END) AS nbComments "
    const join = " INNER JOIN users ON articles.idAuthor = users.id INNER JOIN avatars ON users.avatarId = avatars.id LEFT OUTER JOIN comments ON comments.idArticle = articles.id LEFT OUTER JOIN (SELECT idArticle, SUM(CASE WHEN likes.likeDislike = 1 THEN 1 ELSE 0 END) AS nbLikes, SUM(CASE WHEN likes.likeDislike = -1 THEN 1 ELSE 0 END) AS nbDislikes FROM likes GROUP BY idArticle) AS likesCount ON articles.id  = likesCount.idArticle "
    const group = " GROUP BY articles.id "
    const order = " ORDER BY articles.dateCreation DESC "
    const values = []

    article.readArticle(where, values, select, join, group, order)
        .then(response => res.status(201).json(response))
        .catch(error => res.status(500).json({ error }))
}

exports.createArticle = (req, res, next) => {
    const article = new ArticleSchema()
    let set = ""
    let values = []

    //split authorisation header to get the token part
    const token = req.headers.authorization.split(" ")[1]
    //check token with encoding key 
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
    //get the id
    const userId = decodedToken.userId

    if (req.file){
        //create name of the image
        const fileName = renameFile(req.file)
        //save image on the disk
        fs.writeFile("images/"+ fileName , req.file.buffer, (err) => {
            if (err){
                return res.status(400).json({ error : err })
            }else {
                set = "idAuthor = ?, heading = ?, text = ?, image = ?"
                const imageUrl = `${req.protocol}://${req.get("host")}/images/${fileName}`
                values = [userId, req.body.heading, req.body.text, imageUrl]
        
                article.createArticle(set, values)
                    .then(response => res.status(201).json(response))
                    .catch(error => res.status(500).json({ error }))
            }
        })
    } else {
        set = "idAuthor = ?, heading = ?, text = ?"
        values = [userId, req.body.heading, req.body.text]

        article.createArticle(set, values)
            .then(response => res.status(201).json(response))
            .catch(error => res.status(500).json({ error }))
    }
}

exports.modifyArticle = (req, res, next) => {
    const article = new ArticleSchema()
    const where = "id = ?"
    let set = ""
    let values = []

    article.readArticle(where, req.params.id)
        .then(data => {
            //split authorisation header to get the token part
            const token = req.headers.authorization.split(" ")[1]
            //check token with encoding key 
            const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
            //get the id
            const userId = decodedToken.userId
            
            if(data.idAuthor !== userId){
                res.status(401).json({ error : "Invalid user Id !" })
            } else  if (req.file){
                //return name if the last image
                const fileToDelete = data.image ? data.image.split("/images/")[1]  : null
                //create name of the image
                const fileName = renameFile(req.file)
                //save image on the disk
                fs.writeFile("images/"+ fileName , req.file.buffer, (err) => {
                    if (err){
                        return res.status(400).json({ error : err })
                    }else {
                        set = "heading = ?, text = ?, image = ?"
                        const imageUrl = `${req.protocol}://${req.get("host")}/images/${fileName}`
                        values = [req.body.heading, req.body.text, imageUrl, req.params.id]
                
                        //delete last image
                        fileToDelete ? fs.unlinkSync(`images/${fileToDelete}`) : null

                        article.updateArticle(set, where, values)
                            .then(response => res.status(201).json(response))
                            .catch(error => res.status(500).json({ error }))
                    }
                })
            } else {
                set = "heading = ?, text = ?"
                values = [req.body.heading, req.body.text, req.params.id]
        
                article.updateArticle(set, where, values)
                    .then(response => res.status(201).json(response))
                    .catch(error => res.status(500).json({ error }))
            }
        })
        .catch(error => res.status(500).json({ error }))
        
}

exports.deleteArticle = (req, res, next) => {
    const article = new ArticleSchema()
    const where = "id = ?"

    article.readArticle(where, req.params.id)
        .then(data => {
            //split authorisation header to get the token part
            const token = req.headers.authorization.split(" ")[1]
            //check token with encoding key 
            const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
            //get the id
            const userId = decodedToken.userId
            
            if(data.idAuthor !== userId){
                res.status(401).json({ error : "Invalid user Id !" })
            } else if (data.image === null){
                article.deleteArticle(where, req.params.id)
                    .then( response => res.status(200).json(response))
                    .catch(error => res.status(500).json({ error : error }))
            }else {
                 //return name of the image 
                const filename = data.image.split("/images")[1]
                //delete image
                fs.unlink(`images/${filename}`, () =>{
                    article.deleteArticle(where, req.params.id)
                        .then( response => res.status(200).json(response))
                        .catch(error => res.status(500).json({ error : error })) 
                })

            }
        })
        .catch(error => res.status(500).json({ error }))
}

exports.likeArticle = (req, res, next) => {
    const like = new LikeSchema()
    const where = "idUser = ? AND idArticle = ?"
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
                const set = "idUser = ?, idArticle = ?, likeDislike = ?"
                values = [userId, req.params.id, req.body.like]
    
                like.createLike(set, values)
                    .then(response => res.status(201).json(response))
                    .catch(error => res.status(500).json({ error })) 
            }else {
                res.status(500).json({ error })
            }
        })

}

exports.commentArticle = (req, res, next) => {
    const comment = new CommentSchema()
    const set = "idAuthor = ?, idArticle = ?, text = ?"
    
    //split authorisation header to get the token part
    const token = req.headers.authorization.split(" ")[1]
    //check token with encoding key 
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
    //get the id
    const userId = decodedToken.userId
    
    const values = [userId, req.params.id, req.body.text]

    comment.createComment(set, values)
        .then(response => res.status(201).json(response))
        .catch(error => res.status(500).json({ error }))
}


