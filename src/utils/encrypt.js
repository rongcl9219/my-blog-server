const crypto = require('crypto')

/**
 * 生成明文密码哈希和盐值
 * @param {String} password 明文密码
 * @returns {Object} {password, salt} 返回密码和盐值
 */
const encrypt = (password) => {
    // 生成随机的盐值
    const salt = crypto.randomBytes(256)
    const md5 = crypto.createHash('md5')
    // 将密码拼接上任意长度的随机字符串后，再进行 Hash
    md5.update(password + salt)

    const newPassword = md5.digest('hex')

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
    const md5 = crypto.createHash('md5')
    md5.update(password + salt)
    const newHash = md5.digest('hex')

    if (newHash === hash) {
        return true
    }

    return false
}

module.exports = {
    encrypt,
    passwordEqual
}
