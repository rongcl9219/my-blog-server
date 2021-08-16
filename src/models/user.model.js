/**
 * @description userModule
 */

const mysql = require('../db/mysql')
const TableUser = require('../db/dataBase/table_user')

const {queryFieldFormat,updateFieldFormat} = require('../utils/stringFormat')

/**
 * 登录
 * @param username 用户名
 * @returns {Promise<unknown>}
 */
const login = async username => {
    let queryArr = [
        queryFieldFormat(TableUser.UserId()),
        queryFieldFormat(TableUser.UserName()),
        TableUser.Salt,
        TableUser.Password,
        queryFieldFormat(TableUser.LoginTime()),
        queryFieldFormat(TableUser.AllowLoginDate())
    ]

    let selectSql = `select ${queryArr.join(',')} from ${TableUser.TableName} where ${TableUser.UserName()} = '${username}'`

    let result = await mysql.queryOne(selectSql)

    return result
}

/**
 * 修改登录次数
 * @param username 用户名
 * @param loginTime 登录次数
 * @param allowLoginDate 允许登录时间
 * @param lastLoginDate 最后登录时间
 * @returns {Promise<unknown>}
 */
const updateLoginTime = async (updateData) => {
    let {username, loginTime, allowLoginDate, lastLoginDate} = {...updateData}
    let updateArr = [
        updateFieldFormat(TableUser.LoginTime())
    ]

    let updateDataArr = [
        loginTime
    ]

    if (allowLoginDate) {
        updateArr.push(updateFieldFormat(TableUser.AllowLoginDate()))

        updateDataArr.push(allowLoginDate)
    }

    if (lastLoginDate) {
        updateArr.push(updateFieldFormat(TableUser.LastLoginDate()))

        updateDataArr.push(lastLoginDate)
    }

    updateDataArr.push(username)

    let selectSql = `update ${TableUser.TableName} set ${updateArr.join(',')} where ${TableUser.UserName()} = ?`

    await mysql.queryOne(selectSql, updateDataArr)
}

/**
 * 获取用户信息
 * @param userId 用户id
 * @returns {Promise<unknown>}
 */
const getUserInfo = async userId => {
    let queryArr = [
        queryFieldFormat(TableUser.UserId()),
        queryFieldFormat(TableUser.UserName()),
        queryFieldFormat(TableUser.UserType()),
        TableUser.Avatar,
        TableUser.Signature,
        queryFieldFormat(TableUser.LastLoginDate())
    ]

    let selectSql = `select ${queryArr.join(',')} from ${TableUser.TableName} where ${TableUser.UserId()} = '${userId}'`

    let result = await mysql.queryOne(selectSql)

    return result
}

module.exports = {
    login,
    updateLoginTime,
    getUserInfo
}
