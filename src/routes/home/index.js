let express = require('express')
let router = express.Router()

// 用户模块
const User = require('./user')

// 公共模块
const Common = require('../common/index')

// 合并后台模块路由
router.stack = router.stack.concat(User.stack, Common.stack)

module.exports = router