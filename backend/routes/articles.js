//in routes

const express = require ("express")
const router = express.Router()

const articlesCtrl = require("../controllers/articles")
const auth = require("../middleware/tokenAuth")
const multer = require("../middleware/multer-config")
const { dataFormat, datasValidationRules, validate } = require("../middleware/datasValidator")
const bodyCheck = require("../middleware/bodyCheck")

//show all articles
router.get("/", auth, articlesCtrl.getAllArticles)
//create an article
router.post("/", auth, multer, bodyCheck ,dataFormat, datasValidationRules(), validate, articlesCtrl.createArticle)
//modify an article
router.put("/:id", auth, multer, bodyCheck, dataFormat, datasValidationRules(), validate, articlesCtrl.modifyArticle)
//delete an article
router.delete("/:id", auth, articlesCtrl.deleteArticle)
//like an article
router.post("/:id/like", auth, bodyCheck, articlesCtrl.likeArticle)
//comment an article
router.post("/:id/comment", auth,bodyCheck, articlesCtrl.commentArticle)

module.exports = router