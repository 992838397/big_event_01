$(function () {
    //1. 获取用户信息
    getUserInof();


    // 2.  退出功能
    var layer = layui.layer;
    $("#btnLogout").on('click', function () {
        //eg1
        layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function (index) {
            //do something
            //1.清空本地的token  跳转页面
            localStorage.removeItem('token');
            //2.页面跳转
            location.href = '/login.html'
            // 3.关闭弹窗
            layer.close(index);
        });
    })
});

// 获取用户信息
// 封装一个,多次调用
function getUserInof() {
    // 发送Ajax
    $.ajax({
        //   type: '',
        url: '/my/userinfo',
        // 身份验证
        // headers: {
        // 授权从本地获取token  
        //之前存储到本地去了
        // Authorization: localStorage.getItem('token') || ''
        // },
        success: (res) => {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.massage);
            }
            // 请求成功
            randerAvatar(res.data);

        },
        // 登陆拦截,不管成功还是失败都会触发这个
        // complete: function (res) {
        //     console.log(res.responseJSON);
        //     var obj = res.responseJSON;
        //     if (obj.status == 1 && obj.message == '身份认证失败！') {
        //         // 1.清空本地token   token是身份验证参数,唯一性
        //         localStorage.removeItem('token');
        //         // 2.页面跳转
        //         location.href = '/login.html';
        //     }
        // },
    })
}


// 封装
// 渲染头像图片的函数
function randerAvatar(user) {
    // 1.渲染名称 (nickname优先,如果没有,就用username)
    console.log(user);
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    if (user.user_pic !== null) {
        // 有头像
        $('.layui-nav-img').show().arrt('src', user.user_pic);
        $('.text-avatar').hide()


    } else {
        // 没有头像
        $('.layui-nav-img').hide();
        var text = name[0].toUpperCase();
        $('.text-avatar').show().html(text);

    }



}