/**
 * @description commonService
 */
const {commonModel, userModel} = require('../models/index')
const {dateFormat, initValidCode} = require('../utils/tool')
const {success} = require("../utils/resultHelper")
const {createToken} = require('../utils/token')
const {encryptToken} = require('../utils/encrypt')

/**
 * 生成验证码
 */
const validCode = () => {
    return success({validCode: initValidCode(4, true)})
}

/**
 * 刷新token
 * @param userId 用户id
 * @returns {Promise<{data: string, flag: boolean}>}
 */
const refreshToken = async userId => {
    const token = await createToken(userId)

    await userModel.updateToken(userId, {
        accessToken: encryptToken(token.accessToken),
        refreshToken: encryptToken(token.refreshToken)
    })
    return success(token)
}

module.exports = {
    validCode,
    refreshToken
}
