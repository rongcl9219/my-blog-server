const express = require('express')
const {userController} = require("../../controllers/index");
const router = express.Router()

/**
 * 获取用户信息
 */
router.get('/getUserInfo', userController.getUserInfo)

/**
 * 修改密码
 */
router.post('/updatePassword', userController.updatePassword)

/**
 * 修改用户信息
 */
router.post('/updateUserInfo', userController.updateUserInfo)

module.exports = router;
