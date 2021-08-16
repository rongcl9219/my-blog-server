/**
 * @description userController
 */

const { commonService } = require('../services/index')

const checkToken = async (req, res) => {

    // 调用service层
    let data = await commonService.checkToken('test')

    return res.json({
        code: 200,
        msg: 'test',
        data: data
    })
}

module.exports = {
    checkToken
}