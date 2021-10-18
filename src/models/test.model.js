/**
 * @description model层，用于和db交互
 */

const mysql = require('../db/mysql')
const TableUser = require('../db/dataBase/table_user')

const {queryFieldFormat} = require('../utils/stringFormat')

const test = async () => {
    let queryArr = [
        queryFieldFormat(TableUser.UserId()),
        queryFieldFormat(TableUser.UserName())
    ]

    let selectSql = `select ${queryArr.join(',')} from ${TableUser.TableName}`

    return await mysql.query(selectSql)
}

module.exports = {
    test
}