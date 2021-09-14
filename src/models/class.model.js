/**
 * @description sysClassModule
 */

const mysql = require('../db/mysql')
const TableClass = require('../db/dataBase/table_class')
const {queryFieldFormat,updateFieldFormat} = require('../utils/stringFormat')
const {dateFormat} = require('../utils/tool')
const {resume_up} = require("qiniu");

/**
 * 获取分裂列表
 * @param page 当前页数
 * @param pageSize 每页数量
 * @returns {Promise<{total: number, classList: unknown}>}
 */
const getClassList = async (page, pageSize) => {
    let selectArr = [
        queryFieldFormat(TableClass.ClassId()),
        queryFieldFormat(TableClass.ClassCode()),
        queryFieldFormat(TableClass.ClassName()),
        queryFieldFormat(TableClass.ClassType()),
        queryFieldFormat(TableClass.ClassDesc()),
        queryFieldFormat(TableClass.CreateDate())
    ]

    let selectSql = `select ${selectArr.join(',')} from ${TableClass.TableName} order by ${TableClass.CreateDate()} desc limit ?,?`

    let classList = await mysql.query(selectSql, [page, pageSize])

    let total = await mysql.queryCount(`select * from ${TableClass.TableName}`)

    return {
        classList,
        total: Number(total)
    }
}

/**
 * 新增分类
 * @param classCode
 * @param className
 * @param classType
 * @param classDesc
 * @returns {Promise<void>}
 */
const newClass = async (classCode, className, classType, classDesc) => {
    let insertArr = [
        TableClass.ClassCode(),
        TableClass.ClassName(),
        TableClass.ClassDesc(),
        TableClass.ClassType(),
        TableClass.CreateDate()
    ]

    let insertSql = `insert into ${TableClass.TableName} (${insertArr.join(',')}) values (?,?,?,?,?)`

    let insertData = [
        classCode,
        className,
        classDesc,
        classType,
        dateFormat('yyyy-MM-dd hh:mm:ss', new Date())
    ]

    await mysql.query(insertSql, insertData)
}

/**
 * 修改分类
 * @param classId
 * @param classCode
 * @param className
 * @param classType
 * @param classDesc
 * @returns {Promise<void>}
 */
const updateClass = async (classId, classCode, className, classType, classDesc) => {
    let updateArr = [
        updateFieldFormat(TableClass.ClassCode()),
        updateFieldFormat(TableClass.ClassName()),
        updateFieldFormat(TableClass.ClassType()),
        updateFieldFormat(TableClass.ClassDesc())
    ]

    let updateSql = `update ${TableClass.TableName} set ${updateArr.join(',')} where ${TableClass.ClassId()} = ?`

    let updateData = [
        classCode,
        className,
        classType,
        classDesc,
        classId
    ]

    await mysql.query(updateSql, updateData)
}

/**
 * 删除分类
 * @param classId
 * @returns {Promise<void>}
 */
const deleteClass = async classId => {
    let deleteSql = `delete from ${TableClass.TableName} where ${TableClass.ClassId()} = ?`

    await mysql.query(deleteSql, [classId])
}

/**
 * 获取分类信息
 * @param classId
 * @returns {Promise<unknown>}
 */
const getClassInfo = async classId => {
    let selectArr = [
        queryFieldFormat(TableClass.ClassId()),
        queryFieldFormat(TableClass.ClassCode()),
        queryFieldFormat(TableClass.ClassName()),
        queryFieldFormat(TableClass.ClassType()),
        queryFieldFormat(TableClass.ClassDesc()),
        queryFieldFormat(TableClass.CreateDate())
    ]

    let selectSql = `select ${selectArr.join(',')} from ${TableClass.TableName} where ${TableClass.ClassId()} = ?`

    let result = await mysql.queryOne(selectSql, [classId])

    return result
}

module.exports = {
    getClassList,
    newClass,
    updateClass,
    deleteClass,
    getClassInfo
}
