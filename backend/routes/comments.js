//in routes

const express = require ("express")
const router = express.Router()

const commentsCtrl = require("../controllers/comments")

//modify a comment
router.put("/:id", commentsCtrl.modifyComment)
//delete a comment
router.delete("/:id", commentsCtrl.deleteComment)
//like a comment
router.post("/:id/like", commentsCtrl.likeComment)

module.exports = router