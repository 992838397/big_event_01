$(function () {
    //1.定义校验规则
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        //1.2 新旧密码不重复
        samePwd: function (value) {
            // value是新密码,旧密码需要获取
            if (value == $('[name=oldPwd]').val()) {
                return '原密码和旧密码不能相同'
            }
        },
        //1.3 两次密码必须相同
        rePwd: function (value) {
            // console.log($(this).val());
            if (value !== $('[name=newPwd]').val()) {
                return '两次新密码输入不一致'
            }
        }
    })

    // 2.修改密码
    // var layer = layui.layer;
    $('#btnPwd').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                //   成功
                layui.layer.msg("修改密码成功");
                $('#btnPwd')[0].reset();
            }
        })

    })

})