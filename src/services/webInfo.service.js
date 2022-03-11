/**
 * @description webInfoService
 */

const {webInfoModel} = require('../models/index')
const {getFileUrl} = require('../utils/qiniu')
const {success} = require("../utils/resultHelper")
const mysql = require('../db/mysql')

/**
 * 获取网站信息
 * @returns {Promise<{}>}
 */
const getWebInfo = async () => {
    let webParams = await webInfoModel.getWebInfo()

    let paramData = {}
    webParams.forEach((param) => {
        paramData[param.param_key] = param.param_value
        if (param.param_key === 'WEB_AVATAR') {
            paramData[param.param_key] = {
                url: getFileUrl(param.param_value, true, '', 'avatar'),
                key: param.param_value
            }
        }

        if (param.param_key === 'WEB_BANNER') {
            paramData[param.param_key] = {
                url: getFileUrl(param.param_value, true, '', 'zipImage'),
                key: param.param_value
            }
        }
    })

    return {paramData}
}

/**
 * 保存网站信息
 * @param paramObj
 * @returns {Promise<{data: string, flag: boolean}>}
 */
const saveWebInfo = async paramObj => {
    let insertSqlArr = []

    for (let key in paramObj) {
        // 判断是否存在
        let isExist = await mysql.queryCount('select * from web_info where param_key = ?', [key])

        if (isExist === 0) {
            let sql = `insert into web_info (param_key, param_value) values (?,?)`
            insertSqlArr.push({
                sql: sql,
                values: [key, paramObj[key]]
            })
        } else {
            let sql = `update web_info set param_value = ? where param_key = ?`
            insertSqlArr.push({
                sql: sql,
                values: [paramObj[key], key]
            })
        }
    }

    await webInfoModel.saveWebInfo(insertSqlArr)

    return success()
}

module.exports = {
    getWebInfo,
    saveWebInfo
}
