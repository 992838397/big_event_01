$(function () {
    // 1.校验昵称长度
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length < 1 || value.length > 6) {
                return '昵称长度为1~6位之间'
            }
        }
    })

    //2. 用户渲染
    var layer = layui.layer;
    // 渲染一次
    initUserInfo();
    // 展示用户数据,（以后还会有,封装一个函数,多次复用）
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            //   data: {},
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                // 成功  后渲染
                // formUserInfo  全部取值或赋值,如果表单有对应的则赋值或取值
                form.val('formUserInfo', res.data)
            }
        })
    }
    // 3.重置按钮 重置表单！！！
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        // 用上面的用户渲染方法实现
        initUserInfo();
    })
    //4.修改用户信息
    $('.layui-form').on('submit', function (e) {
        // 阻止浏览器默认行为 ,fomr表单的自动提交
        e.preventDefault();
        //发送ajax请求,修改用户名
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layer.mag(res.message)
                }
                // 成功
                layer.msg(res.message);
                // 不能直接调用方法,因为页面没有引用index.js,子页面,子window,window.parent可以找到父window然后下挂载的方法
                // 找到window的父window上挂载的方法
                window.parent.getUserInof();


            }
        })
    })
})