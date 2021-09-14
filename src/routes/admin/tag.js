const express = require('express')
const {tagController} = require("../../controllers/index");
const router = express.Router()

/**
 * 获取标签列表
 */
router.get('/getTagList', tagController.getTagList)

/**
 * 新增标签
 */
router.post('/newTag', tagController.newTag)

/**
 * 修改标签
 */
router.post('/updateTag', tagController.updateTag)

/**
 * 删除标签
 */
router.post('/deleteTag', tagController.deleteTag)

/**
 * 获取标签信息
 */
router.get('/getTagInfo', tagController.getTagInfo)

module.exports = router;
