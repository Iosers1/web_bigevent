let form = layui.form;
let layer = layui.form;

$.ajaxPrefilter(function(options) {
    options.url = 'http://big-event-api-t.itheima.net' + options.url
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            // 设置token
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // console.log(options.url);


    // 定义拦截器
    options.complete = function(res) {
        // console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message == '身份认证失败！') {
            // 清空token
            localStorage.removeItem('token')
                // 跳转界面
            location.href = './login.html'
        }
    }
})