/**
 * @description commonService
 */

const {commonModel} = require('../models/index')
const {dateFormat, initValidCode} = require('../utils/tool')
const {success} = require("../utils/resultHelper");

/**
 * 生成验证码
 */
const validCode = () => {
    return success({validCode: initValidCode(4, true)})
}

module.exports = {
    validCode
}