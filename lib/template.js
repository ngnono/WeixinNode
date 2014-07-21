/**
 * 模板处理
 */
var fs = require('fs');
var ejs = require('ejs');

function Template() {
    this.init();
}

/**
 * 初始化模板文件
 */
Template.prototype.init = function () {

    var templates = {};
    ['image', 'music', 'news', 'text', 'video', 'voice'].forEach(function (name) {
        var path = __dirname + '/templates/' + name + '.ejs';
        templates[name] = fs.readFileSync(path, 'utf-8');
    });

    this.templates = templates;
};

/**
 * 根据名称获取模板
 * @param {string} template name
 * @returns {string}
 */
Template.prototype.get = function (name) {
    return this.templates[name] || '';
};

Template.prototype.merge = function (name, data) {
    var str = this.get(name);

    if (str === '') {
        throw new Error('template is empty:[ ' + name + ' ]');
    }
    return ejs.render(str, data);
};

module.exports=Template;
