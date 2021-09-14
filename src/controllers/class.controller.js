/**
 * @description classController
 */

const statusCode = require('../utils/statusCode')
const {classService} = require('../services/index')
const {successResult, failResult, returnResult} = require('../utils/resultHelper')

/**
 * 获取分类列表
 */
const getClassList = async (req, res) => {
    try {
        let {page = 1, pageSize = 10} = req.query

        let result = await classService.getClassList(page, pageSize)

        return res.json(returnResult(result))
    } catch (e) {
        return res.json(failResult('error', statusCode.SYS_ERROR, {errorMsg: {stack: e.stack, message: e.message}}))
    }
}

/**
 * 新增分类
 */
const newClass = async (req, res) => {
    try {
        let {classCode, className, classType = 0, classDesc = ''} = req.body

        if (!classCode.trim() || !className.trim()) {
            return res.json(failResult('参数错误', statusCode.PARAMS_INVALID))
        }

        await classService.newClass(classCode, className, classType, classDesc)

        return res.json(successResult())
    } catch (e) {
        return res.json(failResult('error', statusCode.SYS_ERROR, {errorMsg: {stack: e.stack, message: e.message}}))
    }
}

/**
 * 修改分类
 */
const updateClass = async (req, res) => {
    try {
        let {classId, classCode, className, classType = 0, classDesc = ''} = req.body

        if (!classId || !classCode.trim() || !className.trim()) {
            return res.json(failResult('参数错误', statusCode.PARAMS_INVALID))
        }

        await classService.updateClass(classId, classCode, className, classType, classDesc)

        return res.json(successResult())
    } catch (e) {
        return res.json(failResult('error', statusCode.SYS_ERROR, {errorMsg: {stack: e.stack, message: e.message}}))
    }
}

/**
 * 删除分类
 */
const deleteClass = async (req, res) => {
    try {
        let {classId} = req.body

        if (!classId) {
            return res.json(failResult('参数错误', statusCode.PARAMS_INVALID))
        }

        await classService.deleteClass(classId)

        return res.json(successResult())
    } catch (e) {
        return res.json(failResult('error', statusCode.SYS_ERROR, {errorMsg: {stack: e.stack, message: e.message}}))
    }
}

/**
 * 获取分类信息
 */
const getClassInfo = async (req, res) => {
    try {
        let {classId} = req.query

        if (!classId) {
            return res.json(failResult('参数错误', statusCode.PARAMS_INVALID))
        }

        let result = await classService.getClassInfo(classId)

        return res.json(returnResult(result))
    } catch (e) {
        return res.json(failResult('error', statusCode.SYS_ERROR, {errorMsg: {stack: e.stack, message: e.message}}))
    }
}

module.exports = {
    getClassList,
    newClass,
    updateClass,
    deleteClass,
    getClassInfo
}
