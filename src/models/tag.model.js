/**
 * @description sysTagModule
 */

const mysql = require('../db/mysql')
const TableTag = require('../db/dataBase/table_tag')
const TableClass = require('../db/dataBase/table_class')
const {queryFieldFormat, updateFieldFormat} = require('../utils/stringFormat')
const {dateFormat} = require('../utils/tool')

/**
 * 获取标签列表
 * @param page 当前页数
 * @param pageSize 每页数量
 * @returns {Promise<{total: number, classList: unknown}>}
 */
const getTagList = async (page, pageSize) => {
    let selectArr = [
        `tag.${queryFieldFormat(TableTag.TagId())}`,
        `tag.${queryFieldFormat(TableTag.TagName())}`,
        `tag.${queryFieldFormat(TableTag.ClassType())}`,
        `class.${queryFieldFormat(TableClass.ClassName())}`,
        `tag.${queryFieldFormat(TableTag.TagDesc())}`,
        `tag.${queryFieldFormat(TableTag.CreateDate())}`
    ]

    let selectSql = `select ${selectArr.join(',')} from ${TableTag.TableName} tag left join ${TableClass.TableName} class on tag.${TableTag.ClassType()} = class.${TableClass.ClassId()} order by tag.${TableTag.CreateDate()} desc limit ?,?`

    let tagList = await mysql.query(selectSql, [page, pageSize])

    let total = await mysql.queryCount(`select * from ${TableTag.TableName}`)

    return {
        tagList,
        total: Number(total)
    }
}

/**
 * 新增标签
 * @param tagName
 * @param classType
 * @param tagDesc
 * @returns {Promise<void>}
 */
const newTag = async (tagName, classType, tagDesc) => {
    let insertArr = [
        TableTag.TagName(),
        TableTag.ClassType(),
        TableTag.TagDesc(),
        TableTag.CreateDate()
    ]

    let insertSql = `insert into ${TableTag.TableName} (${insertArr.join(',')}) values (?,?,?,?)`

    let insertData = [
        tagName,
        classType,
        tagDesc,
        dateFormat('yyyy-MM-dd hh:mm:ss', new Date())
    ]

    await mysql.query(insertSql, insertData)
}

/**
 * 修改标签
 * @param tagId
 * @param tagName
 * @param classType
 * @param tagDesc
 * @returns {Promise<void>}
 */
const updateTag = async (tagId, tagName, classType, tagDesc) => {
    let updateArr = [
        updateFieldFormat(TableTag.TagName()),
        updateFieldFormat(TableTag.ClassType()),
        updateFieldFormat(TableTag.TagDesc())
    ]

    let updateSql = `update ${TableTag.TableName} set ${updateArr.join(',')} where ${TableTag.TagId()} = ?`

    let updateData = [
        tagName,
        classType,
        tagDesc,
        tagId
    ]

    await mysql.query(updateSql, updateData)
}

/**
 * 删除标签
 * @param tagId
 * @returns {Promise<void>}
 */
const deleteTag = async tagId => {
    let deleteSql = `delete from ${TableTag.TableName} where ${TableTag.TagId()} = ?`

    await mysql.query(deleteSql, [tagId])
}

/**
 * 获取标签信息
 * @param tagId
 * @returns {Promise<unknown>}
 */
const getTagInfo = async tagId => {
    let selectArr = [
        queryFieldFormat(TableTag.TagId()),
        queryFieldFormat(TableTag.TagName()),
        queryFieldFormat(TableTag.ClassType()),
        queryFieldFormat(TableTag.TagDesc()),
        queryFieldFormat(TableTag.CreateDate())
    ]

    let selectSql = `select ${selectArr.join(',')} from ${TableTag.TableName} where ${TableTag.TagId()} = ?`

    let result = await mysql.queryOne(selectSql, [tagId])

    return result
}

/**
 * 获取所有标签
 * @param tagIds 标签id数组
 * @returns {Promise<*>}
 */
const getAllTag = async (tagIds) => {
    let selectArr = [
        queryFieldFormat(TableTag.TagId()),
        queryFieldFormat(TableTag.TagName()),
        queryFieldFormat(TableTag.ClassType()),
        queryFieldFormat(TableTag.TagDesc()),
        queryFieldFormat(TableTag.CreateDate())
    ]

    let selectSql = `select ${selectArr.join(',')} from ${TableTag.TableName}`

    let selectData = []

    if (Array.isArray(tagIds) && tagIds.length > 0) {
        selectSql += ` where ${TableTag.TagId()} in (?)`

        selectData.push(tagIds)
    }

    let tagList = await mysql.query(selectSql, selectData)

    return tagList
}

const getTags = async () => {
    let selectArr = [
        queryFieldFormat(TableTag.TagId()),
        queryFieldFormat(TableTag.TagName())
    ]

    let selectSql = `select ${selectArr.join(',')} from ${TableTag.TableName}`

    let tagList = await mysql.query(selectSql)

    return tagList
}

module.exports = {
    getTagList,
    newTag,
    updateTag,
    deleteTag,
    getTagInfo,
    getAllTag,
    getTags
}
