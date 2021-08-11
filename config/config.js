/**
 * 密码KEY
 * @type {string}
 */
const PASSWORD_KEY = 'mypassword'

/**
* TOKEN_KEY
* @type {string}
*/
const TOKEN_KEY = 'mes_qdhd_mobile_xhykjyxgs'

/**
 * 高德地图KEY
 * @type {string}
 */
const AMAP_WEB_SERVER_KEY = 'c9a2f7e29f4fff1650306a1d51a39ae5'

/**
 * 百度地图KEY
 * @type {string}
 */
const BMAP_WEB_SERVER_KEY = 'kq3XbinqCdzM6vrGAqy5Sym7Oa02nlP0'

/**
 * 七牛云配置
 */
const QI_NIU = {
    ACCESS_KEY: 'gguiT7kaJFilxu0l2-jIjkQgaeOW4i9zUlPgOEzl',
    SECRET_KEY: '5fbmVl9H_VrSqNOlwfPDvb6w7pPsD-UMrhrp05E6',
    BUCKET: 'rongcltest', // 七牛云存储空间名称
    URL: 'filetest.rongcl.club', // 访问域名
    PUBLIC_BUCKET_DOMAIN: 'http://filetest.rongcl.club',
    THUMBNAIL: {
        AVATAR: 'imageView2/1/w/150/h/150/q/100',
        ARTICLECOVER: 'imageMogr2/auto-orient/thumbnail/600x400/blur/1x0/quality/75',
        HOMEPAGECOVER: 'imageView2/1/w/1040/h/520/q/75',
        ADMINCOVER: 'imageView2/1/w/400/h/280/q/100'
    }
}

/**
 * 时间(秒为单位)
 * @type {{MONTH: number, HOUR: number, SECOND: number, MINUTE: number, WEEK: number, DAY: number}}
 */
const TIME = {
    SECOND: 1,
    MINUTE: 60,
    HOUR: 60 * 60,
    DAY: 60 * 60 * 24,
    WEEK: 60 * 60 * 24 * 7,
    MONTH: 60 * 60 * 24 * 7 * 30
}

/**
 * 默认密码
 * @type {string}
 */
const DEFAULT_PASSWORD = 'myblog123456'

module.exports = {
    PASSWORD_KEY,
    TOKEN_KEY,
    TIME,
    QI_NIU,
    DEFAULT_PASSWORD,
    AMAP_WEB_SERVER_KEY,
    BMAP_WEB_SERVER_KEY
}
