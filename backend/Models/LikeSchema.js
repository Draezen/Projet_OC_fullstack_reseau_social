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
                    resolve("Like created !")
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

}

module.exports = LikeSchema