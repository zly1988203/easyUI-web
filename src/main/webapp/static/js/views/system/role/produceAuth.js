
function render(node,data){
    node.innerHTML = template('tempDom', {
        data:tableTreeData
    });
}
	
$(document).on('change','.parentNode,.treeItem',function(){
    var flag = $(this).prop('checked');
    if($(this).attr('class') == 'treeItem' ){
        var opeInputLength = $(this).closest('.levelContent').find('label').length;
        var opeInputCheckedLength = $(this).closest('.levelContent').find('input[type="checkbox"]:checked').length;
        if(opeInputLength == opeInputCheckedLength){
            $($(this).closest('li').find('input.threeNode')[0]).prop('checked',true);
        }
    }else{
        var checkebox = $(this).closest('.level').next('.levelContent').find('input[type="checkbox"]');
        $.each(checkebox, function (index,obj) {
            $(obj).prop('checked',flag);
        })
    }
});


//保存
function saveRoleAuth(){
    var menusIds = [];
    var treeMenus = $(".three.levelContent");
    $.each(treeMenus, function (index,obj){
        var menuLiContent = $(obj).children('li');
        if(menuLiContent.length > 0 ){
            $.each(menuLiContent,function(inj,menDom){
                var checkInputs =  $(menDom).find('.levelContent input[type="checkbox"]:checked');
                var menuDom = $(menDom).find('.threeNode')[0];
                var menuDomCheck = $(menuDom).prop('checked');
                //菜单对象
                var menuObj = {};
                menuObj.menuId = $(menuDom).attr('id') ||'';
                menuObj.operPermissions = [];
                //子节点有勾选
                if(checkInputs.length > 0){
                    $.each(checkInputs, function (iny,elt) {
                        menuObj.operPermissions.push($(elt).attr('id'));
                    });
                    menusIds.push(menuObj);
                }else if(menuDomCheck){
                    menusIds.push(menuObj);
                }
            });
        }

    });
    
    var roleId = $("#roleId").val();
    var data = JSON.stringify(menusIds);
    console.log("data:"+data);
    
    $.ajax({
        url:contextPath+"/system/role/produceRoleAuth",
        type:"POST",
        data:{
        	"roleId":roleId,
        	"data":data
        },
        dataType:"json",  
        success:function(result){
            if(result){
                successTip("保存成功！");
                toClose();
            }
        },
        error:function(result){
            successTip("请求发送失败或服务器处理失败");
        }
    });
}