const express = require('express')
const {userController} = require("../../controllers/index");
const router = express.Router()

/**
 * 获取用户信息
 */
router.get('/getUserInfo', userController.getUserInfo)

module.exports = router;
