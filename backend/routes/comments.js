//in routes

const express = require ("express")
const { body } = require("express-validator")
const router = express.Router()

const commentsCtrl = require("../controllers/comments")

const bodyCheck = require("../middleware/bodyCheck")

//modify a comment
router.put("/:id", bodyCheck ,commentsCtrl.modifyComment)
//delete a comment
router.delete("/:id", commentsCtrl.deleteComment)
//like a comment
router.post("/:id/like", bodyCheck, commentsCtrl.likeComment)

module.exports = router