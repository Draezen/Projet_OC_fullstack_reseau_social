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
                } else {
                    switch (results.length){
                        case 0 :
                            reject("Syntax error")
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

    updateArticle(set, where, values){
        const query = "UPDATE articles SET " + set + " WHERE " + where

        return new Promise ( ( resolve, reject) => {
            mysqlConnection.query(query, values, (error, results, fields) => {
                if (error) {
                    reject(error.message)
                } else {
                    resolve("Article modified !")
                }
            })
        })
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