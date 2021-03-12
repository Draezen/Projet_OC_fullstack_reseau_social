const { threadId } = require("../mysql_connection")
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
                    resolve("Utilisateur créé !")
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
                    reject("Erreur de syntaxe")
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
                    resolve("Utilisateur modifié !")
                }
            })
        })
    }

    deleteUser(values){
        const where = "id = ?"
        const query = "DELETE FROM users WHERE " + where

        return new Promise( (resolve, reject) => {
            mysqlConnection.query(query, values, (error, results, fields) => {
                if (error) {
                    reject(error.message)
                } else {
                    resolve("Utilisateur supprimé !")
                }
            })
        })
    }

    signup(values){
        const set = "email = ?, emailMask = ?, password = ?, lastName = ?, firstName = ?, avatarId = ?"

        return this.createUser(set, values)
    }
    
    login(values){
        const where = "email = ?"

        return this.readUser(where, values)
    }

    getOneUser(values){
        const where = "users.id = ?"
        const select = "users.id, users.emailMask, users.lastName, users.firstName, avatarId ,avatars.url AS avatarUrl"
        const join = "INNER JOIN avatars ON users.avatarId = avatars.id"

        return this.readUser(where, values, select, join)
    }

    getUserToModify(values){
        const where = "id = ?"

        return this.readUser(where, values)
    }

    modifyProfil(values){
        const where = "id = ?"
        const set = values.length === 6 ? "email = ?, emailMask = ?, lastName = ?, firstName = ?, avatarId = ?" : "lastName = ?, firstName = ?, avatarId = ?"

        return this.updateUser(set, where, values)
    }

    modifyPassword(values){
        const where = "id = ?"
        const set = "password = ?"

        return this.updateUser(set, where, values)
    }

}

module.exports = UserSchema