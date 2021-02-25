//in controllers
const UserSchema = require("../Models/Users")

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


// class userController {
//     constructor(userSchema){
//         this.userSchema = userSchema
//     }

//     modifyUser(req, res, next){
//         this.userSchema.modifyUser(req,res)
//     }

//     modifyPassword(req, res, next){

//     }

//     deleteUser(req, res, next){

//     }
// }

// const userCtrl = new userController(new UserSchema())

// module.exports = userCtrl