//in controllers
const bcrypt = require("bcrypt")
const cryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

const UserSchema = require("../Models/UserSchema")

exports.signup = (req, res, next) => {
    //hash of password, method async
    bcrypt.hash(req.body.password, 10)
        .then ( hash => {
            //create a new user
            const email = cryptoJS.HmacSHA512(req.body.email, process.env.CRYPTO_JS_KEY).toString()

            const user = new UserSchema()

            user.signup(email, hash, res)
        })
        .catch(error => res.status(500).json({ error }))
}

exports.login = (req, res, next) => {
    const user = new UserSchema()

    user.login(req, res)
        .then(response => {
            bcrypt.compare(req.body.password, response[0].password)
                .then(valid => {
                    if(!valid) {
                        return res.status(401).json({ error : "Wrong email or password !" }) 
                    }
                    res.status(200).json({ 
                        user_id: response[0].id,
                        token: jwt.sign(
                            {userId : response[0].id},
                            process.env.JWT_TOKEN,
                            {expiresIn: "24h"}
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }))
    })
        .catch(error => {
            res.status(500).json({ "error" : error })
    })
}

