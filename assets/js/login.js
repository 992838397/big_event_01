// 入口函数
$(function () {
    // 需求1: 点击去注册时，显示注册模块,隐藏自己
    $('#link_reg').on('click', function () {
        // 登陆表单隐藏
        $('.login-box').hide();
        // 注册表单显示
        $('.reg-box').show();
    })
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    // 需求2：自定义校验规则
    // 从layui中获取到form表单
    var form = layui.form;
    form.verify({
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        // 在校验verify加了个repwd属性
        repwd: function (value) {
            // 获取到输入密码的值 用属性选择器
            let pwd = $('.reg-box  input[name=password]').val()
            // 比较这两个值是否等
            if (value != pwd) {
                return '两次密码输入不一致';
            }
        }
    })


    //需求3：注册功能
    // 从layui.layer之后引入一个属性或者方法
    var layer = layui.layer;
    $('#form_reg').on('submit', function (e) {
        // 阻止表单提交
        e.preventDefault();
        $.ajax({
            type: 'PoST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box  input[name=username]').val(),
                password: $('.reg-box  input[name=password]').val()
            },
            success: (res) => {
                console.log(res);
                // 如果不等于0,说明注册失败
                if (res.status != 0) {
                    $('#form_reg input').val("")
                    // return alert(res.message);
                    return layer.msg(res.message, { icon: 5 });


                }
                // 注册成功后执行   
                // alert("恭喜您,用户名注册成功")
                layer.msg('恭喜您,用户名注册成功', { icon: 6 });
                // 手动切换到登陆表单
                $('#link_login').click();
                // 重置
                $('#form_reg')[0].reset();
                // $('#form_reg input').val("")

            }
        })

    })


    // 需求4:登陆功能
    var layer = layui.layer;
    $('#form_login').on('submit', function (e) {
        // 阻止默认跳转
        e.preventDefault()
        // ajax
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                // 提示信息  保存token,跳转页面
                layer.msg("恭喜你,登陆成功");
                // 保存token在本地, 未来的接口要使用到token;
                localStorage.setItem('token', res.token);
                // 跳转页面
                // location.href = '/index.html';
            }
        })

    })



})