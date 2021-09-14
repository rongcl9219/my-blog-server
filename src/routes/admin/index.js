let express = require('express')
let router = express.Router()

// 用户模块
const adminUser = require('./user')

// 分类模块
const adminClass = require('./class')

// 标签模块
const adminTag = require('./tag')

// 合并后台模块路由
router.stack = router.stack.concat(adminUser.stack, adminClass.stack, adminTag.stack)

module.exports = router
