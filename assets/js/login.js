// 入口函数
$(function() {
    // 点击a链接，登录注切换
    $('#go_reg').on('click', function() {
        $('.Login').hide()
        $('.Regist').show()
    })
    $('#go_login').on('click', function() {
        $('.Login').show()
        $('.Regist').hide()
    });


    // 自定义验证
    var form = layui.form
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('#form_reg [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })


    // 注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        // 1. 阻止默认的提交行为
        e.preventDefault()
            // 2. 发起Ajax的POST请求
        var data = {
            username: $('#form_reg [name=username]').val().trim(),
            password: $('#form_reg [name=password]').val().trim()
        }
        $.ajax({
            type: "post",
            url: "/api/reguser",
            data: data,
            success: function(res) {
                if (res.status === 0) {
                    layui.layer.msg(res.message + '快去登录吧');
                    $('#form_reg [name=username]').val('')
                    $('#form_reg [name=password]').val('')
                    $('#form_reg [name=repassword]').val('')
                } else {
                    layui.layer.msg(res.message);
                }
            }
        });
    })


    // 登录事件
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        let data = {
            username: $('#form_login [name=username]').val().trim(),
            password: $('#form_login [name=password]').val().trim()
        }
        $.ajax({
            type: "post",
            url: "/api/login",
            data: data,
            success: function(res) {
                if (res.status === 0) {
                    // 存放token
                    localStorage.setItem('token', res.token)
                        // alert( + '即将跳转到后台系统首页')
                    layui.layer.msg(res.message + '2秒后跳转到首页');

                    setInterval(function() {
                        $('#loginBtn').click()
                        location.href = './index.html'
                    }, 2000)
                } else {
                    layui.layer.msg(res.message + '请检查用户名和密码');
                }
            }
        });
    })
})