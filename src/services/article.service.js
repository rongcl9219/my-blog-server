/**
 * @description articleService
 */
const {articleModel, classModel, tagModel, userModel} = require('../models/index')
const {success, fail, failResult} = require('../utils/resultHelper')
const {dateFormat, checkNumber} = require('../utils/tool')
const statusCode = require('../utils/statusCode')
const {getFileUrl} = require('../utils/qiniu')

/**
 * 获取文章列表
 * @param page
 * @param pageSize
 * @param query
 * @param classType
 * @param tagType
 * @param articleStatus
 * @returns {Promise<{data: string, flag: boolean}>}
 */
const getArticleList = async (page, pageSize, query, classType, tagType, articleStatus) => {
    page = checkNumber(page)
    pageSize = checkNumber(pageSize)
    articleStatus = checkNumber(articleStatus)
    let pageNum = (page - 1) * pageSize

    let result = await articleModel.getArticleList(pageNum, pageSize, query, classType, tagType, articleStatus)

    if (result.articleData.length > 0) {
        let classList = await classModel.getAllClass()

        let tagList = await tagModel.getAllTag()

        result.articleData.map(article => {
            article.createDate = dateFormat('yyyy-MM-dd hh:mm:ss', article.createDate)

            article.articleCover = getFileUrl(article.articleCover, true, '', 'articleCover')

            article.classTypeList = classList.filter(classType => {
                return article.classType.split(',').indexOf(classType.classId.toString()) > -1
            })

            article.tagTypeList = tagList.filter(tagType => {
                return article.tagType.split(',').indexOf(tagType.tagId.toString()) > -1
            })
        })
    }

    let data = {
        articleList: result.articleData,
        pagination: {
            total: result.total,
            page,
            pageSize
        }
    }

    return success(data)
}

/**
 * 新增文章
 * @param newInfo
 * @returns {Promise<{data: string, flag: boolean}>}
 */
const newArticle = async (newInfo) => {
    let {userId} = newInfo

    let userInfo = await userModel.getUserInfo(userId)

    newInfo.username = userInfo.userName

    await articleModel.newArticle(newInfo)

    return success()
}

/**
 * 编辑文章基础信息
 * @param editInfo
 * @returns {Promise<{data: string, flag: boolean}>}
 */
const editArticle = async (editInfo) => {
    await articleModel.editArticle(editInfo)

    return success()
}

/**
 * 保存文章内容
 * @param articleId
 * @param articledContent
 * @returns {Promise<{data: string, flag: boolean}>}
 */
const saveContent = async (articleId, articledContent) => {
    await articleModel.saveContent(articleId, articledContent)

    return success()
}

/**
 * 删除文章(假删)
 * @param articleId
 * @returns {Promise<{data: string, flag: boolean}>}
 */
const deleteArticle = async articleId => {
    await articleModel.deleteArticle(articleId)

    return success()
}

/**
 * 恢复文章
 * @param articleId
 * @returns {Promise<{data: string, flag: boolean}>}
 */
const recoverArticle = async articleId => {
    await articleModel.recoverArticle(articleId)

    return success()
}

/**
 * 修改文章发布状态
 * @param articleId
 * @param isPublish
 * @returns {Promise<{data: string, flag: boolean}>}
 */
const updatePublish = async (articleId, isPublish) => {
    isPublish = isPublish == 0 ? 1 : 0

    await articleModel.updatePublish(articleId, isPublish)

    return success()
}

/**
 * 获取文章信息
 * @param articleId
 * @returns {Promise<{data: string, flag: boolean}>}
 */
const getArticleInfo = async articleId => {
    let result = await articleModel.getArticleInfo(articleId)

    result.createDate = dateFormat('yyyy-MM-dd hh:mm:ss', result.createDate)

    result.articleCoverInfo = {
        key: result.articleCover,
        url: getFileUrl(result.articleCover, true, '', 'articleCover')
    }

    result.classTypeList = await classModel.getAllClass(result.classType.split(','))
    result.tagTypeList = await tagModel.getAllTag(result.tagType.split(','))

    return success(result)
}

/**
 * 获取文章内容
 * @param articleId
 * @returns {Promise<{data: string, flag: boolean}>}
 */
const getContent = async articleId => {
    let result = await articleModel.getContent(articleId)

    return success(result)
}

module.exports = {
    getArticleList,
    newArticle,
    editArticle,
    saveContent,
    deleteArticle,
    recoverArticle,
    updatePublish,
    getArticleInfo,
    getContent
}
