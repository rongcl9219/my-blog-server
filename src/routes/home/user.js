const express = require('express')
const router = express.Router()
const { userController } = require('../../controllers/index')

/**
 * 用户登录
 */
router.post('/login', userController.login)

/**
 * 获取用户信息
 */
router.get('/getUserInfo', userController.getUserInfo)

module.exports = router;
