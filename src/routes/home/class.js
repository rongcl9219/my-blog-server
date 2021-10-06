const express = require('express')
const {classController} = require("../../controllers/index");
const router = express.Router()

/**
 * 获取全部
 */
router.get('/getAllClass', classController.getAllClass)

/**
 * 获取分类
 */
router.get('/getClass', classController.getClass)

module.exports = router;
