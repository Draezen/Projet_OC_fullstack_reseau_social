const mysqlConnection = require("../mysql_connection")

const Cryptr = require("cryptr")
const cryptr = new Cryptr(process.env.CRYPTO_JS_KEY)

class CommentSchema {
    constructor(){
    }

    createComment(set, values){
        const query = "INSERT INTO comments SET " + set 

        return new Promise( (resolve, reject) => {
            mysqlConnection.query(query, values, (error, results, fields) => {
                if (error) {
                    reject(error.message)
                } else {
                    resolve("Commentaire créé !")
                }
            })
        })
    }

    readComment(where, values, select = "*", join = "", group = "", order = ""){
        const query = "SELECT " + select + " FROM comments " + join + " WHERE " + where + group + order

        return new Promise( (resolve, reject) => {
            mysqlConnection.query(query, values, (error, results, fields) => {
                if (error) {
                   reject(error.message)
                } else {
                    switch (results.length){
                        case 0 :
                            reject("Erreur de syntaxe")
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

    updateComment(set, where, values){
        const query = "UPDATE comments SET " + set + " WHERE " + where

        return new Promise ( ( resolve, reject) => {
            mysqlConnection.query(query, values, (error, results, fields) => {
                if (error) {
                    reject(error.message)
                } else {
                    resolve("Commentaire modifié !")
                }
            })
        })
    }

    deleteComment(values){
        const where = "id = ?"
        const query = "DELETE FROM comments WHERE " + where

        return new Promise( (resolve, reject) => {
            mysqlConnection.query(query, values, (error, results, fields) => {
                if (error) {
                    reject(error.message)
                } else {
                    resolve("Commentaire supprimé !")
                }
            })
        })
    }

    createCommentArticle(values){
        const set = "idAuthor = ?, idArticle = ?, text = ?"

        return this.createComment(set, values)
    }

    getAllComments(values){
        const where = " comments.idArticle = ? "
        const select = " comments.id, comments.idArticle, comments.dateCreation, comments.text, users.lastName AS authorLastName, users.firstName AS authorFirstName, avatars.url AS avatarUrl, SUM(CASE WHEN likeDislike = 1 THEN 1 ELSE 0 END) AS nbLikes, SUM(CASE WHEN likeDislike = -1 THEN 1 ELSE 0 END) AS nbDislikes "
        const join = " INNER JOIN users ON comments.idAuthor = users.id INNER JOIN avatars ON users.avatarId = avatars.id LEFT OUTER JOIN likes ON likes.idComment = comments.id "
        const group = " GROUP BY comments.id "
        const order = " ORDER BY dateCreation DESC "

        return new Promise( (resolve, reject) => {
            this.readComment(where, values, select, join, group, order)
                .then(comments => {
                    comments.forEach(comment => {
                        const authorLastName = comment.authorLastName
                        const authorFirstName = comment.authorFirstName
                        const authorLastNameDecipher = cryptr.decrypt(authorLastName)
                        const authorFirstNameDecipher = cryptr.decrypt(authorFirstName)

                        comment.authorLastName = authorLastNameDecipher
                        comment.authorFirstName = authorFirstNameDecipher
                    })
                    resolve(comments)
                })
                .catch(error => reject(error))
        }) 
    }

    getOneComment(values){
        const where = "id = ?"

        return this.readComment(where, values)
    }

    modifyComment(values){
        const set = "text = ?"
        const where = "id = ?"

        return this.updateComment(set, where, values)
    }
}

module.exports = CommentSchema