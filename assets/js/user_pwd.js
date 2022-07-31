// 入口函数
$(function() {
    // 修改新密码 注册事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
            // 获取数据
        let oldPwd = $('#oldPwd').val().trim()
        let newPwd = $('#newPwd').val().trim()
            // 提交数据
        $.ajax({
            type: "post",
            url: "/my/updatepwd",
            data: {
                oldPwd,
                newPwd
            },
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message + '请重新登录')
                    // 修改成功 则跳转到登录页面  并且清空token
                setInterval(function() {
                    localStorage.removeItem('token')
                    window.parent.location.href = '../login.html'
                }, 2000)
            }
        });
    })
})