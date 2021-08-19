/**
 * @description commonModule
 */

const mysql = require('../db/mysql')
const TableUser = require('../db/dataBase/table_user')

const {queryFieldFormat} = require('../utils/stringFormat')

/**
 * 验证token
 * @param userId
 * @returns {Promise<unknown>}
 */
const checkToken = async userId => {
    let selectSql = `select ${queryFieldFormat(TableUser.AccessToken())}, ${queryFieldFormat(TableUser.RefreshToken())} from ${TableUser.TableName} where ${TableUser.UserId()} = ?`

    let result = await mysql.queryOne(selectSql, [userId])

    return result
}

module.exports = {
    checkToken
}
