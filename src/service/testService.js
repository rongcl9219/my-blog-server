const { testModel } = require('../model/index')

const test = async (id) => {
    let userlist = await testModel.test()
    return {
        userlist
    }
}

module.exports = {
    test
}