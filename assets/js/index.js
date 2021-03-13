$(function () {
    // 获取用户信息
    getUserInof();
});

// 获取用户信息
// 封装一个,多次调用
function getUserInof() {
    // 发送Ajax
    $.ajax({
        //   type: '',
        url: '/my/userinfo',
        //   data: {},
        headers: {
            // 授权从本地获取token  
            //之前存储到本地去了
            Authorization: localStorage.getItem('token') || ''
        },
        success: (res) => {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.massage);
            }
            // 请求成功
            randerAvatar(res.data);

        }
    })
}


// 封装一个渲染头像图片的函数
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