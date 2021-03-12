// in routes

const express = require("express")
const router = express.Router()

const avatarCtrl = require("../controllers/avatar")

//get all avatars
router.get("/", avatarCtrl.getAllAvatars)

module.exports = router