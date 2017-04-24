/**
 * Created by wxl on 2016/11/21.
 * pos登记-列表
 */
$(function(){
    initDatagridPosOrders();
});
var gridHandel = new GridClass();
//初始化表格
function initDatagridPosOrders(){
    $("#registerList").datagrid({
        //title:'普通表单-用键盘操作',
        method:'post',
        align:'center',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
        showFooter:true,
		height:'100%',
		width:'100%',
		singleSelect: true,
        columns:[[
			{field: 'branchCode', title: '店铺编号', width: '100px', align: 'left'},
			{field: 'branchName', title: '店铺名称', width: '180px', align: 'left'},
			{field: 'posNo', title: 'POS机号', width: '80px', align: 'left'},
			{field: 'status', title: '绑定状态', width: '80px', align: 'left',
				  formatter: function(value,row,index){
                      if (value==1){
                          return "已绑定";
                      }
                      else {
                          return "未绑定";
                      }
                  }
			},
			{field: 'bindAddress', title: '绑定地址', width: '180px', align: 'left'},
			{field: 'currentUserName', title: '当前登录用户', width: '150px', align: 'left'},
        ]],
        onLoadSuccess : function() {
            gridHandel.setDatagridHeader("center");
        }
        
    });
    queryForm();
}

//新增dalog

function regadd(){
var  dalogTemp = $('<div id="#regadd"/>').dialog({
	    href:contextPath + "/pos/register/add",
	    width:360,
	    height:250,
	    title:"新增",
	    closable:true,
	    resizable:true,
	    onClose:function(){
	        $(dalogTemp).panel('destroy');
	    },
	    modal:true,
	    onLoad:function(){
	    	setDolgObj(dalogTemp);
	    },
	});

}


//查询pos
function queryForm(){
	var fromObjStr = $('#queryForm').serializeObject();
	$("#registerList").datagrid("options").method = "post";
	$("#registerList").datagrid('options').url = contextPath + '/pos/register/queryList';
	$("#registerList").datagrid('load', fromObjStr);
}

/**
 * 店铺名称
 */
function selectBranches(){
	new publicAgencyService(function(data){
		$("#regBranchId").val(data.branchesId);
		$("#branchInfo").val(data.branchName);
	},'DP','');
}


//解除绑定
function bindPosForm(){
	var dg = $("#registerList");
	var row = dg.datagrid("getSelected");
	if(rowIsNull(row)){
		return null;
	}
	
	if(row.status==0){
		$.messager.alert("提示","当前记录未绑定，请选择已绑定的记录后重试");
		return null;
	}
	$.messager.confirm('提示','是否要解除此条数据绑定',function(data){
	
		if(data){
			$.ajax({
		    	url:contextPath+"/pos/register/relieveBind",
		    	type:"POST",
		    	data:{
		    		id: row.id 
		    	},
		    	success:function(result){
		    		console.log(result);
		    		if(result['code'] == 0){
		    			$.messager.alert("操作提示", "解绑成功！");
		    			dg.datagrid('reload');
		    		}else{
		    			$.messager.alert(result['message']);
		    		}
		    	},
		    	error:function(result){
		    		$.messager.alert(("请求发送失败或服务器处理失败"));
		    	}
		    });
		}
	});
}

//删除
function delPosForm(){
	var dg = $("#registerList");
	var row = dg.datagrid("getSelected");
	console.log(row)
	if(rowIsNull(row)){
		return null;
	}
	$.messager.confirm('提示','是否要删除此条数据',function(data){
		if(data){
			$.ajax({
		    	url:contextPath+"/pos/register/delPosRegister",
		    	type:"POST",
		    	data:{
		    		id: row.id
		    	},
		    	success:function(result){
		    		console.log(result);
		    		if(result['code'] == 0){
		    			$.messager.alert("操作提示", "删除成功！");
		    			dg.datagrid('reload');
		    		}else{
		    			$.messager.alert(result['message']);
		    		}
		    	},
		    	error:function(result){
		    		$.messager.alert(("请求发送失败或服务器处理失败"));
		    	}
		    });
		}
	});
}


