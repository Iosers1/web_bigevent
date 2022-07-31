// 入口函数
$(function() {

    $(function() {


        form.verify({
            nickname: function(value) {
                if (value.length > 16) {
                    return '昵称长度必须在 1 ~ 16 个字符之间！'
                }
            }
        })
    })

    // 获取用户登录信息
    initUserInfo()
        // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败！')
                }
                // layui.layer.msg(res.message)
                form.val('formUserInfo', res.data)
            }
        })
    }


    // 提交事件
    $('.layui-form').on('submit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新用户信息失败！')
                }
                layui.layer.msg('更新用户信息成功！')
                    // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })
    })


    // 重置表单的数据
    $('#btnReset').on('click', function(e) {
        // 阻止表单的默认重置行为
        e.preventDefault()
        initUserInfo()
    })
})