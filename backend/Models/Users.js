const mysqlConnection = require("../mysql_connection")

const bcrypt = require("bcrypt")
const cryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

class UserSchema {
    constructor(){
    }

    signup(email, password, uniqueId, res){
        const query = "INSERT INTO users SET email = ?, password = ?, unique_id = ?"
        const values = [email, password, uniqueId]

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

        mysqlConnection.query(query, values, (error, results, fields) => {
            if (error) {
                const errorMessage = error.message
                res.status(400).json({ errorMessage }) 
            } else if (results.length > 0){
                bcrypt.compare(req.body.password, results[0].password)
                    .then(valid => {
                        if(!valid) {
                            return res.status(401).json({ error : "Wrong email or password !" }) 
                        }
                        res.status(200).json({ 
                            user_id: results[0].unique_id,
                            token: jwt.sign(
                                {userId : results[0].unique_id},
                                process.env.JWT_TOKEN,
                                {expiresIn: "24h"}
                            )
                        });
                    })
                    .catch(error => res.status(500).json({ error }))
            } else {
                res.status(401).json({ error : "Wrong email or password !" }) 
            }
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