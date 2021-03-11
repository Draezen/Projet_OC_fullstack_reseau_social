const mysqlConnection = require("../mysql_connection")

class LikeSchema {
    constructor(){
    }

    createLike(set, values){
        const query = "INSERT INTO likes SET " + set 

        return new Promise( (resolve, reject) => {
            mysqlConnection.query(query, values, (error, results, fields) => {
                if (error) {
                    reject(error.message)
                } else {
                    resolve("Like créé !")
                }
            })
        })
    }

    readLike(where, values){
        const query = "SELECT * FROM likes WHERE " + where

        return new Promise( (resolve, reject) => {
            mysqlConnection.query(query, values, (error, results, fields) => {
                if (error) {
                   reject(error)
                } else {
                    switch (results.length){
                        case 0 :
                            reject("Erreut de syntaxe")
                            break
                        case 1 :
                            const data = {
                                ...results[0]
                            }
                            resolve(data)
                            break
                        default :
                        resolve(results)
                        break
                    }
                }
            })
        })
    }

    deleteLike(where, values){
        const query = "DELETE FROM likes WHERE " + where

        return new Promise( (resolve, reject) => {
            mysqlConnection.query(query, values, (error, results, fields) => {
                if (error) {
                    reject(error.message)
                } else {
                    resolve("Like supprimé !")
                }
            })
        })
    }

    getLikeArticle(values){
        const where = "idUser = ? AND idArticle = ?"

        return this.readLike(where, values)
    }

    deleteLikeArticle(values){
        const set = "id = ?"

        return this.deleteLike(set, values)
    }

    createLikeArticle(values){
        const set = "idUser = ?, idArticle = ?, likeDislike = ?"

        return this.createLike(set, values)
    }

    getLikeComment(values){
        const where = "idUser = ? AND idComment = ?"

        return this.readLike(where, values)
    }

    deleteLikeComment(values){
        const set = "id = ?"

        return this.deleteLike(set, values)
    }

    createLikeComment(values){
        const set = "idUser = ?, idComment = ?, likeDislike = ?"

        return this.createLike(set, values)
    }

}

module.exports = LikeSchema