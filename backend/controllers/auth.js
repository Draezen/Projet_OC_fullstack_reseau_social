//in controllers
const bcrypt = require("bcrypt")
const cryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")
const maskData = require("maskdata")

const UserSchema = require("../Models/UserSchema")

exports.signup = (req, res, next) => {
    const user = new UserSchema()   
    const set = "email = ?, email_Mask = ?, password = ?"

    //hash of password, method async
    bcrypt.hash(req.body.password, 10)
        .then ( hash => {
            //create a new user
            const email = cryptoJS.HmacSHA512(req.body.email, process.env.CRYPTO_JS_KEY).toString()
            const emailMask = maskData.maskEmail2(req.body.email)
            const values = [email, emailMask, hash]

            user.createUser(set, values)
                .then(response => res.status(201).json(response))
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
}

exports.login = (req, res, next) => {
    const user = new UserSchema()
    const where = "email = ?"
    const values = cryptoJS.HmacSHA512(req.body.email, process.env.CRYPTO_JS_KEY).toString()

    user.readUser(where, values)
        .then(data => {
            bcrypt.compare(req.body.password, data.password)
                .then(valid => {
                    if(!valid) {
                        return res.status(401).json({ error : "Wrong email or password !" }) 
                    }
                    res.status(200).json({ 
                        user_id: data.id,
                        token: jwt.sign(
                            {userId : data.id},
                            process.env.JWT_TOKEN,
                            {expiresIn: "24h"}
                        )
                    });
                })
                .catch(error => res.status(500).json({ error : "Error with password !" }))
    })
        .catch(error => res.status(500).json({ error : "Wrong email or password !" }))
}

