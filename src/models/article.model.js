/**
 * @description articleModule
 */

const mysql = require('../db/mysql')
const TableArticle = require('../db/dataBase/table_article')
const {queryFieldFormat, updateFieldFormat} = require('../utils/stringFormat')
const {dateFormat} = require('../utils/tool')
const {uuid} = require('../utils/encrypt')

/**
 * 获取文章列表
 * @param page 当前页
 * @param pageSize 每页数量
 * @param query 查询
 * @param classType 分类id
 * @param tagType 标签id
 * @param articleStatus 文章状态(0-未删除，1-已发布，2-未发布，3-已删除)
 * @returns {Promise<{total: number, articleData: *}>}
 */
const getArticleList = async (page, pageSize, query, classType, tagType, articleStatus) => {
    let selectArr = [
        queryFieldFormat(TableArticle.ArticleId()),
        queryFieldFormat(TableArticle.ArticleTitle()),
        queryFieldFormat(TableArticle.ArticleSubtitle()),
        queryFieldFormat(TableArticle.ArticleKeyword()),
        queryFieldFormat(TableArticle.ArticleInfo()),
        queryFieldFormat(TableArticle.ArticleCover()),
        queryFieldFormat(TableArticle.ClassType()),
        queryFieldFormat(TableArticle.TagType()),
        queryFieldFormat(TableArticle.IsPublish()),
        queryFieldFormat(TableArticle.Hits),
        queryFieldFormat(TableArticle.DiscussNum()),
        queryFieldFormat(TableArticle.CreateUser()),
        queryFieldFormat(TableArticle.CreateUsername()),
        queryFieldFormat(TableArticle.UpdateDate()),
        queryFieldFormat(TableArticle.CreateDate())
    ]

    let whereStr = '1=1 '

    let whereData = []

    if (articleStatus === 0) { // 未删除
        whereStr += ` and ${TableArticle.IsDelete()} = 0 `
    } else if (articleStatus === 1) { // 已发布
        whereStr += ` and ${TableArticle.IsDelete()} = 0 and ${TableArticle.IsPublish()} = 1 `
    } else if (articleStatus === 2) { // 未发布
        whereStr += ` and ${TableArticle.IsDelete()} = 0 and ${TableArticle.IsPublish()} = 0 `
    } else if (articleStatus  === 3) { // 已删除
        whereStr += ` and ${TableArticle.IsDelete()} = 1 `
    }

    if (!!classType) {
        whereStr += ` and CONCAT(',',${TableArticle.ClassType()},',') LIKE ? `
        whereData.push(`%,${classType},%`)
    }

    if (!!tagType) {
        whereStr += ` and CONCAT(',',${TableArticle.TagType()},',') LIKE ? `
        whereData.push(`%,${tagType},%`)
    }

    // 判断是否有查询条件
    if (!!query && !!query.trim()) {
        whereStr += ` and (${TableArticle.ArticleTitle()} like ? or ${TableArticle.ArticleSubtitle()} like ? or ${TableArticle.ArticleKeyword()} like ?) `
        whereData.push(`%${query}%`, `%${query}%`, `%${query}%`)
    }

    let selectSql = `select ${selectArr.join(',')} from ${TableArticle.TableName} where ${whereStr} order by create_date desc limit ?,?`

    let articleData = await mysql.query(selectSql, whereData.concat([page, pageSize]))

    let total = await mysql.queryCount(`select ${TableArticle.ArticleId()} from ${TableArticle.TableName} where ${whereStr}`, whereData)

    return {
        articleData,
        total: Number(total)
    }
}

/**
 * 新增文章
 */
const newArticle = async (newInfo) => {
    const {articleTitle, articleSubtitle, articleKeyword, articleInfo, articleCover, classType, tagType, userId, username} = newInfo

    let insertArr = [
        TableArticle.ArticleId(),
        TableArticle.ArticleTitle(),
        TableArticle.ArticleSubtitle(),
        TableArticle.ArticleKeyword(),
        TableArticle.ArticleInfo(),
        TableArticle.ArticleCover(),
        TableArticle.ClassType(),
        TableArticle.TagType(),
        TableArticle.CreateUser(),
        TableArticle.CreateUsername(),
        TableArticle.CreateDate()
    ]

    let insertSql = `insert into ${TableArticle.TableName} (${insertArr.join(',')}) values (?,?,?,?,?,?,?,?,?,?,?)`

    let insertData = [
        uuid(),
        articleTitle,
        articleSubtitle,
        articleKeyword,
        articleInfo,
        articleCover,
        classType,
        tagType,
        userId,
        username,
        dateFormat('yyyy-MM-dd hh:mm:ss', new Date())
    ]

    await mysql.query(insertSql, insertData)
}

/**
 * 编辑文章基础信息
 */
