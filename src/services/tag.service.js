/**
 * @description tagService
 */

const {tagModle} = require('../models/index')
const {success} = require('../utils/resultHelper')
const {dateFormat, checkNumber} = require('../utils/tool')

/**
 * 获取标签列表
 * @param page 当前页
 * @param pageSize 每页数量
 * @returns {Promise<{data: string, flag: boolean}>}
 */
const getTagList = async (page, pageSize) => {
    page = checkNumber(page)
    pageSize = checkNumber(pageSize)

    let pageNum = (page - 1) * pageSize

    let result = await tagModle.getTagList(pageNum, pageSize)

    let index = 1
    result.tagList.map(item => {
        item.index = pageNum + index
        item.createDate = dateFormat('yyyy-MM-dd hh:mm:ss', item.createDate)
        index++
    })

    let data = {
        tagList: result.tagList,
        pagination: {
            total: result.total,
            page,
            pageSize
        }
    }

    return success(data)
}

/**
 * 新建标签
 * @param tagName
 * @param classType
 * @param tagDesc
 * @returns {Promise<{data: string, flag: boolean}>}
 */
const newTag = async (tagName, classType, tagDesc) => {
    await tagModle.newTag(tagName, classType, tagDesc)

    return success()
}

/**
 * 修改标签
 * @param tagId
 * @param tagName
 * @param classType
 * @param tagDesc
 * @returns {Promise<{data: string, flag: boolean}>}
 */
const updateTag = async (tagId, tagName, classType, tagDesc) => {
    await tagModle.updateTag(tagId, tagName, classType, tagDesc)

    return success()
}

/**
 * 删除标签
 * @param tagId
 * @returns {Promise<{data: string, flag: boolean}>}
 */
const deleteTag = async tagId => {
    await tagModle.deleteTag(tagId)

    return success()
}

/**
 * 获取标签信息
 * @param tagId
 * @returns {Promise<{data: string, flag: boolean}>}
 */
const getTagInfo = async tagId => {
    let result = await tagModle.getTagInfo(tagId)

    return success(result)
}

/**
 * 获取所有标签
 * @returns {Promise<{data: string, flag: boolean}>}
 */
const getAllTag = async () => {
    let result = await tagModle.getAllTag()

    return success(result)
}

module.exports = {
    getTagList,
    newTag,
    updateTag,
    deleteTag,
    getTagInfo,
    getAllTag
}
