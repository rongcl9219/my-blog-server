const express = require('express')
const {articleController} = require("../../controllers/index");
const router = express.Router()

/**
 * 新增文章
 */
router.post('/newArticle', articleController.newArticle)

/**
 * 编辑文章基础信息
 */
router.post('/editArticle', articleController.editArticle)

/**
 * 保存文章内容
 */
router.post('/saveContent', articleController.saveContent)

/**
 * 删除文章(假删)
 */
router.get('/deleteArticle', articleController.deleteArticle)

/**
 * 恢复文章
 */
router.get('/recoverArticle', articleController.recoverArticle)

/**
 * 修改文章发布状态
 */
router.get('/updatePublish', articleController.updatePublish)

module.exports = router;
