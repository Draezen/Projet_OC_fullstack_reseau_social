const mysqlConnection = require("../mysql_connection")

class UserSchema {
    constructor(){
    }

    createUser(set, values){
        const query = "INSERT INTO users SET " + set

        return new Promise( (resolve, reject) => {
            mysqlConnection.query(query, values, (error, results, fields) => {
                if (error) {
                    reject(error.message)
                } else {
                    resolve("User created !")
                }
            })
        })
    }

    readUser(where, values){
        const query = "SELECT * FROM users WHERE " + where

        return new Promise( (resolve, reject) => {
            mysqlConnection.query(query, values, (error, results, fields) => {
                if (error) {
                   reject(error.message)
                } else if (results.length === 0){
                    reject("Syntax error")
                } else {
                    const data = {
                        id : results[0].id,
                        email : results[0].email,
                        emailMask : results[0].email_mask,
                        password : results[0].password,
                        lastName : results[0].last_name,
                        firstName : results[0].first_name,
                        avatarId : results[0].avatar_id,                        
                    }
                    resolve(data)
                }
            })
        })
    }

    updateUser(set, where, values){
        const query = "UPDATE users SET " + set + " WHERE " + where

        return new Promise ( ( resolve, reject) => {
            mysqlConnection.query(query, values, (error, results, fields) => {
                if (error) {
                    reject(error.message)
                } else {
                    resolve("User modified !")
                }
            })
        })
    }

    deleteUser(where, values){
        const query = "DELETE FROM users WHERE " + where

        return new Promise( (resolve, reject) => {
            mysqlConnection.query(query, values, (error, results, fields) => {
                if (error) {
                    reject(error.message)
                } else {
                    resolve("User deleted !")
                }
            })
        })
    }
}

module.exports = UserSchema