//in routes

const express = require ("express")
const router = express.Router()

const articlesCtrl = require("../controllers/articles")

//show all articles
router.get("/", articlesCtrl.getAllArticles)
//create an article
router.post("/", articlesCtrl.createArticle)
//modify an article
router.put("/:id", articlesCtrl.modifyArticle)
//delete an article
router.delete("/:id", articlesCtrl.deleteArticle)
//like an article
router.post("/:id/like", articlesCtrl.likeArticle)
//comment an article
router.post("/:id/comment", articlesCtrl.commentArticle)

module.exports = router