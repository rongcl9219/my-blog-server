const jwt = require('jsonwebtoken')

const { TOKEN_KEY, TIME } = require('../../config/config')

/**
 * 设置token
 * @param {String} username 用户名
 * @param {String} userId 用户id
 * @param {Number} exp 过期时间(默认为一天)
 * @returns {Promise<unknown>}
 */
exports.setToken = (username, userId, exp) => {
    return new Promise((resolve, reject) => {
        const token = jwt.sign({
            user_name: username,
            user_id: userId 
        }, TOKEN_KEY, {expiresIn: exp || TIME.DAY});
        resolve(token)
    })
}

/**
 * 验证token
 * @param {String} token
 * @returns {Promise<unknown>}
 */
 exports.verToken = function (token) {
    return new Promise((resolve, reject) => {
        let info = jwt.verify(token.split(' ')[1], TOKEN_KEY)
        resolve(info)
    })
}
