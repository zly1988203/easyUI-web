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
        form.submit();
    }
});