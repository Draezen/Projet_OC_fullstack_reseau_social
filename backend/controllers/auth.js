//in controllers
const bcrypt = require("bcrypt")
const uniqid = require("uniqid")
const cryptoJS = require("crypto-js")

const User = require("../Models/Users")

exports.signup = (req, res, next) => {
    //hash of password, method async
    bcrypt.hash(req.body.password, 10)
        .then ( hash => {
            //create a new user
            const email = cryptoJS.HmacSHA512(req.body.email, process.env.CRYPTO_JS_KEY).toString()
            const unique_id = uniqid()

            const user = new User(email, hash, "", "", 1, unique_id)

            user.signup(res)
        })
        .catch(error => res.status(500).json({ error }))
}

exports.login = (req, res, next) => {
    const user = new User(req.body.email, req.body.password)

    user.login(res)
}