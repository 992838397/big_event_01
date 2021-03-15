$(function () {
    // 1.开发环境服务器地址
    var baseURL = "http://api-breakingnews-web.itheima.net";

    // 拦截所有Ajax请求:get post $ajax
    //处理参数：
    $.ajaxPrefilter(function (options) {
        // 1.自动为每一个url添加前缀 进行字符串拼接
        // console.log('http://api-breakingnews-web.itheima.net' + options.url);
        options.url = baseURL + options.url


        //2. 身份证验证            授权从本地获取身份验证 获取 token
        if (options.url.indexOf('/my/') != -1) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            }



            // 3.登陆拦截
            options.complete = function (res) {
                // console.log(res.responseJSON);
                var obj = res.responseJSON;
                if (obj.status == 1 && obj.message == '身份认证失败！') {
                    // 1.清空本地token   token是身份验证参数,唯一性
                    localStorage.removeItem('token');
                    // 2.页面跳转
                    location.href = '/login.html';
                }

            }

        }
    })

})