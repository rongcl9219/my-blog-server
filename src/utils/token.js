const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const {TOKEN_KEY, TIME} = require('../../config/config')
const {encryptToken} = require('../utils/encrypt')
const {checkToken} = require('../models/common.model')

/**
 * 生成token
 * @param {String} userId id
 * @returns {Promise<unknown>}
 */
const createToken = userId => {
    const md5 = crypto.createHmac('md5', TOKEN_KEY)
    return new Promise((resolve) => {
        const accessToken = jwt.sign({
            userId: userId,
            createDate: new Date().getTime()
        }, TOKEN_KEY, {expiresIn: TIME.MINUTE * 10})

        const refreshToken = jwt.sign({
            accessToken: md5.update(accessToken).digest('hex'),
            userId: userId,
            createDate: new Date().getTime()
        }, TOKEN_KEY, {expiresIn: TIME.HOUR * 2})

        resolve({accessToken, refreshToken})
    })
}

/**
 * 验证token
 * @param {String} token
 * @returns {Promise<unknown>}
 */
const verifyToken = token => {
    return new Promise((resolve, reject) => {
        let accessToken = token.split(' ')[1]
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
 * @param token
 * @returns {Promise<unknown>}
 */
const checkRefreshToken = (token) => {
    return new Promise((resolve, reject) => {
        try {
            if (!token) {
                reject()
            }
            const md5 = crypto.createHmac('md5', TOKEN_KEY)
            const accessToken = token.split(' ')[1]
            const refreshToken = token.split(' ')[2]
            if (!accessToken || !refreshToken) {
                reject()
            }
            const info = jwt.verify(refreshToken, TOKEN_KEY)
            const accessTokenMd5 = md5.update(accessToken).digest('hex')

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
