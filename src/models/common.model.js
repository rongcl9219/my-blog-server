/**
 * @description commonModel
 */

const mysql = require('../db/mysql')
const TableUser = require('../db/dataBase/table_user')
const TableComment = require('../db/dataBase/table_comment')
const {dateFormat} = require('../utils/tool')
const {queryFieldFormat} = require('../utils/stringFormat')

/**
 * 验证token
 * @param userId
 * @returns {Promise<unknown>}
 */
const checkToken = async userId => {
    let selectSql = `select ${queryFieldFormat(TableUser.AccessToken())}, ${queryFieldFormat(TableUser.RefreshToken())} from ${TableUser.TableName} where ${TableUser.UserId()} = ?`

    return await mysql.queryOne(selectSql, [userId])
}

/**
 * 获取文章评论
 * @param articleId
 * @returns {Promise<*[]>}
 */
const getComment = async articleId => {
    const selectArr = [
        queryFieldFormat(TableComment.CommentId()),
        queryFieldFormat(TableComment.UserName()),
        queryFieldFormat(TableComment.ParentCommentId()),
        queryFieldFormat(TableComment.ParentCommentUserName()),
        queryFieldFormat(TableComment.ReplyCommentId()),
        queryFieldFormat(TableComment.ReplyCommentUserName()),
        TableComment.Content,
        queryFieldFormat(TableComment.CommentLevel()),
        queryFieldFormat(TableComment.CreateDate())
    ]

    const whereStr = 'is_delete = 0 and status = 1 and article_id = ?'

    const selectSql = `select ${selectArr.join(',')} from ${TableComment.TableName} where ${whereStr} order by create_date desc`

    return await mysql.query(selectSql, [articleId])
}

/**
 * 添加评论和回复
 * @param data
 * @returns {Promise<void>}
 */
const addComment = async (data) => {
    const {
        userName,
        content,
        articleId,
        commentLevel,
        parentCommentId,
        parentCommentUserName,
        replyCommentId,
        replyCommentUserName
    } = data

    const insertArr = [
        TableComment.UserName(),
        TableComment.ArticleId(),
        TableComment.ParentCommentId(),
        TableComment.ParentCommentUserName(),
        TableComment.ReplyCommentId(),
        TableComment.ReplyCommentUserName(),
        TableComment.CommentLevel(),
        TableComment.Content,
        TableComment.CreateDate()
    ]

    const insertSql = `insert into ${TableComment.TableName} (${insertArr.join(',')}) values (?,?,?,?,?,?,?,?,?)`

    const insertData = [
        userName,
        articleId,
        parentCommentId,
        parentCommentUserName,
        replyCommentId,
        replyCommentUserName,
        commentLevel,
        content,
        dateFormat('yyyy-MM-dd hh:mm:ss', new Date())
    ]

    await mysql.query(insertSql, insertData)
}

module.exports = {
    checkToken,
    getComment,
    addComment
}
