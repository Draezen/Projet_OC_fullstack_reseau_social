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

    readUser(where, values, select = "*", join = ""){
        const query = "SELECT " + select + " FROM users " + join +" WHERE " + where
        
        return new Promise( (resolve, reject) => {
            mysqlConnection.query(query, values, (error, results, fields) => {
                if (error) {
                   reject(error.message)
                } else if (results.length === 0){
                    reject("Syntax error")
                } else {
                    const data = {
                        ...results[0]                      
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