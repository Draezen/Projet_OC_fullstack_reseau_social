//in controllers
const ArticleSchema = require("../Models/ArticleSchema")
const CommentSchema = require("../Models/CommentSchema")
const LikeSchema = require("../Models/LikeSchema")

const renameFile = require("../middleware/renameFile")

const fs = require("fs")
const jwt = require("jsonwebtoken")

exports.getAllArticles = (req, res, next) => {
    const article = new ArticleSchema()

    article.getAllArticles()
        .then(response => res.status(201).json(response))
        .catch(error => res.status(500).json({ error }))
}

exports.createArticle = (req, res, next) => {
    const article = new ArticleSchema()

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
                const imageUrl = `${req.protocol}://${req.get("host")}/images/${fileName}`
                const values = [userId, req.body.heading, req.body.text, imageUrl]
        
                article.createArticleWithImage(values)
                    .then(response => res.status(201).json(response))
                    .catch(error => res.status(500).json({ error }))
            }
        })
    } else {
        const values = [userId, req.body.heading, req.body.text]

        article.createArticleOnlyText(values)
            .then(response => res.status(201).json(response))
            .catch(error => res.status(500).json({ error }))
    }
}

exports.modifyArticle = (req, res, next) => {
    const article = new ArticleSchema()

    article.getOneArticle(req.params.id)
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
                        const imageUrl = `${req.protocol}://${req.get("host")}/images/${fileName}`
                        const values = [req.body.heading, req.body.text, imageUrl, req.params.id]
                
                        //delete last image
                        fileToDelete ? fs.unlinkSync(`images/${fileToDelete}`) : null

                        article.modifyArticleWithImage(values)
                            .then(response => res.status(201).json(response))
                            .catch(error => res.status(500).json({ error }))
                    }
                })
            } else {
                const values = [req.body.heading, req.body.text, req.params.id]
        
                article.modifyArticleOnlyText(values)
                    .then(response => res.status(201).json(response))
                    .catch(error => res.status(500).json({ error }))
            }
        })
        .catch(error => res.status(500).json({ error }))
        
}

exports.deleteArticle = (req, res, next) => {
    const article = new ArticleSchema()

    article.getOneArticle(req.params.id)
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
            } else if (data.image === null){
                article.deleteArticle(req.params.id)
                    .then( response => res.status(200).json(response))
                    .catch(error => res.status(500).json({ error : error }))
            }else {
                 //return name of the image 
                const filename = data.image.split("/images")[1]
                //delete image
                fs.unlink(`images/${filename}`, () =>{
                    article.deleteArticle(req.params.id)
                        .then( response => res.status(200).json(response))
                        .catch(error => res.status(500).json({ error : error })) 
                })

            }
        })
        .catch(error => res.status(500).json({ error }))
}

exports.likeArticle = (req, res, next) => {
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

    like.getLikeArticle(values)
        .then(data => {  

            if(req.body.like === 0 ){
                like.deleteLikeArticle(data[0].id)
                    .then(response => res.status(201).json({ message : response }))
                    .catch(error => res.status(500).json({ error })) 
            }else {
                res.status(200).json({ message : "Vous avez déjà noté cet article !" })
            }
        })
        .catch(error => {
            if("syntax error"){
                values = [userId, req.params.id, req.body.like]

                if(req.body.like === 0){
                    res.status(400).json({ error : "Le like doit être 1 ou -1" })
                }else {
                    like.createLikeArticle(values)
                        .then(response => res.status(201).json({ message : response }))
                        .catch(error => res.status(500).json({ error })) 
                }
            }else {
                res.status(500).json({ error })
            }
        })

}

exports.commentArticle = (req, res, next) => {
    const comment = new CommentSchema()
    
    //split authorisation header to get the token part
    const token = req.headers.authorization.split(" ")[1]
    //check token with encoding key 
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
    //get the id
    const userId = decodedToken.userId
    
    const values = [userId, req.params.id, req.body.text]

    comment.createCommentArticle(values)
        .then(response => res.status(201).json(response))
        .catch(error => res.status(500).json({ error }))
}


