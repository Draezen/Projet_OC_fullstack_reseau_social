// in routes

const express = require("express")
const router = express.Router()

const auth = require("../middleware/tokenAuth")

const avatarCtrl = require("../controllers/avatar")

//get all avatars
router.get("/", auth, avatarCtrl.getAllAvatars)

module.exports = router