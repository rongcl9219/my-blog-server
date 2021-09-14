const express = require('express')
const {webInfoController} = require("../../controllers/index");
const router = express.Router()

/**
 * 获取网站信息
 */
router.get('/getWebInfo', webInfoController.getWebInfo)

/**
 * 保存网站信息
 */
router.post('/saveWebInfo', webInfoController.saveWebInfo)

module.exports = router;
