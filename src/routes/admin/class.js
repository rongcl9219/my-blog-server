const express = require('express')
const {classController} = require("../../controllers/index");
const router = express.Router()

/**
 * 获取分类列表
 */
router.get('/getClassList', classController.getClassList)

/**
 * 新增分类
 */
router.post('/newClass', classController.newClass)

/**
 * 修改分类
 */
router.post('/updateClass', classController.updateClass)

/**
 * 删除分类
 */
router.post('/deleteClass', classController.deleteClass)

/**
 * 获取分类信息
 */
router.get('/getClassInfo', classController.getClassInfo)

/**
 * 获取全部
 */
router.get('/getAllClass', classController.getAllClass)

module.exports = router;
