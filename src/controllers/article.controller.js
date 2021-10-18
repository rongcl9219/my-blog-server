/**
 * @description aritcleController
 */
const statusCode = require('../utils/statusCode')
const {articleService} = require('../services/index')
const {successResult, failResult, returnResult} = require('../utils/resultHelper')

/**
 * 获取文章列表
 */
const getArticleList = async (req, res) => {
    try {
        let {page = 1, pageSize = 10, query = '', classType = '', tagType = '', articleStatus = 0} = req.query

        let result = await articleService.getArticleList(page, pageSize, query, classType, tagType, articleStatus)

        return res.json(returnResult(result))
    } catch (e) {
        return res.json(failResult('error', statusCode.SYS_ERROR, {errorMsg: {stack: e.stack, message: e.message}}))
    }
}

/**
 * 新增文章
 */
const newArticle = async (req, res) => {
    try {
        let {
            articleTitle = '',
            articleSubtitle = '',
            articleKeyword = '',
            articleInfo = '',
            articleCover = '',
            classType = '',
            tagType = ''
        } = req.body

        let {userId} = req.data

        if (!articleTitle.trim() || !articleInfo.trim() || !articleCover.trim() || !classType.trim() || !tagType.trim()) {
            return res.json(failResult('参数错误', statusCode.PARAMS_INVALID))
        }

        await articleService.newArticle({articleTitle, articleSubtitle, articleKeyword, articleInfo, articleCover, classType, tagType, userId})

        return res.json(successResult())
    } catch (e) {
        return res.json(failResult('error', statusCode.SYS_ERROR, {errorMsg: {stack: e.stack, message: e.message}}))
    }
}

/**
 * 编辑文章基础信息
 */
const editArticle = async (req, res) => {
    try {
        let {
            articleId = '',
            articleTitle = '',
            articleSubtitle = '',
            articleKeyword = '',
            articleInfo = '',
            articleCover = '',
            classType = '',
            tagType = ''
        } = req.body

        if (!articleId.trim() || !articleTitle.trim() || !articleInfo.trim() || !articleCover.trim() || !classType.trim() || !tagType.trim()) {
            return res.json(failResult('参数错误', statusCode.PARAMS_INVALID))
        }

        await articleService.editArticle({articleId, articleTitle, articleSubtitle, articleKeyword, articleInfo, articleCover, classType, tagType})

        return res.json(successResult())
    } catch (e) {
        return res.json(failResult('error', statusCode.SYS_ERROR, {errorMsg: {stack: e.stack, message: e.message}}))
    }
}

/**
 * 保存文章内容
 */
const saveContent = async (req, res) => {
    try {
        let {articleId, articledContent = ''} = req.body

        if (!articleId || !articleId.trim()) {
            return res.json(failResult('参数错误', statusCode.PARAMS_INVALID))
        }

        await articleService.saveContent(articleId, articledContent)

        return res.json(successResult())
    } catch (e) {
        return res.json(failResult('error', statusCode.SYS_ERROR, {errorMsg: {stack: e.stack, message: e.message}}))
    }
}

/**
 * 删除文章(假删)
 */
const deleteArticle = async (req, res) => {
    try {
        let {articleId = ''} = req.query

        if (!articleId.trim()) {
            return res.json(failResult('参数错误', statusCode.PARAMS_INVALID))
        }

        await articleService.deleteArticle(articleId)

        return res.json(successResult())
    } catch (e) {
        return res.json(failResult('error', statusCode.SYS_ERROR, {errorMsg: {stack: e.stack, message: e.message}}))
    }
}

/**
 * 恢复文章
 */
const recoverArticle = async (req, res) => {
    try {
        let {articleId = ''} = req.query

        if (!articleId.trim()) {
            return res.json(failResult('参数错误', statusCode.PARAMS_INVALID))
        }

        await articleService.recoverArticle(articleId)

        return res.json(successResult())
    } catch (e) {
        return res.json(failResult('error', statusCode.SYS_ERROR, {errorMsg: {stack: e.stack, message: e.message}}))
    }
}

/**
 * 修改文章发布状态
 */
const updatePublish = async (req, res) => {
    try {
        let {articleId = '', isPublish} = req.query
        isPublish = String(isPublish)
        if (!articleId.trim() && (isPublish !== '0' || isPublish !== '1')) {
            return res.json(failResult('参数错误', statusCode.PARAMS_INVALID))
        }

        await articleService.updatePublish(articleId, isPublish)

        return res.json(successResult())
    } catch (e) {
        return res.json(failResult('error', statusCode.SYS_ERROR, {errorMsg: {stack: e.stack, message: e.message}}))
    }
}

/**
 * 获取文章信息
 */
const getArticleInfo = async (req, res) => {
    try {
        let {articleId = ''} = req.query

        if (!articleId.trim()) {
            return res.json(failResult('参数错误', statusCode.PARAMS_INVALID))
        }

        let result = await articleService.getArticleInfo(articleId)

        return res.json(returnResult(result))
    } catch (e) {
        return res.json(failResult('error', statusCode.SYS_ERROR, {errorMsg: {stack: e.stack, message: e.message}}))
    }
}

/**
 * 获取文章内容
 */
const getContent = async (req, res) => {
    try {
        let {articleId = ''} = req.query

        if (!articleId.trim()) {
            return res.json(failResult('参数错误', statusCode.PARAMS_INVALID))
        }

        let result = await articleService.getContent(articleId)

        return res.json(returnResult(result))
    } catch (e) {
        return res.json(failResult('error', statusCode.SYS_ERROR, {errorMsg: {stack: e.stack, message: e.message}}))
    }
}

/**
 * 获取最近发布的文章
 */
const getCurrentArticles = async (req, res) => {
    try {
        let result = await articleService.getCurrentArticles()

        return res.json(returnResult(result))
    } catch (e) {
        return res.json(failResult('error', statusCode.SYS_ERROR, {errorMsg: {stack: e.stack, message: e.message}}))
    }
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
    getContent,
    getCurrentArticles
}
