const express = require('express')
const router = express.Router()

const { testController } = require('../controllers/index')

/**
 * 测试
 */
router.get('/', testController.test)

module.exports = router;
