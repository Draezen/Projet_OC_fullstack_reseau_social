//in controllers
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const maskData = require("maskdata")

const UserSchema = require("../Models/UserSchema")

exports.signup = (req, res, next) => {
    const user = new UserSchema()   
    
    user.getAllUsersToSignup(req.body.email)
        .then(response => {
            //hash of password, method async
            bcrypt.hash(req.body.password, 10)
                .then ( hash => {
                    //create a new user
                    const emailMask = maskData.maskEmail2(req.body.email)
                    const values = [emailMask, hash, req.body.avatarId]

                    user.signup(req.body.email, req.body.lastName, req.body.firstName, values)
                        .then(response => res.status(201).json(response))
                        .catch(error => res.status(500).json({ error }))
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))


}

exports.login = (req, res, next) => {
    const user = new UserSchema()
    const values = req.body.email

    user.login(values)
        .then(data => {
            //console.log(data);
            bcrypt.compare(req.body.password, data.password)
                .then(valid => {
                    if(!valid) {
                        return res.status(401).json({ error : "Email ou mot de passe incorrect !" }) 
                    }
                    res.status(200).json({ 
                        userId: data.id,
                        token: jwt.sign(
                            {userId : data.id,
                            userRole:data.role},
                            process.env.JWT_TOKEN,
                            {expiresIn: "24h"}
                        )
                    });
                })
                .catch(error => res.status(500).json({ error : "Problème avec le mot de passe !" }))
        })
        .catch(error => res.status(500).json({ error : "Email ou mot de passe incorrect !" }))
}

