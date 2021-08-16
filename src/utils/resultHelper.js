/**
 * 成功返回 (Controller层使用)
 * @param {String} msg 提示
 * @param data 数据
 */
const successResult = (data, msg = 'success') => {
    return {
        status: true,
        code: 200,
        msg: msg,
        data: data
    }
}

/**
 * 失败返回 (Controller层使用)
 * @param {String} msg 错误提示信息
 * @param {Number} code 错误编号
 * @param data 错误返回数据
 * @returns {{msg: string, code: number, status: boolean}}
 */
const failResult = (msg = 'error', code = -200, data) => {
    return {
        status: false,
        code: code,
        msg: msg,
        data: data
    }
}

/**
 * 返回调用
 * @param result
 * @returns {{msg: String, code: number, data, status: boolean}|{msg: string, code: number, status: boolean}}
 */
const returnResult = (result) => {
    if (result['flag']) {
        return successResult(result['data'])
    } else {
        return failResult(result['msg'], result['code'], result['data'])
    }
}

/**
 * 成功返回 (Model层使用)
 * @param data
 * @returns {{data: string, flag: boolean}}
 */
const success = (data = 'success') => {
    return {
        flag: true,
        data: data
    }
}

/**
 * 失败返回 (Model层使用)
 * @param msg
 * @param code
 * @returns {{msg: string, code: number, flag: boolean}}
 */
const fail = (msg = 'fail', code = -200, data) => {
    if (!data) {
        data = {}
    }
    return {
        flag: false,
        msg: msg,
        code: code,
        data: data
    }
}

module.exports = {
    returnResult,
    successResult,
    failResult,
    success,
    fail
}
