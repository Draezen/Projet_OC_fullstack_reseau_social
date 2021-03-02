const mysqlConnection = require("../mysql_connection")

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
                    resolve("Comment created !")
                }
            })
        })
    }

    readComment(where, values, select = "*", join = ""){
        const query = "SELECT " + select + " FROM comments " + join + " WHERE " + where

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

    updateComment(set, where, values){
        const query = "UPDATE comments SET " + set + " WHERE " + where

        return new Promise ( ( resolve, reject) => {
            mysqlConnection.query(query, values, (error, results, fields) => {
                if (error) {
                    reject(error.message)
                } else {
                    resolve("Comment modified !")
                }
            })
        })
    }

    deleteComment(where, values){
        const query = "DELETE FROM comments WHERE " + where

        return new Promise( (resolve, reject) => {
            mysqlConnection.query(query, values, (error, results, fields) => {
                if (error) {
                    reject(error.message)
                } else {
                    resolve("Comment deleted !")
                }
            })
        })
    }

}

module.exports = CommentSchema