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

}

module.exports = CommentSchema