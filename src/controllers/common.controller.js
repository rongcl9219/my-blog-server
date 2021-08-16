/**
 * @description userController
 */

const {commonService} = require('../services/index')
const statusCode = require('../utils/statusCode')
const {successResult, failResult, returnResult} = require('../utils/resultHelper')

/**
 * 生成登录验证码
 */
const initValidCode = (req, res) => {
    try {
        const result = commonService.validCode()

        return res.json(returnResult(result))
    } catch (e) {
        return res.json(failResult('error', statusCode.SYS_ERROR, {errorMsg: e}))
    }
}

module.exports = {
    initValidCode
}