const editArticle = async (editInfo) => {
    const {articleId, articleTitle, articleSubtitle, articleKeyword, articleInfo, articleCover, classType, tagType} = editInfo

    let updateArr = [
        updateFieldFormat(TableArticle.ArticleTitle()),
        updateFieldFormat(TableArticle.ArticleSubtitle()),
        updateFieldFormat(TableArticle.ArticleKeyword()),
        updateFieldFormat(TableArticle.ArticleInfo()),
        updateFieldFormat(TableArticle.ArticleCover()),
        updateFieldFormat(TableArticle.ClassType()),
        updateFieldFormat(TableArticle.TagType()),
        updateFieldFormat(TableArticle.UpdateDate())
    ]

    let updateSql = `update ${TableArticle.TableName} set ${updateArr.join(',')} where ${TableArticle.ArticleId()} = ?`

    let updateData = [
        articleTitle,
        articleSubtitle,
        articleKeyword,
        articleInfo,
        articleCover,
        classType,
        tagType,
        dateFormat('yyyy-MM-dd hh:mm:ss', new Date()),
        articleId
    ]

    await mysql.query(updateSql, updateData)
}

/**
 * 保存文章内容
 */
const saveContent = async (articleId, articledContent) => {
    let updateArr = [
        updateFieldFormat(TableArticle.ArticleContent()),
        updateFieldFormat(TableArticle.UpdateDate())
    ]

    let updateSql = `update ${TableArticle.TableName} set ${updateArr.join(',')} where ${TableArticle.ArticleId()} = ?`

    let updateData = [
        articledContent,
        dateFormat('yyyy-MM-dd hh:mm:ss', new Date()),
        articleId
    ]

    await mysql.query(updateSql, updateData)
}

/**
 * 删除文章(假删)
 * @param articleId
 * @returns {Promise<void>}
 */
const deleteArticle = async articleId => {
    // 改变删除状态并且改变发布状态为未发布
    let deleteSql = `update ${TableArticle.TableName} set ${TableArticle.IsPublish()} = 0, ${TableArticle.IsDelete()} = 1 where ${TableArticle.ArticleId()} = ?`

    await mysql.query(deleteSql, [articleId])
}

/**
 * 恢复文章
 * @param articleId
 * @returns {Promise<void>}
 */
const recoverArticle = async articleId => {
    // 改变删除状态
    let updateSql = `update ${TableArticle.TableName} set ${TableArticle.IsDelete()} = 0 where ${TableArticle.ArticleId()} = ?`

    await mysql.query(updateSql, [articleId])
}

/**
 * 修改文章发布状态
 * @param articleId
 * @param isPublish
 * @returns {Promise<void>}
 */
const updatePublish = async (articleId, isPublish) => {
    let updateSql = `update ${TableArticle.TableName} set ${TableArticle.IsPublish()} = ? where ${TableArticle.ArticleId()} = ?`

    await mysql.query(updateSql, [isPublish, articleId])
}

/**
 * 获取文章信息
 * @param articleId
 * @returns {Promise<*>}
 */
const getArticleInfo = async articleId => {
    let selectArr = [
        queryFieldFormat(TableArticle.ArticleId()),
        queryFieldFormat(TableArticle.ArticleTitle()),
        queryFieldFormat(TableArticle.ArticleSubtitle()),
        queryFieldFormat(TableArticle.ArticleKeyword()),
        queryFieldFormat(TableArticle.ArticleInfo()),
        queryFieldFormat(TableArticle.ArticleCover()),
        queryFieldFormat(TableArticle.ArticleContent()),
        queryFieldFormat(TableArticle.ClassType()),
        queryFieldFormat(TableArticle.TagType()),
        queryFieldFormat(TableArticle.IsPublish()),
        queryFieldFormat(TableArticle.Hits),
        queryFieldFormat(TableArticle.DiscussNum()),
        queryFieldFormat(TableArticle.CreateUser()),
        queryFieldFormat(TableArticle.CreateUsername()),
        queryFieldFormat(TableArticle.UpdateDate()),
        queryFieldFormat(TableArticle.CreateDate())
    ]

    let selectSql = `select ${selectArr.join(',')} from ${TableArticle.TableName} where ${TableArticle.ArticleId()} = ?`

    let articleInfo = await mysql.queryOne(selectSql, [articleId])

    return articleInfo
}

/**
 * 获取文章内容
 * @param articleId
 * @returns {Promise<unknown>}
 */
const getContent = async articleId => {
    let selectArr = [
        queryFieldFormat(TableArticle.ArticleId()),
        queryFieldFormat(TableArticle.ArticleContent())
    ]

    let selectSql = `select ${selectArr.join(',')} from ${TableArticle.TableName} where ${TableArticle.ArticleId()} = ?`

    let content = await mysql.queryOne(selectSql, [articleId])

    return content
}

/**
 * 获取文章总数
 * @returns {Promise<unknown>}
 */
const getArticleCount = async () => {
    const count = await mysql.queryCount(`select ${TableArticle.ArticleId()} from ${TableArticle.TableName} where ${TableArticle.IsDelete()} = 0 and ${TableArticle.IsPublish()} = 1`)

    return count
}

/**
 * 获取所有文章
 * @returns {Promise<*>}
 */
const getArticles = async () => {
    let articles = await mysql.query(`select ${queryFieldFormat(TableArticle.ClassType())} from ${TableArticle.TableName} where ${TableArticle.IsDelete()} = 0 and ${TableArticle.IsPublish()} = 1`)

    return articles
}

module.exports = {
    getArticleList,
    newArticle,
    editArticle,
    saveContent,
    deleteArticle,
    recoverArticle,
    updatePublish,
    getArticleInfo,
    getContent,
    getArticleCount,
    getArticles
}
