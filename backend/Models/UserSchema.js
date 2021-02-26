const mysqlConnection = require("../mysql_connection")

class UserSchema {
    constructor(){
    }

    createUser(set, values){
        const query = "INSERT INTO users SET " + set

        return new Promise( (resolve, reject) => {
            mysqlConnection.query(query, values, (error, results, fields) => {
                if (error) {
                    reject("Connection error : " + error.message)
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
                   reject("Connection error : " + error.message)
                } else if (results.length === 0){
                    reject("Syntax error")
                } else {
                    const data = {
                        id : results[0].id,
                        email : results[0].email,
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

    updateUser(){

    }

    deleteUser(where, values){
        const query = "DELETE FROM users WHERE " + where

        return new Promise( (resolve, reject) => {
            mysqlConnection.delete(query, values, (error, results, fields) => {
                if (error) {
                    reject("Connection error : " + error.message)
                } else {
                    resolve("User deleted !")
                }
            })
        })
    }
    // modifyUser(req, res){
    //     const query = "UPDATE users SET last_name = ?, first_name = ?, avatar_id = ? WHERE unique_id = ?;"
    //     const values = [req.body.lastName, req.body.firstName, req.body.avatarId, req.params.id]

    //     mysqlConnection.query(query, values, (error, results, fields) => {
    //         if (error) {
    //             const errorMessage = error.message
    //             res.status(400).json({ errorMessage }) 
    //         } else {
    //             res.status(200).json({ message : "User modified !" })
    //         }
    //     })
    // }

    // modifyPassword(req, res){
    //     const query = "UPDATE users SET password = ? WHERE unique_id = ?;"
    //     const values = [password, req.params.id]

    //     mysqlConnection.query(query, values, (error, results, fields) => {
    //         if (error) {
    //             const errorMessage = error.message
    //             res.status(400).json({ errorMessage }) 
    //         } else {
    //             res.status(200).json({ message : "User modified !" })
    //         }
    //     })
    // }

}

module.exports = UserSchema