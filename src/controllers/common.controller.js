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

        const result = await commonService.refreshToken(userId)

        return res.json(returnResult(result))
    } catch (e) {
        return res.json(failResult('error', statusCode.SYS_ERROR, {errorMsg: {stack: e.stack, message: e.message}}))
    }
}

/**
 * 获取上传token
 */
const getUploadToken = (req, res) => {
    try {
        let {keys, thumbnail = ''} = req.body

        if (!keys) {
            return res.json(failResult('参数错误', statusCode.PARAMS_INVALID))
        }

        const result = commonService.getUploadToken(keys, thumbnail)

        return res.json(returnResult(result))
    } catch (e) {
        return res.json(failResult('error', statusCode.SYS_ERROR, {errorMsg: {stack: e.stack, message: e.message}}))
    }
}

/**
 * 获取侧边栏信息
 */
const getAsideInfo = async (req, res) => {
    try {
        const result = await commonService.getAsideInfo()

        return res.json(returnResult(result))
    } catch (e) {
        console.log(e);
        return res.json(failResult('error', statusCode.SYS_ERROR, {errorMsg: {stack: e.stack, message: e.message}}))
    }
}

module.exports = {
    initValidCode,
    refreshToken,
    getUploadToken,
    getAsideInfo
}
