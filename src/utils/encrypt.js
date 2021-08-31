const crypto = require('crypto')
const {TOKEN_KEY} = require('../../config/config')

/**
 * 生成明文密码哈希和盐值
 * @param {String} password 明文密码
 * @returns {Object} {password, salt} 返回密码和盐值
 */
const encrypt = (password) => {
    // 生成随机的盐值
    const salt = crypto.randomBytes(16).toString('hex')

    const newPassword = md5(password + salt)

    return {
        password: newPassword,
        salt: salt,
    }
}

/**
 * 验证密码
 * @param {String} password 明文密码
 * @param {String} salt 盐值
 * @param {String} hash 哈希密码
 * @returns {Boolean}
 */
const passwordEqual = (password, salt, hash) => {
    const newHash = md5(password + salt)

    if (newHash === hash) {
        return true
    }

    return false
}

/**
 * token加密
 * @param token
 * @returns {string}
 */
const encryptToken = (token) => {
    const md5Token = md5(token + TOKEN_KEY)

    return md5Token
}

/**
 * md5加密
 * @param str 需要加密的字符串
 * @returns {string}
 */
const md5 = (str, key = '') => {
    return crypto.createHash('md5', key).update(String(str)).digest('hex')
}

module.exports = {
    encrypt,
    passwordEqual,
    encryptToken,
    md5
}
