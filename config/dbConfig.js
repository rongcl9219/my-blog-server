/**
 * 数据库配置
 * @type {{password: string, database: string, port: number, host: string, connectTimeout: number, multipleStatements: boolean, user: string}}
 */
 const DATABASE = {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'Rcl_963941583!',
    database: 'myblog',
    connectTimeout: 5000,
    multipleStatements: true // 多语句查询
}

module.exports = DATABASE
