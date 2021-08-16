const {snakeToHump} = require('../../utils/stringFormat')

/**
 * user表
 */
class User {
    /**
     * 名表
     * @type {string}
     */
    static TableName = 'user'

    /**
     * 主键id
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static UserId(isHump = false) {
        const field = 'user_id'
        return isHump ? snakeToHump(field) : field
    }

    /**
     * 用户名
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static UserName(isHump = false) {
        const field = 'user_name'
        return isHump ? snakeToHump(field) : field
    }

    /**
     * 用户类型(1-普通用户, 2-管理员)
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static UserType(isHump = false) {
        const field = 'user_type'
        return isHump ? snakeToHump(field) : field
    }

    /**
     * 用户密码
     * @type {string}
     */
    static Password = 'password'

    /**
     * 盐值
     * @type {string}
     */
    static Salt = 'salt'

    /**
     * 明文密码
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static CleartextPassword(isHump = false) {
        const field = 'cleartext_password'
        return isHump ? snakeToHump(field) : field
    }

    /**
     * 用户邮箱
     * @type {string}
     */
    static Email = 'email'

    /**
     * 用户头像
     * @type {string}
     */
    static Avatar = 'avatar'

    /**
     * 个性签名
     * @type {string}
     */
    static Signature = 'signature'

    /**
     * 用户登录错误次数
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static LoginTime(isHump = false) {
        const field = 'login_time'
        return isHump ? snakeToHump(field) : field
    }

    /**
     * 允许登录时间
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static AllowLoginDate(isHump = false) {
        const field = 'allow_login_date'
        return isHump ? snakeToHump(field) : field
    }

    /**
     * 最后登录时间
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static LastLoginDate(isHump = false) {
        const field = 'last_login_date'
        return isHump ? snakeToHump(field) : field
    }

    /**
     * 创建时间
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static CreateDate(isHump = false) {
        const field = 'create_date'
        return isHump ? snakeToHump(field) : field
    }

    /**
     * 账号状态(0为正常，默认0)
     * @type {string}
     */
    static status = 'status'
}

module.exports = User