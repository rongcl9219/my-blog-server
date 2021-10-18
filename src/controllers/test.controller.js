/**
 * @description controller层，用于参数校验和返回数据
 */

const { testService } = require('../services/index')

const test = async (req, res, next) => {

    // 调用service层
    let data = await testService.test('test')

    return res.json({
        code: 200,
        msg: 'test build',
        data: data
    })
}

module.exports = {
    test
}