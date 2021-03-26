const mysqlConnection = require("../mysql_connection")

const Cryptr = require("cryptr")
const cryptr = new Cryptr(process.env.CRYPTO_JS_KEY)

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

    readUsers(where, values, select = "*", join = ""){
        const query = "SELECT " + select + " FROM users " + join +" WHERE " + where
        
        return new Promise( (resolve, reject) => {
            mysqlConnection.query(query, values, (error, results, fields) => {
                if (error) {
                   reject(error.message)
                } else if (results.length === 0){
                    reject("Erreur de syntaxe")
                } else {
                    resolve(results)
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

    signup(email, lastName, firstName, values){
        const set = "email = ?, emailMask = ?, password = ?, lastName = ?, firstName = ?, avatarId = ?"
        const emailCipher = cryptr.encrypt(email)
        values.splice(0, 0, emailCipher)
        const lastNameCipher = cryptr.encrypt(lastName)
        values.splice(3, 0, lastNameCipher)
        const firstNameCipher = cryptr.encrypt(firstName)
        values.splice(4, 0, firstNameCipher)

        return this.createUser(set, values)
    }

    login(emailUser){
        const where = " 1 "

        return new Promise( (resolve, reject) => {
            this.readUsers(where)
                .then(usersList => {
                    usersList.forEach(user => {
                        const emailDecipher = cryptr.decrypt(user.email)
                        if (emailDecipher === emailUser){
                            resolve(user)
                        }
                    })
                    reject()
                })
                .catch(error => reject(error))
        })
    }

    getOneUser(values){
        const where = "users.id = ?"
        const select = "users.id, users.email, users.lastName, users.firstName, avatarId ,avatars.url AS avatarUrl, role "
        const join = "INNER JOIN avatars ON users.avatarId = avatars.id"

        return new Promise( (resolve, reject) => {
            this.readUser(where, values, select, join)
                .then(data => {
                    const emailDecipher = cryptr.decrypt(data.email)
                    const lastNameDecipher = cryptr.decrypt(data.lastName)
                    const firstNameDecipher = cryptr.decrypt(data.firstName)
                    const user = {
                        ...data,
                        email : emailDecipher,
                        lastName : lastNameDecipher,
                        firstName : firstNameDecipher
                    }
                    resolve(user)
                })
                .catch(error => reject(error ))
        })
    }

    getUserToModify(values){
        const where = "id = ?"

        return this.readUser(where, values)
    }

    modifyProfil(values){
        const where = "id = ?"
        const set = values.length === 6 ? "email = ?, emailMask = ?, lastName = ?, firstName = ?, avatarId = ?" : "lastName = ?, firstName = ?, avatarId = ?"
        const lastName = values.length === 6 ? values[2] : values[0]
        const firstName = values.length === 6 ? values[3] : values[1]
        
        const lastNameCipher = cryptr.encrypt(lastName)
        const firstNameCipher = cryptr.encrypt(firstName)

        if(values.length === 6) {
            const email = values[0]
            const emailCipher = cryptr.encrypt(email)
            values.splice(0, 1, emailCipher)
            values.splice(2, 1, lastNameCipher)
            values.splice(3, 1, firstNameCipher)
        }else {
            values.splice(0, 1, lastNameCipher)
            values.splice(1, 1, firstNameCipher)
        }

        return this.updateUser(set, where, values)
    }

    modifyPassword(values){
        const where = "id = ?"
        const set = "password = ?"

        return this.updateUser(set, where, values)
    }

    getAllUsersToSignup(emailUser){
        const where = " 1 "
        const values = []
        const select = " email "

        return new Promise( (resolve, reject) => {
            this.readUsers(where, values, select) 
                .then(emailList => {
                    emailList.forEach(email => {
                        const emailDecipher = cryptr.decrypt(email.email)
                        if (emailDecipher === emailUser){
                            reject ("Email ou mot de passe incorrect !")
                        }
                    })
                    resolve()
                })
                .catch(error => {
                    reject(error)
                })
        }) 
    }

}

module.exports = UserSchema