var Wechat = require('../../lib/wechat.js');
var should = require('should');

describe('wechat.js# [ 微信接口测试用例 ]', function () {

    it('checkSignature# [ 签名验证 ]', function () {

        // 初始化请求
        var req = {
            query: {
                'signature': '25c919119519e85e9493590a0e39bba8b7ef7d6a',
                'timestamp': '23400000023',
                'nonce': '1'
            }
        };

        // 初始化签名
        var wechat = new Wechat({
            token: '001'
        });

        wechat.checkSignature(req).should.be.true;

        req.query.nonce = '10';
        wechat.checkSignature(req).should.be.false;
    });
});