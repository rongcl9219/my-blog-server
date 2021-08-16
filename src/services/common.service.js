/**
 * @description commonService
 */

const { commonModel } = require('../models/index')

const checkToken = async () => {
    // 调用model层
    let userList = await commonModel.checkToken()
    return {
        userList
    }
}

module.exports = {
    checkToken
}