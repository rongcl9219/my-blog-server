const {snakeToHump} = require('../../utils/stringFormat')

/**
 * class表
 */

class Class {
    /**
     * 名表
     * @type {string}
     */
    static TableName = 'sys_class'

    /**
     * 主键id
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static ClassId(isHump = false) {
        const field = 'class_id'
        return isHump ? snakeToHump(field) : field
    }

    /**
     * 分类编号
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static ClassCode(isHump = false) {
        const field = 'class_code'
        return isHump ? snakeToHump(field) : field
    }

    /**
     * 分类名称
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static ClassName(isHump = false) {
        const field = 'class_name'
        return isHump ? snakeToHump(field) : field
    }

    /**
     * 分类类型
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static ClassType(isHump = false) {
        const field = 'class_type'
        return isHump ? snakeToHump(field) : field
    }

    /**
     * 分类描述
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static ClassDesc(isHump = false) {
        const field = 'class_desc'
        return isHump ? snakeToHump(field) : field
    }

    /**
     * 创建日期
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static CreateDate(isHump = false) {
        const field = 'create_date'
        return isHump ? snakeToHump(field) : field
    }
}


module.exports = Class
