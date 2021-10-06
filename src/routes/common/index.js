const express = require('express')
const router = express.Router()
const {commonController, webInfoController} = require('../../controllers/index')

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

/**
 * 获取网站信息
 */
router.get('/getWebInfo', webInfoController.getWebInfo)

/**
 * 获取网站信息
 */
router.get('/getAsideInfo', commonController.getAsideInfo)

/**
 * 获取文章评论
 */
router.get('/getComment', commonController.getComment)

/**
 * 添加评论和回复
 */
router.post('/addComment', commonController.addComment)

/**
 * 获取时间线数据
 */
router.get('/getTimeLine', commonController.getTimeLine)

module.exports = router;
