'use strict';

/**
 * Module dependencies.
 */

var util = require('util');
var events = require('events');
var sha1 = require('sha1');
var iconv = require('iconv');

/**
 * 微信公众平台处理
 * @param options
 * @constructor
 */
var WeixinNode = function (options) {

    options = options || {};
    this.token = options.token || '';
    this.appid = options.appid || '';
    this.secret = options.secret || '';

    events.EventEmitter.call(this);
};

util.inherits(WeixinNode, events.EventEmitter)


/**
 * 验证消息真实性
 * @param param 请求数据 {signature:'',timestamp:'',nonce:'',echostr:''}
 * @return boolean
 */
WeixinNode.prototype.checkSignature = function (req) {

    /**
     * 加密/校验流程如下：
     1. 将token、timestamp、nonce三个参数进行字典序排序
     2. 将三个参数字符串拼接成一个字符串进行sha1加密
     3. 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
     */
    req.query = req.query || {};

    var signature = req.query.signature || '';
    var timestamp = req.query.timestamp || '';
    var once = req.query.nonce || '';

    // step1
    // ===================================================
    var arr = [this.token, timestamp, once];
    arr.sort();

    // step2
    // ===================================================
    var str = sha1(arr.join(''));

    //step3
    // ===================================================
    return str === signature;
};

/**
 *  监听消息
 * @param req request
 * @param res response
 */
WeixinNode.prototype.loop = function (req, res) {

    var chunks = [];
    var size = 0;

    req.on('data', function (chunk) {
        chunks.push(chunk);
        size += chunk.length;
    });

    req.on('end', function () {
        var buffer = Buffer.concat(chunks, size);
        this._processMsg(buffer);
    });
};

/**
 * 处理消息
 * @param msg 消息流
 * @private
 */
WeixinNode.prototype._processMsg = function (msg) {
     //TODO:
};

/**
 * Export WeixinNode
 */
module.exports = WeixinNode;
