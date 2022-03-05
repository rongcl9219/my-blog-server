const jwt = require('jsonwebtoken')
const {TOKEN_KEY, TIME} = require('../../../config/config')
const {encryptToken, md5} = require('../utils/encrypt')
const {checkToken} = require('../models/common.model')

/**
 * 生成token
 * @param {String} userId id
 * @returns {Promise<unknown>}
 */
const createToken = userId => {
    return new Promise((resolve) => {
        const createDate = new Date().getTime()
        const accessToken = jwt.sign({
            userId: userId,
            createDate: createDate
        }, TOKEN_KEY, {expiresIn: TIME.MINUTE * 30})

        const refreshToken = jwt.sign({
            accessToken: md5(accessToken, TOKEN_KEY),
            userId: userId,
            createDate: createDate
        }, TOKEN_KEY, {expiresIn: TIME.DAY})

        resolve({accessToken, refreshToken, exp: TIME.MINUTE * 30 * 1000})
    })
}

/**
 * 验证token
 * @param {String} accessToken
 * @returns {Promise<unknown>}
 */
const verifyToken = accessToken => {
    return new Promise((resolve, reject) => {
        let info = jwt.verify(accessToken, TOKEN_KEY)

        checkToken(info.userId).then(tokenInfo => {
            if (encryptToken(accessToken) === tokenInfo.accessToken) {
                resolve(info)
            } else {
                reject()
            }
        })
    })
}

/**
 * 验证刷新token
 * @param accessToken
 * @param refreshToken
 * @returns {Promise<unknown>}
 */
const checkRefreshToken = (accessToken, refreshToken) => {
    return new Promise((resolve, reject) => {
        try {
            if (!accessToken || !refreshToken) {
                reject()
            }
            refreshToken = refreshToken.split(' ')[1]
            if (!accessToken || !refreshToken) {
                reject()
            }
            const info = jwt.verify(refreshToken, TOKEN_KEY)
            const accessTokenMd5 = md5(accessToken, TOKEN_KEY)

            if (info.accessToken !== accessTokenMd5) {
                reject()
            }

            checkToken(info.userId).then(tokenInfo => {
                if (encryptToken(refreshToken) === tokenInfo.refreshToken) {
                    resolve(info)
                } else {
                    reject()
                }
            })
        } catch (e) {
            reject()
        }
    })
}

module.exports = {
    createToken,
    verifyToken,
    checkRefreshToken
}
