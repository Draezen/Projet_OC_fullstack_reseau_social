//in controllers
const jwt = require("jsonwebtoken")

const UserSchema = require("../Models/UserSchema")

exports.modifyUser = (req, res, next) => {
    const user = new UserSchema()

    user.modifyUser(req, res)
}

exports.modifyPassword = (req, res, next) => {
    const user = new UserSchema()

    user.modifPassword(req, res)
}

exports.deleteUser = (req, res, next) => {
    const user = new UserSchema()
    const where = "id = ?"
    const values = req.params.id

    user.readUser(where, values)
        .then(data => {
            //split authorisation header to get the token part
            const token = req.headers.authorization.split(" ")[1]
            //check token with encoding key 
            const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
            //get the id
            const userId = decodedToken.userId
            
            if(data.id !== userId){
                res.status(401).json({ error : "Invalid user Id !" })
            } else {
                user.deleteUser(where, userId)
                    .then( response => {
                        res.status(200).json(response)
                    })
                    .catch(error => res.status(500).json({ error : error }))
            }
        })
        .catch(error => res.status(500).json({ error : "Unknow Id !" }))

 
}


