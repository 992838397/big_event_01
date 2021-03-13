$(function () {
    // 1.开发环境服务器地址
    var baseURL = "http://api-breakingnews-web.itheima.net";

    // 拦截所有Ajax请求:get post $ajax
    //处理参数：
    $.ajaxPrefilter(function (options) {
        // 进行字符串拼接
        // console.log('http://api-breakingnews-web.itheima.net' + options.url);
        options.url = baseURL + options.url
    })

})