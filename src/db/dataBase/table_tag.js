const {snakeToHump} = require('../../utils/stringFormat')

/**
 * Tag表
 */

class Tag {
    /**
     * 名表
     * @type {string}
     */
    static TableName = 'sys_tag'

    /**
     * 主键id
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static TagId(isHump = false) {
        const field = 'tag_id'
        return isHump ? snakeToHump(field) : field
    }

    /**
     * 标签编号
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static TagCode(isHump = false) {
        const field = 'tag_code'
        return isHump ? snakeToHump(field) : field
    }

    /**
     * 标签名称
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static TagName(isHump = false) {
        const field = 'tag_name'
        return isHump ? snakeToHump(field) : field
    }

    /**
     * 标签所属分类(分类id)
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
    static TagDesc(isHump = false) {
        const field = 'tag_desc'
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


module.exports = Tag
