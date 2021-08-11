const express = require('express')
const router = express.Router()

const { testController } = require('../controller/index')

/**
 * 测试
 */
router.get('/', testController.test)

module.exports = router;
