/**
 * @description classService
 */

const {classModel} = require('../models/index')
const {fail, success} = require('../utils/resultHelper')
const statusCode = require('../utils/statusCode')
const {dateFormat, checkNumber} = require('../utils/tool')

/**
 * 获取分类列表
 * @param page 当前页
 * @param pageSize 每页数量
 * @returns {Promise<{data: string, flag: boolean}>}
 */
const getClassList = async (page, pageSize) => {
    page = checkNumber(page)
    pageSize = checkNumber(pageSize)

    let pageNum = (page - 1) * pageSize

    let result = await classModel.getClassList(pageNum, pageSize)

    let index = 1
    result.classList.map(item => {
        item.index = pageNum + index
        item.createDate = dateFormat('yyyy-MM-dd hh:mm:ss', item.createDate)
        index++
    })

    let data = {
        classList: result.classList,
        pagination: {
            total: result.total,
            page,
            pageSize
        }
    }

    return success(data)
}

/**
 * 新增分类
 * @param classCode
 * @param className
 * @param classType
 * @param classDesc
 * @returns {Promise<{data: string, flag: boolean}>}
 */
const newClass = async (classCode, className, classType, classDesc) => {
    await classModel.newClass(classCode, className, classType, classDesc)

    return success()
}

/**
 * 修改分类
 * @param classId
 * @param classCode
 * @param className
 * @param classType
 * @param classDesc
 * @returns {Promise<{data: string, flag: boolean}>}
 */
const updateClass = async (classId, classCode, className, classType, classDesc) => {
    await classModel.updateClass(classId, classCode, className, classType, classDesc)

    return success()
}

/**
 * 删除分类
 * @param classId
 * @returns {Promise<{data: string, flag: boolean}>}
 */
const deleteClass = async classId => {
    await classModel.deleteClass(classId)

    return success()
}

/**
 * 获取分类信息
 * @param classId
 * @returns {Promise<{data: string, flag: boolean}>}
 */
const getClassInfo = async classId => {
    let result = await classModel.getClassInfo(classId)

    return success(result)
}

module.exports = {
    getClassList,
    newClass,
    updateClass,
    deleteClass,
    getClassInfo
}
