//in controllers
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const maskData = require("maskdata")

const UserSchema = require("../Models/UserSchema")

exports.getOneUser = (req, res, next) => {
    const user = new UserSchema()

    user.getOneUser(req.params.id)
        .then( data => {
            //split authorisation header to get the token part
            const token = req.headers.authorization.split(" ")[1]
            //check token with encoding key 
            const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
            //get the id
            const userId = decodedToken.userId

            if(data.id !== userId){
                res.status(401).json({ error : "User ID non valide !" })
            } else {
                const user = {
                    ...data
                }
                res.status(200).json({ user })
            }
               
        })
        .catch(error => res.status(500).json({ error : "Utilisateur inconnu !"  }))
}

exports.modifyUser = (req, res, next) => {
    const user = new UserSchema()
    let values = []

    user.getUserToModify(req.params.id)
        .then(data => {
            //split authorisation header to get the token part
            const token = req.headers.authorization.split(" ")[1]
            //check token with encoding key 
            const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
            //get the id
            const userId = decodedToken.userId
            
            if(data.id !== userId){
                return res.status(401).json({ error : "User ID non valide !" })
            } else if (req.body.email) {   
                const emailMask = maskData.maskEmail2(req.body.email)
                values =[req.body.email, emailMask, req.body.lastName, req.body.firstName, req.body.avatarId, req.params.id]
            } else {
                values =[req.body.lastName, req.body.firstName, req.body.avatarId, req.params.id]
            }

            user.modifyProfil(values)
                .then(response => { return res.status(200).json({ response })})
                .catch(error => res.status(500).json({ error : error }))
        })
        .catch(error => res.status(500).json({ error : "Utilisateur inconnu !" }))
}

exports.modifyPassword = (req, res, next) => {
    const user = new UserSchema()

    user.getUserToModify(req.params.id)
        .then(data => {
            //split authorisation header to get the token part
            const token = req.headers.authorization.split(" ")[1]
            //check token with encoding key 
            const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
            //get the id
            const userId = decodedToken.userId
            
            if(data.id !== userId){
                res.status(401).json({ error : "User ID non valide !" })
            } else {   
                bcrypt.compare(req.body.oldPassword, data.password)
                    .then(valid => {
                        if(!valid) {
                            return res.status(401).json({ error : "Mauvais mot de passe !" }) 
                        }
                        //hash of password, method async
                        bcrypt.hash(req.body.newPassword, 10)
                            .then ( hash => {
                                //const set = "password = ?"
                                const values = [hash, req.params.id]
                                
                                user.modifyPassword(values)
                                    .then(response => res.status(200).json({ response }))
                                    .catch(error => res.status(500).json({ error : error }))
                            })
                            .catch(error => res.status(500).json({ error }))
                    })
                    .catch(error => res.status(500).json({ error : "Erreur avec le mot de passe !" }))
            }
        })
        .catch(error => res.status(500).json({ error : "Utilisateur inconnu !" }))
}

exports.deleteUser = (req, res, next) => {
    const user = new UserSchema()

    user.getUserToModify(req.params.id)
        .then(data => {
            //split authorisation header to get the token part
            const token = req.headers.authorization.split(" ")[1]
            //check token with encoding key 
            const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
            //get the id
            const userId = decodedToken.userId
            
            if(data.id !== userId){
                res.status(401).json({ error : "User ID non valide !" })
            } else {
                user.deleteUser(req.params.id)
                    .then( response => res.status(200).json(response))
                    .catch(error => res.status(500).json({ error : error }))
            }
        })
        .catch(error => res.status(500).json({ error : "Utilisateur inconnu !" }))
}


