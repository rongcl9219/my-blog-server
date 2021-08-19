/**
 * @description userController
 */

const statusCode = require('../utils/statusCode')
const {userService} = require('../services/index')
const {successResult, failResult, returnResult} = require('../utils/resultHelper')

/**
 * 登录
 * @returns {Promise<*>}
 */
const login = async (req, res) => {
    try {
        let {username = '', password = ''} = req.body

        if (!username.trim() || !password.trim()) {
            return res.json(failResult('用户名或密码不能为空', statusCode.PARAMS_INVALID))
        }

        const result = await userService.login(username, password)

        return res.json(returnResult(result))
    } catch (e) {
        return res.json(failResult('error', statusCode.SYS_ERROR, {errorMsg: {stack: e.stack, message: e.message}}))
    }
}

/**
 * 获取用户信息
 * @returns {Promise<void>}
 */
const getUserInfo = async (req, res) => {
    try {
        let {userId} = req.data || req.query

        if (!userId || !userId.trim()) {
            return res.json(failResult('参数错误', statusCode.PARAMS_INVALID))
        }

        let result = await userService.getUserInfo(userId)

        return res.json(returnResult(result))
    } catch (e) {
        return res.json(failResult('error', statusCode.SYS_ERROR, {errorMsg: {stack: e.stack, message: e.message}}))
    }
}

/**
 * 退出登录
 */
const loginOut = async (req, res) => {
    try {
        const token = req.headers['authorization'] || ''

        if (token) {
            const accessToken = token.split(' ')[1]
            await userService.loginOut(accessToken)
        }

        return res.json(successResult())
    } catch (e) {
        return res.json(failResult('error', statusCode.SYS_ERROR, {errorMsg: {stack: e.stack, message: e.message}}))
    }
}

module.exports = {
    login,
    getUserInfo,
    loginOut
}
