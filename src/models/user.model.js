/**
 * @description userModel
 */

const mysql = require('../db/mysql')
const TableUser = require('../db/dataBase/table_user')

const {queryFieldFormat,updateFieldFormat} = require('../utils/stringFormat')
const {dateFormat} = require("../utils/tool");

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

    return await mysql.queryOne(selectSql)
}

/**
 * 修改登录次数
 * @param updateData
 * @returns {Promise<unknown>}
 */
const updateLoginTime = async (updateData) => {
    let {username, loginTime, allowLoginDate, lastLoginDate} = updateData
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

    let updateSql = `update ${TableUser.TableName} set ${updateArr.join(',')} where ${TableUser.UserName()} = ?`

    await mysql.queryOne(updateSql, updateDataArr)
}

/**
 * 修改token
 * @param userId
 * @param accessToken
 * @param refreshToken
 * @returns {Promise<void>}
 */
const updateToken = async (userId, {accessToken = '', refreshToken = ''}) => {
    let updateSql = `update ${TableUser.TableName} set ${updateFieldFormat(TableUser.AccessToken())}, ${updateFieldFormat(TableUser.RefreshToken())} where ${TableUser.UserId()} = ?`

    await mysql.queryOne(updateSql, [accessToken, refreshToken, userId])
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
        TableUser.Email,
        queryFieldFormat(TableUser.LastLoginDate())
    ]

    let selectSql = `select ${queryArr.join(',')} from ${TableUser.TableName} where ${TableUser.UserId()} = '${userId}'`

    return await mysql.queryOne(selectSql)
}

/**
 * 退出登录
 * @param accessToken
 * @returns {Promise<void>}
 */
const loginOut = async accessToken => {
    let updateSql = `update ${TableUser.TableName} set ${updateFieldFormat(TableUser.AccessToken())}, ${updateFieldFormat(TableUser.RefreshToken())} where ${TableUser.AccessToken()} = ?`

    await mysql.queryOne(updateSql, ['', '', accessToken])
}

/**
 * 检查密码
 * @param userId
 * @returns {Promise<unknown>}
 */
const checkPassword = async userId => {
    let queryArr = [
        TableUser.Salt,
        TableUser.Password
    ]

    let selectSql = `select ${queryArr.join(',')} from ${TableUser.TableName} where ${TableUser.UserId()} = '${userId}'`

    let result = await mysql.queryOne(selectSql)

    return result
}

/**
 * 修改密码
 * @param userId 用户id
 * @param cleartextPassword 明文密码
 * @param password 密文密码
 * @param salt 盐值
 * @returns {Promise<void>}
 */
const updatePassword = async (userId, cleartextPassword, {password, salt}) => {
    let updateArr = [
        updateFieldFormat(TableUser.Password),
        updateFieldFormat(TableUser.CleartextPassword()),
        updateFieldFormat(TableUser.Salt),
        updateFieldFormat(TableUser.AccessToken()),
        updateFieldFormat(TableUser.RefreshToken())
    ]

    let updateSql = `update ${TableUser.TableName} set ${updateArr.join(',')} where ${TableUser.UserId()} = ?`

    await mysql.query(updateSql, [password, cleartextPassword, salt, '', '', userId])
}

/**
 * 修改用户信息
 * @param avatar 头像
 * @param signature 个性签名
 * @param email 邮箱
 * @param userId 用户id
 * @returns {Promise<void>}
 */
const updateUserInfo = async (avatar, signature, email, userId) => {
    let updateArr = [
        updateFieldFormat(TableUser.Avatar),
        updateFieldFormat(TableUser.Signature),
        updateFieldFormat(TableUser.Email)
    ]

    let updateSql = `update ${TableUser.TableName} set ${updateArr.join(',')} where ${TableUser.UserId()} = ?`

    await mysql.query(updateSql, [avatar, signature, email, userId])
}

/**
 * 新增用户
 * @param userInfo
 * @returns {Promise<void>}
 */
const newUser = async userInfo => {
    const {userId, username, userType, password, salt, cleartextPassword, status, email = '', avatar = '', signature = ''} = userInfo

    let insertArr = [
        TableUser.UserId(),
        TableUser.UserName(),
        TableUser.UserType(),
        TableUser.Password,
        TableUser.Salt,
        TableUser.CleartextPassword(),
        TableUser.Status,
        TableUser.Email,
        TableUser.Avatar,
        TableUser.Signature,
        TableUser.CreateDate()
    ]

    let insertSql = `insert into ${TableUser.TableName} (${insertArr.join(',')}) values (?,?,?,?,?,?,?,?,?,?,?)`

    let insertData = [
        userId,
        username,
        userType,
        password,
        salt,
        cleartextPassword,
        status,
        email,
        avatar,
        signature,
        dateFormat('yyyy-MM-dd hh:mm:ss', new Date())
    ]

    await mysql.query(insertSql, insertData)
}

/**
 * 检查管理员
 * @returns {Promise<unknown>}
 */
const checkAdmin = async () => {
    let selectSql = `select ${queryFieldFormat(TableUser.UserId())} from ${TableUser.TableName} where ${TableUser.UserName()} = 'admin'`

    return await mysql.queryOne(selectSql)
}

module.exports = {
    login,
    updateLoginTime,
    getUserInfo,
    updateToken,
    loginOut,
    checkPassword,
    updatePassword,
    updateUserInfo,
    newUser,
    checkAdmin
}
