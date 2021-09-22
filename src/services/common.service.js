/**
 * @description commonService
 */
const {userModel} = require('../models/index')
const {initValidCode} = require('../utils/tool')
const {success} = require("../utils/resultHelper")
const {createToken} = require('../utils/token')
const {encryptToken} = require('../utils/encrypt')
const {getFileUrl, createUploadToken} = require('../utils/qiniu')

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

/**
 * 获取上传token
 * @param key 文件key
 * @param thumbnail 图片处理格式名称
 * @returns {{data: string, flag: boolean}}
 */
const getUploadToken = (keys, thumbnail) => {
    let keyArr = keys.split(',')

    let tokenArr = []

    keyArr.map(key => {
        tokenArr.push({
            token: createUploadToken(key),
            url: getFileUrl(key, true, '', thumbnail)
        })
    })

    return success(tokenArr)
}

module.exports = {
    validCode,
    refreshToken,
    getUploadToken
}
