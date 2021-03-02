//in routes

const express = require ("express")
const { body } = require("express-validator")
const router = express.Router()

const commentsCtrl = require("../controllers/comments")

const bodyCheck = require("../middleware/bodyCheck")
const auth = require("../middleware/tokenAuth")

//get all comments
router.get("/:id", auth, commentsCtrl.getAllComments)
//modify a comment
router.put("/:id", auth, bodyCheck ,commentsCtrl.modifyComment)
//delete a comment
router.delete("/:id", auth, commentsCtrl.deleteComment)
//like a comment
router.post("/:id/like",auth, bodyCheck, commentsCtrl.likeComment)

module.exports = router