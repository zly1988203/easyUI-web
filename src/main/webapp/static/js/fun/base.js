/**
 * Created by huangj02 on 2016/8/5.
 */
$.extend({
    StandardPost:function(url,args){

        var form = $("<form method='post'></form>"),
            input;
        form.attr({"action":url});
        $.each(args,function(key,value){
            input = $("<input type='hidden'>");
            input.attr({"name":key});
            input.val(value);
            form.append(input);
        });
        $(document.body).append(form);
        form.submit();
    }
});

$.extend($.fn.datagrid.defaults.editors, {
	numberspinner: {
		init: function(container, options){
			var input = $('<input type="text">').appendTo(container);
			return input.numberspinner(options);
		},
		destroy: function(target){
			$(target).numberspinner('destroy');
		},
		getValue: function(target){
			return $(target).numberspinner('getValue');
		},
		setValue: function(target, value){
			$(target).numberspinner('setValue',value);
		},
		resize: function(target, width){
			$(target).numberspinner('resize',width);
		}
	}
});

function getUrlQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
} 


//处理backspace返回
function banBackSpace(e){
   var ev = e || window.event;
   //各种浏览器下获取事件对象
   var obj = ev.relatedTarget || ev.srcElement || ev.target ||ev.currentTarget;
   //按下Backspace键
   if(ev.keyCode == 8){
     var tagName = obj.nodeName //标签名称
     //如果标签不是input或者textarea则阻止Backspace
     if(tagName!='INPUT' && tagName!='TEXTAREA'){
      return stopIt(ev);
    }
    var tagType = obj.type.toUpperCase();//标签类型
    //input标签除了下面几种类型，全部阻止Backspace
    if(tagName=='INPUT' && (tagType!='TEXT' && tagType!='TEXTAREA' && tagType!='PASSWORD')){
      return stopIt(ev);
    }
    //input或者textarea输入框如果不可编辑则阻止Backspace
    if((tagName=='INPUT' || tagName=='TEXTAREA') && (obj.readOnly==true || obj.disabled ==true)){
      return stopIt(ev);
    }
  }
}
function stopIt(ev){
  if(ev.preventDefault ){
    //preventDefault()方法阻止元素发生默认的行为
    ev.preventDefault();
  }
 if(ev.returnValue){
    //IE浏览器下用window.event.returnValue = false;实现阻止元素发生默认的行为
    ev.returnValue = false;
  }
  return false;
}

/**
 * 对ajax请求做了封装，统一项目的ajax请求。
 * @namespace jQuery扩展封装
 * @param {url} 请求的url地址
 * @param {params} JSON格式的参数,如{name:'abc','age':10}
 * @param {callback} 调用成功后回调函数,可不传
 * @return json数据
 */

    function ajaxSubmit(url, params, callback,$btn) {
        if ($btn){
            $btn.prop("disabled","disabled");
        }

        gFunStartLoading();
        jQuery.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: params,
            success: function(data) {
                gFunEndLoading();
                if ($btn){
                    $btn.removeProp("disabled");
                }
                if (typeof callback == 'function') {
                    callback(data);
                }
            },
            error: function() {
                gFunEndLoading();
                if ($btn){
                    $btn.removeProp("disabled");
                }
                messager("请求发送失败或服务器处理失败");
            },
            beforeSend: function(XHR) {
                var sts = new Date().getTime();
                url = url ? (url.indexOf('?')>-1 ? url + '&_t='+ sts : url + '?_t='+sts):url
            },
            complete: function() {
                // Handle the complete event
            }
        });
    }

