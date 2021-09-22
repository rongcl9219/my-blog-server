const express = require('express')
const {articleController} = require("../../controllers/index");
const router = express.Router()

/**
 * 获取文章列表
 */
router.get('/getArticleList', articleController.getArticleList)

/**
 * 获取文章信息
 */
router.get('/getArticleInfo', articleController.getArticleInfo)

/**
 * 获取文章内容
 */
router.get('/getContent', articleController.getContent)

module.exports = router;
