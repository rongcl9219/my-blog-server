/**
 * 时间格式化处理
 * @param fmt
 * @param date 时间
 * @returns {*}
 */
const dateFormat = (fmt, date) => {
    let dateObj = new Date(date)
    let o = {
        "M+": dateObj.getMonth() + 1,                 //月份
        "d+": dateObj.getDate(),                    //日
        "h+": dateObj.getHours(),                   //小时
        "m+": dateObj.getMinutes(),                 //分
        "s+": dateObj.getSeconds(),                 //秒
        "q+": Math.floor((dateObj.getMonth() + 3) / 3), //季度
        "S": dateObj.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (dateObj.getFullYear() + "").substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
        }
    }
    return fmt
}

/**
 * 生成随机数
 * @param num 随机数长度
 * @param isArray 是否返回数组
 * @param special 是否包含特殊字符
 * @returns {string|*[]}
 */
const initValidCode = (num = 4, isArray = false, special = false) => {
    let char = 'ABCDEFGHJKMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    let specialChar = ["!", "@", "#", "$", "?", "|", "{", "/", ":", ";",
        "%", "^", "&", "*", "(", ")", "-", "_", "[", "]",
        "}", "<", ">", "~", "+", "=", ",", "."].join('')

    let newChar = char + (special ? specialChar : '')

    if (!isArray) {
        let codeStr = ''
        for (let i = 0; i < num; i++) {
            codeStr += newChar.charAt(Math.floor(Math.random() * newChar.length))
        }
        return codeStr
    } else {
        let codeArr = []
        for (let i = 0; i < num; i++) {
            codeArr.push(newChar.charAt(Math.floor(Math.random() * newChar.length)))
        }
        return codeArr
    }
}

module.exports = {
    dateFormat,
    initValidCode
}