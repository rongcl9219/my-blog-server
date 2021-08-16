/**
 * 字符串处理
 */

/**
 * 驼峰转下划线
 * @param string
 * @returns {string}
 */
const humpToSnake = (string = '') => {
    string = string.trim()
    return string.replace(/([A-Z])/g, '_$1').toLowerCase()
}

/**
 * 下划线转驼峰
 * @param string
 * @returns {string}
 */
const snakeToHump = (string = '') => {
    string = string.trim()
    let newString = ''
    if (string) {
        let stringArr = string.split('_')
        newString = stringArr[0]
        for (let i = 1; i < stringArr.length; i++) {
            newString = newString + stringArr[i].slice(0, 1).toUpperCase() + stringArr[i].slice(1)
        }
    }
    return newString
}

/**
 *
 * @param field
 */
const queryFieldFormat = (field) => {
    return `${field} as ${snakeToHump(field)}`
}

/**
 *
 * @param field
 * @returns {`${string} = ?`}
 */
const updateFieldFormat = field => {
    return `${field} = ?`
}

module.exports = {
    humpToSnake,
    snakeToHump,
    queryFieldFormat,
    updateFieldFormat
}
