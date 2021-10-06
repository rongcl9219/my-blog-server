/**
 * @description webInfoController
 */

const statusCode = require('../utils/statusCode')
const {webInfoService} = require('../services/index')
const {successResult, failResult} = require('../utils/resultHelper')

/**
 * 获取网站信息
 */
const getWebInfo = async (req, res) => {
    try {
        let result = await webInfoService.getWebInfo()

        return res.json(successResult(result))
    } catch (e) {
        return res.json(failResult('error', statusCode.SYS_ERROR, {errorMsg: {stack: e.stack, message: e.message}}))
    }
}

/**
 * 保存网站信息
 */
const saveWebInfo = async (req, res) => {
    try {
        let {paramObj} = req.body

        if (!paramObj) {
            return res.json(failResult('参数错误', statusCode.PARAMS_INVALID))
        }

        await webInfoService.saveWebInfo(paramObj)

        return res.json(successResult())
    } catch (e) {
        return res.json(failResult('error', statusCode.SYS_ERROR, {errorMsg: {stack: e.stack, message: e.message}}))
    }
}

module.exports = {
    getWebInfo,
    saveWebInfo
}
