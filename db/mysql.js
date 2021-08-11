const mysql = require('mysql')
const DATABASE = require('../config/dbConfig')

const pool = mysql.createPool(DATABASE)

/**
 * 事务
 * @param sqlArr (需要执行的sql语句数组)
 * @returns {Promise<unknown>}
 */
 const execTransection = (sqlArr) => {
    return new Promise((resolve, reject) => {
        var promiseArr = [];
        pool.getConnection((err, connection) => {
            if (err) {
                return reject(err)
            }
            connection.beginTransaction(err => {
                if (err) {
                    return reject('开启事务失败')
                }
                console.log('开始执行事务，共' + sqlArr.length + '条！')
                // 将所有需要执行的sql封装为数组
                promiseArr = sqlArr.map(({sql, values}) => {
                    return new Promise((resolve, reject) => {
                        connection.query(sql, values, (e, rows) => {
                            if (e) {
                                reject(e)
                            } else {
                                resolve({rows, success: true})
                            }
                        })
                    })
                })
                // Promise调用所有sql，一旦出错，进行回滚
                Promise.all(promiseArr).then(res => {
                    connection.commit((error) => {
                        if (error) {
                            connection.rollback(() => {
                                console.log('事务执行失败，数据操作回滚！')
                            })
                            reject(error)
                        }
                    })
                    connection.release()  // 释放链接
                    console.log('事务执行成功！')
                    resolve(res)
                }).catch(err => {
                    connection.rollback(() => {
                        console.log('事务执行失败，数据操作回滚！')
                    })
                    reject(err)
                })
            })
        })
    })
}

const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
            } else {
                if (!values) {
                    connection.query(sql, (err, rows) => {
                        connection.release()
                        if (err) {
                            reject(err)
                        } else {
                            resolve(rows)
                        }
                    })
                } else {
                    connection.query(sql, values, (err, rows) => {
                        connection.release()
                        if (err) {
                            reject(err)
                        } else {
                            resolve(rows)
                        }
                    })
                }
            }
        })
    })
}

const queryOne = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
            } else {
                if (!values) {
                    connection.query(sql, (err, rows) => {
                        connection.release()
                        if (err) {
                            reject(err)
                        } else {
                            resolve(rows[0])
                        }
                    })
                } else {
                    connection.query(sql, values, (err, rows) => {
                        connection.release()
                        if (err) {
                            reject(err)
                        } else {
                            resolve(rows[0])
                        }
                    })
                }
            }
        })
    })
}

const queryCount = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
            } else {
                if (!values) {
                    connection.query(sql, (err, rows) => {
                        connection.release()
                        if (err) {
                            reject(err)
                        } else {
                            resolve(rows.length)
                        }
                    })
                } else {
                    connection.query(sql, values, (err, rows) => {
                        connection.release()
                        if (err) {
                            reject(err)
                        } else {
                            resolve(rows.length)
                        }
                    })
                }
            }
        })
    })
}

module.exports = {
    query,
    queryOne,
    queryCount,
    execTransection
}
