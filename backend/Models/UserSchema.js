const mysqlConnection = require("../mysql_connection")

const bcrypt = require("bcrypt")
const cryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

class UserSchema {
    constructor(){
    }

    signup(email, password, res){
        const query = "INSERT INTO users SET email = ?, password = ?"
        const values = [email, password]

        mysqlConnection.query(query, values, (error, results, fields) => {
            if (error) {
                const errorMessage = error.message
                res.status(400).json({ errorMessage }) 
            } else {
                res.status(201).json({ message : "User created !" });
            }
        })
    }

    login(req, res){
        const query = "SELECT * FROM users WHERE email = ?"
        const values = cryptoJS.HmacSHA512(req.body.email, process.env.CRYPTO_JS_KEY).toString() 

        return new Promise( (resolve, reject) => {
            mysqlConnection.query(query, values, (error, results, fields) => {
                if (error) {
                    const errorMessage = error.message
                    console.log("1");
                   reject("erreur de connexion")
                } else if (results === undefined){
                    console.log("2");
                    reject("mauvaise syntaxe")
                } else {
                    resolve(results)
                }

            })
        })
    }

    modifyUser(req, res){
        const query = "UPDATE users SET last_name = ?, first_name = ?, avatar_id = ? WHERE unique_id = ?;"
        const values = [req.body.lastName, req.body.firstName, req.body.avatarId, req.params.id]

        mysqlConnection.query(query, values, (error, results, fields) => {
            if (error) {
                const errorMessage = error.message
                res.status(400).json({ errorMessage }) 
            } else {
                res.status(200).json({ message : "User modified !" })
            }
        })
    }

    modifyPassword(req, res){
        const query = "UPDATE users SET password = ? WHERE unique_id = ?;"
        const values = [password, req.params.id]

        mysqlConnection.query(query, values, (error, results, fields) => {
            if (error) {
                const errorMessage = error.message
                res.status(400).json({ errorMessage }) 
            } else {
                res.status(200).json({ message : "User modified !" })
            }
        })
    }

}

module.exports = UserSchema