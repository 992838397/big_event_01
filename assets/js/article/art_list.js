$(function () {
    // 为art-templete 定义时间过滤器
    template.defaults.imports.dateFormat = function (dtStr) {
        // 实例化时间对象
        var dt = new Date(dtStr);
        var y = padZero(dt.getFullYear());
        var m = padZero(dt.getMonth() + 1);
        var d = padZero(dt.getDate());
        var hh = padZero(dt.getHours());
        var mm = padZero(dt.getMinutes());
        var ss = padZero(dt.getSeconds());
        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    }
    // 在个位数的左侧补0
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    //1. 定义参数来接收数据
    let q = {
        pagenum: 1,   //	是	int	页码值
        pagesize: 2,   //	是	int	每页显示多少条数据
        cate_id: "",   //    否	string	文章分类的 Id
        state: "",   //    否	string	文章的状态，可选值有：已发布、草稿
    }
    let layer = layui.layer;
    // 2.初始化表格及调用
    initTable();
    // 2.1.定义函数
    function initTable() {
        $.ajax({
            type: 'GET',
            url: '/my/article/list',
            data: q,
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                // 成功
                // 调用模板引擎
                let htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr);
                // 调用分页
                renderPage(res.total);
            }
        })
    }
    // 3 初始化文章分类及调用
    // 导出
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

    // 4. 筛选功能
    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        // 获取
        var state = $('[name=state]').val()
        var cate_id = $('[name=cate_id]').val()
        console.log(state, cate_id);
        q.state = state;
        q.cate_id = cate_id;
        // 初始化文章列表
        initTable();

    })

    // 5.分页
    var laypage = layui.laypage;
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到 
            limit: q.pagesize,//每页几条?
            curr: q.pagenum,  //第几页
            // 分页模块设计
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数


                //首次不执行
                if (!first) {
                    // 把当前页面赋值给要显示的页面
                    q.pagenum = obj.curr;
                    // 每页显示的条数赋值给上面渲染
                    q.pagesize = obj.limit;
                    initTable();
                }
            }


        });
    }


    // 6.删除
    $('tbody').on('click', '.btn-delete', function () {
        var Id = $(this).attr('data-id');
        //eg1
        layer.confirm('是否确认删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                url: '/my/article/delete/' + Id,
                success: (res) => {
                    console.log(res);
                    if (res.status != 0) {
                        return layer.msg(res.message)
                    }
                    //   成功
                    layer.msg('恭喜您,删除文章成功')
                    //页面汇总删除按钮个数等于1,页面大于1
                    // 判断最后一个,按钮长度=1且页码大于1
                    if ($('.btn-delete').length == 1 && q.pagenum > 1) {
                        q.pagenum--;
                    }
                    initTable();
                }
            })
            layer.close(index);
        });

    })

})