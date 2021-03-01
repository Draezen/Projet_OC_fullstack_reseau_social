const mysqlConnection = require("../mysql_connection")

class ArticleSchema {
    constructor(){
    }

    createArticle(set, values){
        const query = "INSERT INTO articles SET " + set

        return new Promise( (resolve, reject) => {
            mysqlConnection.query(query, values, (error, results, fields) => {
                if (error) {
                    reject(error.message)
                } else {
                    resolve("Article created !")
                }
            })
        })
    }

    readArticle(where, values){
        const query = "SELECT * FROM articles WHERE " + where

        return new Promise( (resolve, reject) => {
            mysqlConnection.query(query, values, (error, results, fields) => {
                if (error) {
                   reject(error.message)
                } else if (results.length === 0){
                    reject("Syntax error")
                } else {
                    const data = {
                        id : results[0].id,
                        idAuthor : results[0].id_author,
                        dateCreation : results[0].date_creation,
                        dateModification : results[0].date_modification,
                        heading : results[0].heading,
                        text : results[0].text,
                        imageUrl : results[0].image,                        
                    }
                    resolve(data)
                }
            })
        })
    }

    updateArticle(){

    }

    deleteArticle(where, values){
        const query = "DELETE FROM articles WHERE " + where

        return new Promise( (resolve, reject) => {
            mysqlConnection.query(query, values, (error, results, fields) => {
                if (error) {
                    reject(error.message)
                } else {
                    resolve("Article deleted !")
                }
            })
        })
    }

}

module.exports = ArticleSchema