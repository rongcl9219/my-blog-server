/**
 * @description userService
 */

const {userModel} = require('../models/index')
const {passwordEqual} = require('../utils/encrypt')
const {fail, success} = require('../utils/resultHelper')
const statusCode = require('../utils/statusCode')
const {createToken} = require('../utils/token')
const {dateFormat} = require('../utils/tool')

/**
 * 登录
 * @param {String} username 用户名
 * @param {String} password 密码
 * @returns {Promise<*>}
 */
const login = async (username, password) => {

    let userInfo = await userModel.login(username)

    // 判断用户是否存在
    if (!userInfo) {
        return fail('该账号不存在')
    }

    let loginTime = userInfo.loginTime

    if (loginTime >= 10) {
        let allowLoginDate = new Date(userInfo.allowLoginDate).getTime()
        let dateNow = new Date().getTime()

        if (dateNow < allowLoginDate) {
            return fail('登录错误次数超过10次，请10分钟后再试!', statusCode.PARAMS_INVALID, {allowLoginDate: userInfo.allowLoginDate})
        }
        // 重新计算登录次数
        loginTime = 0
    }

    // 判断密码是否正确
    if (!passwordEqual(password, userInfo.salt, userInfo.password)) {
        loginTime += 1
        let allowLoginDate = ''
        let allowLoginTime = 10 - loginTime

        if (loginTime >= 10) {
            allowLoginTime = 0
            let date = new Date()
            allowLoginDate = dateFormat('yyyy-MM-dd hh:mm:ss', new Date(date.setMinutes(date.getMinutes() + 10)))
        }

        await userModel.updateLoginTime({allowLoginDate, loginTime, username})

        return fail('用户名或密码错误', statusCode.PARAMS_INVALID, {loginTime: allowLoginTime})
    }

    loginTime = 0
    let lastLoginDate = dateFormat('yyyy-MM-dd hh:mm:ss', new Date())
    await userModel.updateLoginTime({loginTime, username, lastLoginDate})

    const token = await createToken(userInfo.username, userInfo.userId)

    return success({token})
}

/**
 * 获取用户信息
 * @param userId 用户id
 * @returns {Promise<{data: string, flag: boolean}>}
 */
const getUserInfo = async userId => {
    const userInfo = await userModel.getUserInfo(userId)

    return success({userInfo})
}

module.exports = {
    login,
    getUserInfo
}
