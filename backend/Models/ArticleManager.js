const mysqlConnection = require("../mysql_connection")

const Cryptr = require("cryptr")
const cryptr = new Cryptr(process.env.CRYPTO_JS_KEY)

class ArticleManager{
    constructor(){
    }

    createArticle(set, values){
        const query = "INSERT INTO articles SET " + set

        return new Promise( (resolve, reject) => {
            mysqlConnection.query(query, values, (error, results, fields) => {
                if (error) {
                    reject(error.message)
                } else {
                    resolve("Article créé !")
                }
            })
        })
    }

    readArticle(where, values , select = "*", join = "", group ="", order = ""){
        const query = "SELECT " + select + " FROM articles " + join + " WHERE " + where + group + order

        return new Promise( (resolve, reject) => {
            mysqlConnection.query(query, values, (error, results, fields) => {
                if (error) {
                   reject(error.message)
                } else {
                    switch (results.length){
                        case 0 :
                            reject("Pas d'article trouvé")
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

    updateArticle(set, where, values){
        const query = "UPDATE articles SET " + set + " WHERE " + where

        return new Promise ( ( resolve, reject) => {
            mysqlConnection.query(query, values, (error, results, fields) => {
                if (error) {
                    reject(error.message)
                } else {
                    resolve("Article modifié !")
                }
            })
        })
    }

    deleteArticle(values){
        const where = "id = ?"
        const query = "DELETE FROM articles WHERE " + where

        return new Promise( (resolve, reject) => {
            mysqlConnection.query(query, values, (error, results, fields) => {
                if (error) {
                    reject(error.message)
                } else {
                    resolve("Article supprimé !")
                }
            })
        })
    }

    getAllArticles(){
        const where = " 1 "
        const select = " articles.id, articles.dateCreation, articles.heading, articles.text, articles.image, users.lastName AS authorLastName, users.firstName AS authorFirstName, avatars.url AS avatarUrl, likesCount.nbLikes, likesCount.nbDislikes, SUM(CASE WHEN comments.idArticle = articles.id THEN 1 ELSE 0 END) AS nbComments "
        const join = " INNER JOIN users ON articles.idAuthor = users.id INNER JOIN avatars ON users.avatarId = avatars.id LEFT OUTER JOIN comments ON comments.idArticle = articles.id LEFT OUTER JOIN (SELECT idArticle, SUM(CASE WHEN likes.likeDislike = 1 THEN 1 ELSE 0 END) AS nbLikes, SUM(CASE WHEN likes.likeDislike = -1 THEN 1 ELSE 0 END) AS nbDislikes FROM likes GROUP BY idArticle) AS likesCount ON articles.id  = likesCount.idArticle "
        const group = " GROUP BY articles.id "
        const order = " ORDER BY articles.dateCreation DESC "
        const values = []

        return new Promise( (resolve, reject) => {
            this.readArticle(where, values, select, join, group, order)
                .then(articles => {
                    articles.forEach(article => {
                        const authorLastName = article.authorLastName
                        const authorFirstName = article.authorFirstName
                        const authorLastNameDecipher = cryptr.decrypt(authorLastName)
                        const authorFirstNameDecipher = cryptr.decrypt(authorFirstName)

                        article.authorLastName = authorLastNameDecipher
                        article.authorFirstName = authorFirstNameDecipher
                    })
                    resolve(articles)
                })
                .catch(error => reject(error))
        })
    }

    createArticleWithImage(values){
        const set = "idAuthor = ?, heading = ?, text = ?, image = ?"

        return this.createArticle(set, values)
    }

    createArticleOnlyText(values){
        const  set = "idAuthor = ?, heading = ?, text = ?"

        return this.createArticle(set, values)
    }

    getOneArticle(values){
        const where = "id = ?"

        return this.readArticle(where, values)
    }

    modifyArticleWithImage(values){
        const set = "heading = ?, text = ?, image = ?"
        const where = "id = ?"

        return this.updateArticle(set, where, values)
    }

    modifyArticleOnlyText(values){
        const set = "heading = ?, text = ?"
        const where = "id = ?"

        return this.updateArticle(set, where, values)
    }

}

module.exports = ArticleManager