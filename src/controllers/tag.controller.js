/**
 * @description tagController
 */

const statusCode = require('../utils/statusCode')
const {tagService} = require('../services/index')
const {successResult, failResult, returnResult} = require('../utils/resultHelper')

/**
 * 获取标签列表
 */
const getTagList = async (req, res) => {
    try {
        let {page = 1, pageSize = 10} = req.query

        let result = await tagService.getTagList(page, pageSize)

        return res.json(returnResult(result))
    } catch (e) {
        return res.json(failResult('error', statusCode.SYS_ERROR, {errorMsg: {stack: e.stack, message: e.message}}))
    }
}

/**
 * 新建标签
 */
const newTag = async (req, res) => {
    try {
        let {tagName = '', classType = '', tagDesc = ''} = req.body

        if (!tagName.trim() || !classType.trim()) {
            return res.json(failResult('参数错误', statusCode.PARAMS_INVALID))
        }

        await tagService.newTag(tagName, classType, tagDesc)

        return res.json(successResult())
    } catch (e) {
        return res.json(failResult('error', statusCode.SYS_ERROR, {errorMsg: {stack: e.stack, message: e.message}}))
    }
}

/**
 * 修改标签
 */
const updateTag = async (req, res) => {
    try {
        let {tagId = '', tagName = '', classType = '', tagDesc = ''} = req.body

        if (!tagId || !tagName.trim() || !classType.trim()) {
            return res.json(failResult('参数错误', statusCode.PARAMS_INVALID))
        }

        await tagService.updateTag(tagId, tagName, classType, tagDesc)

        return res.json(successResult())
    } catch (e) {
        return res.json(failResult('error', statusCode.SYS_ERROR, {errorMsg: {stack: e.stack, message: e.message}}))
    }
}

/**
 * 删除标签
 */
const deleteTag = async (req, res) => {
    try {
        let {tagId} = req.body

        if (!tagId) {
            return res.json(failResult('参数错误', statusCode.PARAMS_INVALID))
        }

        await tagService.deleteTag(tagId)

        return res.json(successResult())
    } catch (e) {
        return res.json(failResult('error', statusCode.SYS_ERROR, {errorMsg: {stack: e.stack, message: e.message}}))
    }
}

/**
 * 获取标签信息
 */
const getTagInfo = async (req, res) => {
    try {
        let {tagId} = req.query

        if (!tagId) {
            return res.json(failResult('参数错误', statusCode.PARAMS_INVALID))
        }

        let result = await tagService.getTagInfo(tagId)

        return res.json(returnResult(result))
    } catch (e) {
        return res.json(failResult('error', statusCode.SYS_ERROR, {errorMsg: {stack: e.stack, message: e.message}}))
    }
}

/**
 * 获取所有标签
 */
const getAllTag = async (req, res) => {
    try {
        let result = await tagService.getAllTag()

        return res.json(returnResult(result))
    } catch (e) {
        return res.json(failResult('error', statusCode.SYS_ERROR, {errorMsg: {stack: e.stack, message: e.message}}))
    }
}

module.exports = {
    getTagList,
    newTag,
    updateTag,
    deleteTag,
    getTagInfo,
    getAllTag
}

