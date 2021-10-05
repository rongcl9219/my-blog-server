const {snakeToHump} = require('../../utils/stringFormat')

/**
 * comment表
 */

class Class {
    /**
     * 名表
     * @type {string}
     */
    static TableName = 'comment'

    /**
     * 主键id
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static CommentId(isHump = false) {
        const field = 'comment_id'
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
     * 评论文章id
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static ArticleId(isHump = false) {
        const field = 'article_id'
        return isHump ? snakeToHump(field) : field
    }

    /**
     * 父级评论id
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static ParentCommentId(isHump = false) {
        const field = 'parent_comment_id'
        return isHump ? snakeToHump(field) : field
    }

    /**
     * 父级评论用户名
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static ParentCommentUserName(isHump = false) {
        const field = 'parent_comment_user_name'
        return isHump ? snakeToHump(field) : field
    }

    /**
     * 被回复的评论id
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static ReplyCommentId(isHump = false) {
        const field = 'reply_comment_id'
        return isHump ? snakeToHump(field) : field
    }

    /**
     * 被回复的评论用户名
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static ReplyCommentUserName(isHump = false) {
        const field = 'reply_comment_user_name'
        return isHump ? snakeToHump(field) : field
    }

    /**
     * 评论等级[ 1 一级评论 默认 ，2 二级评论]
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static CommentLevel(isHump = false) {
        const field = 'comment_level'
        return isHump ? snakeToHump(field) : field
    }

    /**
     * 评论的内容
     * @type {string}
     */
    static Content = 'content'

    /**
     * 点赞数
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static PraiseNum(isHump = false) {
        const field = 'praise_num'
        return isHump ? snakeToHump(field) : field
    }

    /**
     * 状态(1-有效,2-未生效)
     * @type {string}
     */
    static Status = 'status'

    /**
     * 是否删除(0-未删除,1-已删除)
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static IsDelete(isHump = false) {
        const field = 'is_delete'
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
