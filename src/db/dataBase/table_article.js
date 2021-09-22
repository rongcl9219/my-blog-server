const {snakeToHump} = require('../../utils/stringFormat')

/**
 * Article表
 */

class Article {
    /**
     * 名表
     * @type {string}
     */
    static TableName = 'article'

    /**
     * 主键id
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static ArticleId(isHump = false) {
        const field = 'article_id'
        return isHump ? snakeToHump(field) : field
    }

    /**
     * 文章标题
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static ArticleTitle(isHump = false) {
        const field = 'article_title'
        return isHump ? snakeToHump(field) : field
    }

    /**
     * 文章副标题
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static ArticleSubtitle(isHump = false) {
        const field = 'article_subtitle'
        return isHump ? snakeToHump(field) : field
    }

    /**
     * 文章关键词
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static ArticleKeyword(isHump = false) {
        const field = 'article_keyword'
        return isHump ? snakeToHump(field) : field
    }

    /**
     * 文章简介
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static ArticleInfo(isHump = false) {
        const field = 'article_info'
        return isHump ? snakeToHump(field) : field
    }

    /**
     * 文章内容
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static ArticleContent(isHump = false) {
        const field = 'article_content'
        return isHump ? snakeToHump(field) : field
    }

    /**
     * 文章封面
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static ArticleCover(isHump = false) {
        const field = 'article_cover'
        return isHump ? snakeToHump(field) : field
    }

    /**
     * 所属分类
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static ClassType(isHump = false) {
        const field = 'class_type'
        return isHump ? snakeToHump(field) : field
    }

    /**
     * 所属标签
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static TagType(isHump = false) {
        const field = 'tag_type'
        return isHump ? snakeToHump(field) : field
    }

    /**
     * 是否发布(0-未发布,1-已发布)
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static IsPublish(isHump = false) {
        const field = 'is_publish'
        return isHump ? snakeToHump(field) : field
    }

    /**
     * 点击数
     * @type {string}
     */
    static Hits = 'hits'

    /**
     * 评论数
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static DiscussNum(isHump = false) {
        const field = 'discuss_num'
        return isHump ? snakeToHump(field) : field
    }

    /**
     * 创建人id
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static CreateUser(isHump = false) {
        const field = 'create_user'
        return isHump ? snakeToHump(field) : field
    }

    /**
     * 创建人用户名
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static CreateUsername(isHump = false) {
        const field = 'create_username'
        return isHump ? snakeToHump(field) : field
    }

    /**
     * 更新时间
     * @param isHump
     * @returns {string|string}
     * @constructor
     */
    static UpdateDate(isHump = false) {
        const field = 'update_date'
        return isHump ? snakeToHump(field) : field
    }

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


module.exports = Article
