const jwt = require('jsonwebtoken')
const { TOKEN_KEY, TIME } = require('../../config/config')

/**
 * 生成token
 * @param {String} username 用户名
 * @param {String} userId id
 * @returns {Promise<unknown>}
 */
const createToken = (username, userId) => {
    return new Promise((resolve) => {
        let token = jwt.sign({
            userId: userId,
            name: username,
            createDate: new Date().getTime()
        }, TOKEN_KEY, {expiresIn: TIME.DAY})
        resolve(token)
    })
}

/**
 * 验证token
 * @param {String} token
 * @returns {Promise<unknown>}
 */
const verifyToken = token => {
    return new Promise((resolve) => {
        let info = jwt.verify(token.split(' ')[1], TOKEN_KEY)
        resolve(info)
    })
}

module.exports = {
    createToken,
    verifyToken
}
