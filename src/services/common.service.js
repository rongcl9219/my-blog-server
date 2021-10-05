/**
 * @description commonService
 */
const {userModel, tagModel, classModel, articleModel} = require('../models/index')
const {initValidCode} = require('../utils/tool')
const {success} = require("../utils/resultHelper")
const {createToken} = require('../utils/token')
const {encryptToken} = require('../utils/encrypt')
const {getFileUrl, createUploadToken} = require('../utils/qiniu')
const {commonModel} = require("../models");

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
 * @param key 文件key
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
    const tagList = await tagModel.getTags()

    const classList = await classModel.getClass()

    const articleCount = await articleModel.getArticleCount()

    return success({
        tagList,
        classList,
        articleCount
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
const addComment = async (data) => {
    data.parentCommentId = data.parentCommentId || 0

    data.replyCommentId = data.replyCommentId || 0

    await commonModel.addComment(data)

    return success()
}

module.exports = {
    validCode,
    refreshToken,
    getUploadToken,
    getAsideInfo,
    getComment,
    addComment
}
