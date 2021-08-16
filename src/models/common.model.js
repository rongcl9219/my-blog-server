/**
 * @description commonModule
 */

const mysql = require('../db/mysql')
const TableUser = require('../db/dataBase/table_user')

const {queryFieldFormat} = require('../utils/stringFormat')

const checkToken = async () => {
    let queryArr = [
        queryFieldFormat(TableUser.UserId()),
        queryFieldFormat(TableUser.UserName()),
        queryFieldFormat(TableUser.UserType()),
        queryFieldFormat(TableUser.AccessToken()),
        TableUser.Salt
    ]

    let selectSql = `select ${queryArr.join(',')} from ${TableUser.TableName}`

    let result = await mysql.query(selectSql)

    return result
}

module.exports = {
    checkToken
}