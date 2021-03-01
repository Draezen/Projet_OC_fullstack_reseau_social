//in controllers
const ArticleSchema = require("../Models/ArticleSchema")

const renameFile = require("../middleware/renameFile")

const fs = require("fs")
const jwt = require("jsonwebtoken")

exports.getAllArticles = (req, res, next) => {
    const article = new ArticleSchema()
    const where = "1"

    article.readArticle(where)
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
        .catch(error => {
            console.log(error);
            res.status(500).json({ error })})
        
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

}

exports.commentArticle = (req, res, next) => {

}


