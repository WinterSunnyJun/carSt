/**
 * Created by DELL on 2017/11/3.
 */
var api_url = "http://cheshengshiapi.demo47.qcw100.com/rest/2.0/";
var page_num = 20;
var img_api='http://cheshengshiadmin.demo47.qcw100.com/Public/jpg/';

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return decodeURI(r[2]);
}

function notNull(data){
    return (data == "" || data == undefined || data == null) ? "" : data;
}
// 手机号检测
function mysjh_jc(id_name) {
    var sjhid = /^1[34578]\d{9}$/;
    var sjhclje = sjhid.test(id_name);
    if (!sjhclje) {
        return 0;
    } else {
        return 1;
    }
}

//获取cookie

function getcookie(objname){//获取指定名称的cookie的值
    var arrstr = document.cookie.split("; ");
    for(var i = 0;i < arrstr.length;i ++){
        var temp = arrstr[i].split("=");
        if(temp[0] == objname) return unescape(temp[1]);
    }
}



$.extend({
    showDialog: function(obj) {
        var type = obj.type || "alert";
        var title = obj.title;
        var content = "<div class='weui-mask'></div><div id='pop-div' style='overflow: hidden; z-index: 9999; padding:0px 0px; background: rgba(255,255,255,0.9); color:#1e77d3; border-radius: 5px; position: fixed; top: 40%; width: 240px; margin-left: -120px; text-align: center;left: 50%;'>";
        content += "<div style='position:relative; width:100%;height:100%;text-align: center;font-size: 16px'>";
        content += "<div style='padding:25px 0px; border-bottom: 1px solid #ccc;line-height:1.5; box-sizing: border-box'>" + title + "</div>";
        var button = "<div style='width: 100%; height: 40px;'>";
        switch (type) {
            case "confirm":
                var okButtonText = obj.okButtonText || "确定";
                var cancleButtonText = obj.cancleButtonText || "取消";
                var button = "<span style='display:inline-block; width: 50%;height:40px;border-right: 1px solid #666; box-sizing: border-box;text-align: center;line-height: 40px;font-size: 16px' id='cancle'>" + cancleButtonText + "</span><span style='display:inline-block; width: 50%;height: 40px;text-align: center;    background: rgba(0,0,0,.2);line-height:40px; color: #fff;font-size: 16px' id='confirm'>" + okButtonText + "</span>";
                break;
            case "alert":
            default:
                var buttonText = obj.buttonText || "确定";
                var button = "<span style='display:inline-block; width: 100%;line-height: 50px;color:#1e77d3;font-size: 16px' id='alert'>" + buttonText + "</span>";
                break;
        }
        button += "</div>";
        content += button;
        content += "</div>";
        content += "</div>";
        $("body").append(content);
        if (type == 'confirm') {
            var okCallback = obj.okCallback || undefined;
            var cancleCallback = obj.cancleCallback || undefined;

            $("#confirm").on("click",
                function() {
                    $(".weui-mask").remove();
                    $("#pop-div").remove();
                    if (typeof okCallback == "function") {
                        okCallback();
                    }
                });
            $("#cancle").on("click",
                function() {
                    $(".weui-mask").remove();
                    $("#pop-div").remove();
                    if (typeof cancleCallback == "function") {
                        cancleCallback();
                    }
                });
        } else if (type == 'alert') {
            var okCallback = obj.okCallback || undefined;

            $("#alert").click(function() {
                $(".weui-mask").remove();
                $("#pop-div").remove();
                if (typeof okCallback == 'function') {
                    okCallback();
                }
            });
        }

    }
});

// // 限制浏览器，只在微信端打开
// var useragent = navigator.userAgent;
// if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
//     // 这里警告框会阻塞当前页面继续加载
//     alert('已禁止本次访问：您必须使用微信内置浏览器访问本页面！');
//     // 以下代码是用javascript强行关闭当前页面
//     var opened = window.open('about:blank', '_self');
//     opened.opener = null;
//     opened.close();
// }
