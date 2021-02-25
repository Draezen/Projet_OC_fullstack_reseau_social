//in controllers
const bcrypt = require("bcrypt")
const uniqid = require("uniqid")
const cryptoJS = require("crypto-js")

const UserSchema = require("../Models/Users")

exports.signup = (req, res, next) => {
    //hash of password, method async
    bcrypt.hash(req.body.password, 10)
        .then ( hash => {
            //create a new user
            const email = cryptoJS.HmacSHA512(req.body.email, process.env.CRYPTO_JS_KEY).toString()
            const uniqueId = uniqid()

            const user = new UserSchema()

            user.signup(email, hash, uniqueId, res)
        })
        .catch(error => res.status(500).json({ error }))
}

exports.login = (req, res, next) => {
    const user = new UserSchema(req.body.email, req.body.password)

    user.login(req, res)
}

// class AuthController{
//     constructor(userSchema){
//         this.userSchema = userSchema
//     }

//     signup(req, res, next){

//     }

//     login(req, res, next){
//         this.userSchema.login(req, res)
//     }

// }

// const authCtrl = new AuthController(new UserSchema())

// module.exports = authCtrl