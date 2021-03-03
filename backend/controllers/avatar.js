//in controllers

const AvatarSchema = require("../Models/AvatarSchema")

exports.getAllAvatars = (req, res, next) => {
    const avatar = new AvatarSchema()
    const where = 1

    avatar.readAvatar(where)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => res.status(500).json({ error : "Unknow Id !"  }))
}