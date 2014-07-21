/**
 * template test spec
 */
var should = require('should');
var fs = require('fs');
var Template = require('../../lib/template.js');

describe('template.js#模板测试用例', function () {

    var template = new Template();

    it('init()#初始化模板验证', function () {
        template.templates.should.be.have.keys(['image', 'music', 'news', 'text', 'video', 'voice']);
    });

    it('get(name)#校验模板一致性', function () {
        ['image', 'music', 'news', 'text', 'video', 'voice'].forEach(function (name) {
            var path = __dirname + '/../../lib/templates/' + name + '.ejs';
            var str = fs.readFileSync(path, 'utf-8');

            template.get(name).should.be.equal(str);
        });
    });

    it('merge(name,tempate)#校验合并数据', function () {

        (function () {
            template.merge('text', {});
        }).should.be.throw();

        (function () {
            template.merge('text', {
                ToUserName: 'toUser',
                FromUserName: 'fromUser',
                CreateTime: '13400123',
                Content: 'content'
            });
        }).should.be.not.throw();

        template.merge('text', {
            ToUserName: 'toUserName',
            FromUserName: 'fromUserName',
            CreateTime: '10000',
            Content: 'content'
        }).should.containEql('10000');
    });
});
