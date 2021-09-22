const express = require('express')
const {classController} = require("../../controllers/index");
const router = express.Router()

/**
 * 获取全部
 */
router.get('/getAllClass', classController.getAllClass)

module.exports = router;
