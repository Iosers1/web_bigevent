// 入口函数
$(function() {


    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    //  给上传按钮绑定事件
    $('#getFile').on('click', function() {
        // 给文件选择框点击事件
        $('#file').click()
    })


    //  给文件上传按钮做change事件
    $('#file').on('change', function(e) {

        let filelist = e.target.files
        if (filelist.length === 0) {
            return layui.layer.msg('请上传文件! ')
        }
        var file = e.target.files[0]
        var newImgURL = URL.createObjectURL(file)
            //  初始化裁剪区
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域



    })

    $('#scBtn').on('click', function() {

        // 上传的文件
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.ajax({
            type: "post",
            url: "/my/update/avatar",
            data: { avatar: dataURL },
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('文件上传失败')
                }
                layui.layer.msg('文件上传成功')
                    // 重新渲染头像
                window.parent.getUserInfo()
            }
        });
    })
})