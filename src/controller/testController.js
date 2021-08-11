const { testService } = require('../service/index')

const test = async (req, res, next) => {

    // 调用service层
    let data = await testService.test('test')

    return res.json({
        code: 200,
        msg: 'test',
        data: data
    })
}

module.exports = {
    test
}