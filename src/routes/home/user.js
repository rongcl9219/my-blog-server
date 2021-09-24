const express = require('express')
const router = express.Router()
const { userController } = require('../../controllers/index')

/**
 * 用户登录
 */
router.post('/login', userController.login)

/**
 * 用户退出登录
 */
router.post('/loginOut', userController.loginOut)

/**
 * 初始化管理员
 */
router.post('/initAdmin', userController.initAdmin)

module.exports = router;
