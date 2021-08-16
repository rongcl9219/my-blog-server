/**
 * @description server层，处理业务逻辑，需要连接数据库
 */

const { testModel } = require('../models/index')

const test = async () => {
    // 调用model层
    let userList = await testModel.test()
    return {
        userList
    }
}

module.exports = {
    test
}