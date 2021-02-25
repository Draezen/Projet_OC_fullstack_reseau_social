//in controllers
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

}


