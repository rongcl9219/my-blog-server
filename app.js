const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require("body-parser");
const expressJwt = require('express-jwt');
const {verifyToken,checkRefreshToken} = require('./src/utils/token')
const {TOKEN_KEY} = require('./config/config')
const {TOKEN_INVALID} = require('./src/utils/statusCode')

const {adminRouter, homeRouter, testRouter} = require('./src/routes/index');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 设置跨域
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");  // 允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Headers", "content-type");    // 允许跨域的header类型
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS"); // 允许跨域的请求方式
    if (req.method.toLowerCase() == 'options') { //让options尝试请求快速结束
        res.send(200);
    } else {
        next();
    }
})

// 解析token获取用户信息
app.use(function (req, res, next) {
    let path = req.path
    // 验证以 /admin 开头的所有请求
    if (/^(\/admin)/.test(path)) {
        let token = req.headers['authorization']
        if (!token) {
            return next()
        } else {
            verifyToken(token).then((data) => {
                req.data = data
                return next()
            }).catch(() => {
                return res.json({
                    code: TOKEN_INVALID,
                    msg: '无效的token'
                })
            })
        }
    } else if (path === '/refreshToken') {
        const token = req.headers['authorization']
        checkRefreshToken(token).then((data) => {
            req.data = data
            return next()
        }).catch(() => {
            return res.json({
                code: TOKEN_INVALID,
                msg: '无效的token'
            })
        })
    } else {
        next()
    }
})

app.use('/', homeRouter);
app.use('/test', testRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    //当token失效返回提示信息
    if (err.status === 401) {
        return res.json({
            code: TOKEN_INVALID,
            msg: '无效的token'
        })
    } else {
        // set locals, only providing error in development
        // res.locals.message = err.message;
        // res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        // res.status(err.status || 500);
        // res.render('error');

        return res.json({
            code: err.status || 500,
            msg: err.message
        })
    }
});

module.exports = app;
