const { testModel } = require('../model/index')

const test = async (id) => {
    // 调用model层
    let userlist = await testModel.test()
    return {
        userlist
    }
}

module.exports = {
    test
}