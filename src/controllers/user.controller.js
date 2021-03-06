/**
 * @description userController
 */

const statusCode = require('../utils/statusCode')
const {userService} = require('../services/index')
const {successResult, failResult, returnResult} = require('../utils/resultHelper')

/**
 * 登录
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

/**
 * 修改密码
 */
const updatePassword = async (req, res) => {
    try {
        let {oldPass = '', newPass = '', checkPass = ''} = req.body

        let {userId} = req.data

        if (!newPass.trim() || newPass !== checkPass) {
            return res.json(failResult('两次密码输入不一致', statusCode.FAIL))
        }

        await userService.updatePassword(userId, newPass, oldPass)

        return res.json(successResult())
    } catch (e) {
        return res.json(failResult('error', statusCode.SYS_ERROR, {errorMsg: {stack: e.stack, message: e.message}}))
    }
}

/**
 * 修改用户信息
 */
const updateUserInfo = async (req, res) => {
    try {
        let {avatar = '', signature = '', email = '', userId = ''} = req.body

        if (!userId.trim()) {
            return res.json(failResult('参数错误', statusCode.PARAMS_INVALID))
        }

        await userService.updateUserInfo(avatar, signature, email, userId)

        return res.json(successResult())
    } catch (e) {
        return res.json(failResult('error', statusCode.SYS_ERROR, {errorMsg: {stack: e.stack, message: e.message}}))
    }
}

/**
 * 初始化管理员
 */
const initAdmin = async (req, res) => {
    try {
        let result = await userService.initAdmin()
        return res.json(returnResult(result))
    } catch (e) {
        return res.json(failResult('error', statusCode.SYS_ERROR, {errorMsg: {stack: e.stack, message: e.message}}))
    }
}

module.exports = {
    login,
    getUserInfo,
    loginOut,
    updatePassword,
    updateUserInfo,
    initAdmin
}
