/**
 * @description webInfoModule
 */

const mysql = require('../db/mysql')

/**
 * 获取网站信息
 * @returns {Promise<*>}
 */
const getWebInfo = async () => {
    let result = await mysql.query(`select * from web_info`)

    return result
}

/**
 * 保存网站信息
 * @param insertSqlArr
 * @returns {Promise<void>}
 */
const saveWebInfo = async (insertSqlArr) => {
    await mysql.execTransaction(insertSqlArr)
}

module.exports = {
    getWebInfo,
    saveWebInfo
}
