/**
 * @description userService
 */
const {userModel} = require('../models/index')
const {passwordEqual, encryptToken, encrypt} = require('../utils/encrypt')
const {fail, success} = require('../utils/resultHelper')
const statusCode = require('../utils/statusCode')
const {createToken} = require('../utils/token')
const {dateFormat} = require('../utils/tool')
const {getFileUrl} = require('../utils/qiniu')
const {uuid} = require('../utils/encrypt')
const {DEFAULT_PASSWORD} = require('../../../config/config')

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

    const token = await createToken(userInfo.userId)

    await userModel.updateToken(userInfo.userId, {
        accessToken: encryptToken(token.accessToken),
        refreshToken: encryptToken(token.refreshToken)
    })

    return success(token)
}

/**
 * 获取用户信息
 * @param userId 用户id
 * @returns {Promise<{data: string, flag: boolean}>}
 */
const getUserInfo = async userId => {
    const userInfo = await userModel.getUserInfo(userId)

    userInfo.avatarUrl = getFileUrl(userInfo.avatar, true, '', 'avatar')

    return success({userInfo})
}

/**
 * 退出登录
 * @param accessToken
 * @returns {Promise<{data: string, flag: boolean}>}
 */
const loginOut = async accessToken => {
    await userModel.loginOut(encryptToken(accessToken))
    return success()
}

/**
 * 修改密码
 * @param userId 用户id
 * @param newPass 用户新密码
 * @param oldPass 用户旧密码
 * @returns {Promise<{msg: string, code: number, flag: boolean}|{data: string, flag: boolean}>}
 */
const updatePassword = async (userId, newPass, oldPass) => {
    const userInfo = await userModel.checkPassword(userId)

    // 判断旧密码是否正确
    if (!passwordEqual(oldPass, userInfo.salt, userInfo.password)) {
        return fail('旧密码错误')
    }

    let encryptData = encrypt(newPass)

    await userModel.updatePassword(userId, newPass, encryptData)

    return success()
}

/**
 * 修改用户信息
 * @param avatar 头像
 * @param signature 个性签名
 * @param email 邮箱
 * @param userId 用户id
 * @returns {Promise<{data: string, flag: boolean}>}
 */
const updateUserInfo = async (avatar, signature, email, userId) => {
    await userModel.updateUserInfo(avatar, signature, email, userId)

    return success()
}

/**
 * 初始化管理员
 * @returns {Promise<{msg: string, code: number, flag: boolean}|{data: string, flag: boolean}>}
 */
const initAdmin = async () => {
    let checkInfo = await userModel.checkAdmin()

    if (checkInfo) {
        return fail('管理员已初始化')
    }

    let encryptData = encrypt(DEFAULT_PASSWORD)

    let userInfo = {
        userId: uuid(),
        username: 'admin',
        userType: 2,
        password: encryptData.password,
        salt: encryptData.salt,
        cleartextPassword: DEFAULT_PASSWORD,
        status: 0
    }

    await userModel.newUser(userInfo)

    return success({
        username: 'admin',
        password: DEFAULT_PASSWORD
    })
}

module.exports = {
    login,
    getUserInfo,
    loginOut,
    updatePassword,
    updateUserInfo,
    initAdmin
}
