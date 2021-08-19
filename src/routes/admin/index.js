let express = require('express')
let router = express.Router()

// 用户模块
const adminUser = require('./user')

// 合并后台模块路由
router.stack = router.stack.concat(adminUser.stack)

module.exports = router
