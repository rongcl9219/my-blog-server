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
        return res.json(failResult('error', statusCode.SYS_ERROR, {errorMsg: {stack: e.stack, message: e.message}}))
    }
}

/**
 * token过期刷新token
 */
const refreshToken = async (req, res) => {
    try {
        const userId = req.data.userId

        const result = commonService.refreshToken(userId)

        return res.json(returnResult(result))
    } catch (e) {
        return res.json(failResult('error', statusCode.SYS_ERROR, {errorMsg: {stack: e.stack, message: e.message}}))
    }
}

module.exports = {
    initValidCode,
    refreshToken
}
