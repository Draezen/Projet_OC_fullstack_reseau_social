//in controllers
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cryptoJS = require("crypto-js")
const maskData = require("maskdata")

const UserSchema = require("../Models/UserSchema")

exports.getOneUser = (req, res, next) => {
    const user = new UserSchema()
    const where = "id = ?"

    user.readUser(where, req.params.id)
        .then( data => {
            //split authorisation header to get the token part
            const token = req.headers.authorization.split(" ")[1]
            //check token with encoding key 
            const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
            //get the id
            const userId = decodedToken.userId

            if(data.id !== userId){
                res.status(401).json({ error : "Invalid user Id !" })
            } else {
                const user = {
                    emailMask : data.emailMask,
                    lastName : data.lastName,
                    firstName : data.firstName,
                    avatarId : data.avatarId
                }
                res.status(200).json({ user })
            }
               
        })
        .catch(error => res.status(500).json({ error : "Unknow Id !" }))
}

exports.modifyUser = (req, res, next) => {
    const user = new UserSchema()
    const where = "id = ?"
    let set = ""
    let values = []

    user.readUser(where, req.params.id)
        .then(data => {
            //split authorisation header to get the token part
            const token = req.headers.authorization.split(" ")[1]
            //check token with encoding key 
            const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
            //get the id
            const userId = decodedToken.userId
            
            if(data.id !== userId){
                return res.status(401).json({ error : "Invalid user Id !" })
            } else if (req.body.email) {   
                set = "email = ?, emailMask = ?, lastName = ?, firstName = ?, avatarId = ?"
                const email = cryptoJS.HmacSHA512(req.body.email, process.env.CRYPTO_JS_KEY).toString()
                const emailMask = maskData.maskEmail2(req.body.email)
                values =[email, emailMask, req.body.lastName, req.body.firstName, req.body.avatarId, req.params.id]
            } else {
                set = "lastName = ?, firstName = ?, avatarId = ?"
                values =[req.body.lastName, req.body.firstName, req.body.avatarId, req.params.id]
            }

            user.updateUser(set, where, values)
                .then(response => { return res.status(200).json({ response })})
                .catch(error => res.status(500).json({ error : error }))
        
        })
        .catch(error => res.status(500).json({ error : "Unknow Id !" }))
}

exports.modifyPassword = (req, res, next) => {
    const user = new UserSchema()
    const where = "id = ?"

    user.readUser(where, req.params.id)
        .then(data => {
            //split authorisation header to get the token part
            const token = req.headers.authorization.split(" ")[1]
            //check token with encoding key 
            const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
            //get the id
            const userId = decodedToken.userId
            
            if(data.id !== userId){
                res.status(401).json({ error : "Invalid user Id !" })
            } else {   
                bcrypt.compare(req.body.oldPassword, data.password)
                    .then(valid => {
                        if(!valid) {
                            return res.status(401).json({ error : "Wrong password !" }) 
                        }
                        //hash of password, method async
                        bcrypt.hash(req.body.newPassword, 10)
                            .then ( hash => {
                                const set = "password = ?"
                                const values = [hash, req.params.id]
                                
                                user.updateUser(set, where, values)
                                    .then(response => res.status(200).json({ response }))
                                    .catch(error => res.status(500).json({ error : error }))
                            })
                            .catch(error => res.status(500).json({ error }))
                    })
                    .catch(error => res.status(500).json({ error : "Error with password !" }))
            }
        })
        .catch(error => res.status(500).json({ error : "Unknow Id !" }))
}

exports.deleteUser = (req, res, next) => {
    const user = new UserSchema()
    const where = "id = ?"

    user.readUser(where, req.params.id)
        .then(data => {
            //split authorisation header to get the token part
            const token = req.headers.authorization.split(" ")[1]
            //check token with encoding key 
            const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
            //get the id
            const userId = decodedToken.userId
            
            if(data.id !== userId){
                res.status(401).json({ error : "Invalid user Id !" })
            } else {
                user.deleteUser(where, req.params.id)
                    .then( response => res.status(200).json(response))
                    .catch(error => res.status(500).json({ error : error }))
            }
        })
        .catch(error => res.status(500).json({ error : "Unknow Id !" }))
}


