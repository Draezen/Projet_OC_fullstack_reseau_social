//in controllers

const AvatarManager = require("../Models/AvatarManager")

exports.getAllAvatars = (req, res, next) => {
    const avatar = new AvatarManager()

    avatar.getAllAvatars()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => res.status(500).json({ error  }))
}