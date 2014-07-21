var WeixinNode = require('../../lib/index.js');
var should = require('should');

describe('微信接口测试用例', function () {

    it('checkSignature#签名验证', function () {

        // 初始化请求
        var req = {
            query: {
                'signature': '25c919119519e85e9493590a0e39bba8b7ef7d6a',
                'timestamp': '23400000023',
                'nonce': '1'
            }
        };

        // 初始化签名
        var weixin = new WeixinNode({
            token: '001'
        });

        weixin.checkSignature(req).should.be.true;

        req.query.nonce = '10';
        weixin.checkSignature(req).should.be.false;
    });
});