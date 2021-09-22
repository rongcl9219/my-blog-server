const express = require('express')
const {tagController} = require("../../controllers/index");
const router = express.Router()

/**
 * 获取全部标签
 */
router.get('/getAllTag', tagController.getAllTag)

module.exports = router;
