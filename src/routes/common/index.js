const express = require('express')
const router = express.Router()
const {commonController} = require('../../controllers/index')

/**
 * 获取登录验证码
 */
router.get('/validCode', commonController.initValidCode)

/**
 * 刷新token
 */
router.post('/refreshToken', commonController.refreshToken)

/**
 * 获取上传token
 */
router.post('/getUploadToken', commonController.getUploadToken)

module.exports = router;
