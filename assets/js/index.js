// 退出登录
$('#out').on('click', function() {

    layui.layer.confirm('确定要退出登录吗?', { icon: 3, title: '退出登录？' }, function(index) {
        // 清除token
        localStorage.removeItem('token')
            // 跳转到登录页面
        location.href = './login.html'

        layui.layer.close(index);
    });

})


// 获取用户信息
getUserInfo()

function getUserInfo() {
    $.ajax({
        type: "get",
        url: "/my/userinfo",
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data)
        }
    });
    // // 修改头像
    function renderAvatar(userinfo) {
        // 渲染用户名
        let uname = userinfo.nickname || userinfo.username
            // let user_img = userinfo.user_pic
            // console.log(user_img);
        $('#welcome').html('欢迎&nbsp;&nbsp;' + uname)
            // 渲染头像
        if (userinfo.user_pic === null) {
            // 头像为空，默认头像
            return
        } else {
            $('.layui-nav-img').attr('src', userinfo.user_pic)
        }
    }
}