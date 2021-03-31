const mysqlConnection = require("../mysql_connection")

class LikeManager{
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
                            reject("Pas de like trouvé")
                            break
                        case 1 :
                            resolve(results)
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

    getUserLikes(values){
        const where = "idUser = ?"

        return this.readLike(where, values)
    }
}

module.exports = LikeManager