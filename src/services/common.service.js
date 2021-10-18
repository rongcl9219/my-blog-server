/**
 * @description commonService
 */
const {userModel, tagModel, classModel, articleModel, commonModel, webInfoModel} = require('../models/index')
const {initValidCode, dateFormat} = require('../utils/tool')
const {success} = require("../utils/resultHelper")
const {createToken} = require('../utils/token')
const {encryptToken} = require('../utils/encrypt')
const {getFileUrl, createUploadToken} = require('../utils/qiniu')
const webInfoService = require("./webInfo.service");

/**
 * 生成验证码
 */
const validCode = () => {
    return success({validCode: initValidCode(4, true)})
}

/**
 * 刷新token
 * @param userId 用户id
 * @returns {Promise<{data: string, flag: boolean}>}
 */
const refreshToken = async userId => {
    const token = await createToken(userId)

    await userModel.updateToken(userId, {
        accessToken: encryptToken(token.accessToken),
        refreshToken: encryptToken(token.refreshToken)
    })

    return success(token)
}

/**
 * 获取上传token
 * @param keys 文件key
 * @param thumbnail 图片处理格式名称
 * @returns {{data: string, flag: boolean}}
 */
const getUploadToken = (keys, thumbnail) => {
    let keyArr = keys.split(',')

    let tokenArr = []

    keyArr.map(key => {
        tokenArr.push({
            key: key,
            token: createUploadToken(key),
            url: getFileUrl(key, true, '', thumbnail)
        })
    })

    return success(tokenArr)
}

/**
 * 获取侧边栏信息
 */
const getAsideInfo = async () => {
    const tagCount = await tagModel.getTagCount()

    const classCount = await classModel.getClassCount()

    const articleCount = await articleModel.getArticleCount()

    const webInfo = await webInfoService.getWebInfo()

    return success({
        articleCount,
        classCount,
        tagCount,
        webInfo: webInfo.paramData
    })
}

/**
 * 获取文章评论
 * @param articleId
 * @returns {Promise<{data: string, flag: boolean}>}
 */
const getComment = async articleId => {
    const commentList = await commonModel.getComment(articleId)
    const commentCount = commentList.length
    let arr = []
    commentList.map(parent => {
        if (parent.commentLevel === 1) {
            parent.children = commentList.filter(child => {
                return parent.commentId === child.parentCommentId
            });
            arr.push(parent);
        }
    });

    return success({
        commentList: arr,
        count: commentCount
    })
}

/**
 * 添加评论和回复
 * @param data
 * @returns {Promise<{data: string, flag: boolean}>}
 */
const addComment = async data => {
    data.parentCommentId = data.parentCommentId || 0

    data.replyCommentId = data.replyCommentId || 0

    await commonModel.addComment(data)

    return success()
}

/**
 * 获取时间线数据
 * @returns {Promise<{data: string, flag: boolean}>}
 */
const getTimeLine = async () => {
    let articleList = await articleModel.getTimeLine()

    let timeArr = []

    if (articleList.length > 0) {
        timeArr = articleList.reduce((arr, cur, index, prev) => {
            let curYear = dateFormat('yyyy', cur.createDate)
            if (index > 0) {
                let prevYear = dateFormat('yyyy', prev[index - 1].createDate)

                if (curYear === prevYear) {
                    arr[arr.length - 1].list.push({
                        articleId: cur.articleId,
                        articleTitle: cur.articleTitle,
                        month: dateFormat('MM-dd', cur.createDate)
                    })
                    return arr
                }
            }
            arr.push({
                year: curYear,
                list: [
                    {
                        articleId: cur.articleId,
                        articleTitle: cur.articleTitle,
                        month: dateFormat('MM-dd', cur.createDate)
                    }
                ]
            })
            return arr
        }, [])
    }

    return success({
        list: timeArr,
        total: articleList.length
    })
}

module.exports = {
    validCode,
    refreshToken,
    getUploadToken,
    getAsideInfo,
    getComment,
    addComment,
    getTimeLine
}
