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
        return res.json(failResult('error', statusCode.SYS_ERROR, {errorMsg: e}))
    }
}

module.exports = {
    login
}