const mysql = require('../db/mysql')

const test = async (params) => {
    let selectSql = 'select * from user'

    let result = await mysql.query(selectSql)

    return result
}

module.exports = {
    test
}