const testRouter = require('./test')

const homeRouter = require('./home/index')

const adminRouter = require('./admin/index')

module.exports = {
  homeRouter,
  adminRouter,
  testRouter
}
