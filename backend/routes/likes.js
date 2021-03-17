// in routes

const express = require("express")
const router = express.Router()

const likesCtrl = require("../controllers/likes")
const auth = require("../middleware/tokenAuth")

//get users likes
router.get("/", auth, likesCtrl.getUserLikes)

module.exports = router