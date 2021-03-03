const mysqlConnection = require("../mysql_connection")

class AvatarSchema {
    constructor(){
    }

    readAvatar(where, values){
        const query = "SELECT * FROM avatars WHERE " + where

        return new Promise( (resolve, reject) => {
            mysqlConnection.query(query, values, (error, results, fields) => {
                if (error) {
                   reject(error.message)
                } else if (results.length === 0){
                    reject("Syntax error")
                } else {
                    resolve(results)
                }
            })
        })
    }

}

module.exports = AvatarSchema