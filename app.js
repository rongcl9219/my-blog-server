var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var expressJwt = require('express-jwt');

const vertoken = require('./utils/token')
const { TOKEN_KEY } = require('./config/config')
const { TOKEN_INVALID } = require('./utils/statusCode')

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 解析token获取用户信息
app.use(function (req, res, next) {
  let token = req.headers['authorization'];
  if (!token) {
    return next();
  } else {
    vertoken.verToken(token).then((data) => {
      req.data = data;
      return next();
    }).catch(() => {
      return next();
    })
  }
});

//验证token是否过期并规定哪些路由不用验证
app.use(expressJwt({
  secret: TOKEN_KEY, // 密匙
  algorithms: ['HS256'] // 加密方式
}).unless((req) => {
  // 自定义验证规则
  let path = req.path
  // 验证以 /admin 的所有请求
  if (/^(\/admin)/.test(path)) {
    return false
  } else {
    return true
  }
}));

app.use('/', indexRouter);

//当token失效返回提示信息
app.use(function (err, req, res) {
  if (err.status == 401) {
    return res.json({
      code: TOKEN_INVALID,
      msg: '无效的token'
    });
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
