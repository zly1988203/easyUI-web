/**
 * Created by huangj02 on 2016/8/9.
 */
$(function(){
    initDatagrid();
});
//初始化表格
function initDatagrid(){
    $("#dg").datagrid({
        //title:'普通表单-用键盘操作',
        method:'post',
        align:'center',
        url:contextPath+'/system/user/json',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
        showFooter:true,
        columns:[[
            {field:'check',checkbox:true},
            {field:'userCode',title:'帐号名',sortable:true,width:100},    
            {field:'userName',title:'真实姓名',sortable:true,width:100},
            {field:'mobile',title:'电话',sortable:true,width:100},
            {field:'branchCode',title:'机构编号',sortable:true,width:100},
            {field:'branchTypeStr',title:'机构类型',sortable:true,width:100},
            {field:'branchName',title:'机构名称',sortable:true,width:100},
            {field:'priceGrant',title:'价格权限',sortable:true,width:100},
            {field:'createTime',title:'创建时间',sortable:true,width:100,
            	formatter : function(value, rowData, rowIndex) {
            		if(value){
            			return new Date(value).format('yyyy-MM-dd hh:mm:ss');
            		}
            		return value;
            	}
            }
        ]]
    });
}

function query(){
	$("#dg").datagrid("options").queryParams = $("#queryForm").serializeObject();
	$("#dg").datagrid("options").method = "post";
	$("#dg").datagrid("load");
}

function exportData(){
	var isValid = $("#queryForm").form('validate');
	if(!isValid){
		return;
	}
	
	var length = $("#dg").datagrid('getData').total;
	if(length == 0){
		showTip("无数据可导");
		return;
	}
	if(length>10000){
		showTip("当次导出数据不可超过1万条，现已超过，请重新调整导出范围！");
		return;
	}
	
	$("#queryForm").attr("action",contextPath + "/system/user/exportList");
	$("#queryForm").submit();	
}

$(function(){
	//选择文件
	$("#xlfile").on("change",function(e){
	    var files = e.target.files;
	    var value = $(this).val();
	    $('#filename').val(value);
	});
})
