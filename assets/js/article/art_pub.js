$(function () {
    // 1.初始化文章分类及调用
    //      导出
    var layer = layui.layer;
    var form = layui.form;
    initCate();//调用
    // 封装
    function initCate() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    layer.msg(res.message)
                }
                //   成功  渲染  调用模板引擎
                let strHtml = template('tpl-Cate', { data: res.data })
                $('[name="cate_id"]').html(strHtml);
                // 特殊标签需要加这个
                layui.form.render();

            }
        })
    }

    //2. 初始化富文本编辑器
    initEditor()
    // 3. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)




    // 4.文件上传
    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click();
    })
    // 5 设置图片
    $('#coverFile').change(function (e) {
        var file = e.target.files[0];
        if (file === undefined) {
            return
        }
        var newImgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域

    })

    // 6.参数状态值处理
    var state = '已发布';
    $('btnSave2').on('click', function () {
        state = '草稿';
    })
    //7. 发布文章
    $('#form-pub').on('submit', function (e) {
        e.preventDefault();
        // 创建 FormDate对象  收集数据
        let fd = new FormData(this);
        //  放入状态
        fd.append('state', state);
        // 放入图片
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                // ...打散
                // console.log(...fd);

                publishArticle(fd)
            });
    })

    // 封装
    function publishArticle(fd) {
        $.ajax({
            type: 'POST',
            url: '/my/article/add',
            data: fd,
            // formData类型数据ajax提交,需要设置两个false
            contentType: false,
            processData: false,
            success: (res) => {
                console.log(res);
                if (res.statts != 0) {
                    return layer.msg(res.message);
                }
                layer.msg('恭喜您,发布文章成功');
                // 跳转
                // location.href = '/article/art_list.html'
                // 用延时器的原因,因为点击后,发布成功后,直接跳转,需要用延时器停留一会
                setTimeout(() => {
                    console.log(11111111111111111);

                }, 300)
            }
        })

    }


})