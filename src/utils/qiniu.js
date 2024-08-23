const qiniu = require('qiniu');
const {QI_NIU} = require('../../../config/config')
const uuid = require('uuid')
const {md5} = require('./encrypt')

//需要填写你的 Access Key 和 Secret Key
const accessKey = QI_NIU.ACCESS_KEY;
const secretKey = QI_NIU.SECRET_KEY;

// 公共资源访问域名
const publicBucketDomain = QI_NIU.PUBLIC_BUCKET_DOMAIN;

const bucket = QI_NIU.BUCKET;

let config = new qiniu.conf.Config();

// 空间对应的机房
config.zone = qiniu.zone.Zone_z2;
// 是否使用https域名
//config.useHttpsDomain = true;
// 上传是否使用cdn加速
//config.useCdnDomain = true;

// 创建各种上传凭证之前，我们需要定义好其中鉴权对象mac
let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

let formUploader = new qiniu.form_up.FormUploader(config);
let putExtra = new qiniu.form_up.PutExtra();

// 构建上传凭证
function upToken(bucket, key) {
    let options = {
        scope: bucket + ":" + key,
        returnBody: '{"status":true,"key":"$(key)","hash":"$(etag)","name":"$(fname)","mimeType":"$(mimeType)","fsize":$(fsize),"ext":"$(ext)","fprefix":"${fprefix}"}',
        callbackBodyType: 'application/json'
    };
    let putPolicy = new qiniu.rs.PutPolicy(options);

    return putPolicy.uploadToken(mac);
}

let bucketManager = new qiniu.rs.BucketManager(mac, config);

/**
 * 获取文件访问地址 公开空间访问链接
 * @param key 文件key
 * @param isImg 是否是图片
 * @param fName 文件名称
 * @param thumbnail 图片处理格式名称
 * @returns {string}
 */
function getFileUrl(key, isImg, fName, thumbnail) {
    if (!key) {
        return ''
    }
    let paramStr = ''
    if (isImg) {
        if (thumbnail.trim()) {
            let thumbnailUpper = thumbnail.toUpperCase()
            paramStr = QI_NIU.THUMBNAIL[thumbnailUpper] ? QI_NIU.THUMBNAIL[thumbnailUpper] : ''
        }
    †
        paramStr = 'attname=' + encodeURI(fName)
    }
    paramStr = paramStr ? '-' + paramStr : ''
    return bucketManager.publicDownloadUrl(publicBucketDomain, key) + paramStr
}

/**
 * 获取上传凭证
 * @param key (文件名)
 */
const createUploadToken = key => {
    return upToken(bucket, key);
}

/**
 * 上传文件
 * @param fileStream (可读文件流)
 * @param isImg 是否是图片
 * @param fName (文件名)
 * @param thumbnail
 * @returns {Promise<unknown>}
 */
const uploadFile = (fileStream, isImg = false, fName, thumbnail) => {
    return new Promise((resolve, reject) => {
        let key = md5(uuid.v1()).toString()
        let uploadToken = upToken(bucket, key)
        if (!isImg) {
            putExtra.fname = fName
        }
        formUploader.putStream(uploadToken, key, fileStream, putExtra, function (respErr, respBody, respInfo) {
            if (respErr) {
                reject(respErr)
            }

            if (respInfo.statusCode === 200) {
                let fileName = respBody.fprefix + respBody.ext
                respBody.url = getFileUrl(key, isImg, fileName, thumbnail)
                resolve(respBody)
            } else {
                resolve(false)
            }
        })
    })
}

/**
 * 获取需要删除的文件key字符串(用,隔开)
 * @param keys
 * @returns {Promise<unknown>}
 */
const deleteFiles = (keys) => {
    let deleteOperations = []
    let keyArr = keys.split(',')
    keyArr.map(key => {
        deleteOperations.push(qiniu.rs.deleteOp(bucket, key))
    })
    return new Promise((resolve, reject) => {
        bucketManager.batch(deleteOperations, function (err, respBody, respInfo) {
            if (err) {
                reject(err)
            } else {
                // 200 is success, 298 is part success
                if (respInfo.statusCode === 2) {
                    resolve(respBody)
                } else {
                    resolve(false)
                }
            }
        })
    })
}

module.exports = {
    uploadFile,
    getFileUrl,
    deleteFiles,
    createUploadToken
}
