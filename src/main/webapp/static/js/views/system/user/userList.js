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
        fit:true,            //占满
        showFooter:true,
        columns:[[
            {field:'check',checkbox:true},
            {field:'userCode',title:'帐号名',sortable:true,width:100},    
            {field:'userName',title:'真实姓名',sortable:true,width:100},
            {field:'mobile',title:'电话',sortable:true,width:100},
            {field:'branchCode',title:'机构编号',sortable:true,width:100},
            {field:'branchTypeStr',title:'机构类型',sortable:true,width:100},
            {field:'branchName',title:'机构名称',sortable:true,width:100},
            {field:'lastLoginTime',title:'最近使用时间',sortable:true,width:100,
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
	var formData = $("#queryForm").serializeObject();
	var branchNameOrCode = $("#branchNameOrCode").val();
	if(branchNameOrCode && branchNameOrCode.indexOf("[")>=0 && branchNameOrCode.indexOf("]")>=0){
		formData.branchNameOrCode = null;
	}
	$("#dg").datagrid("options").queryParams = formData;
	$("#dg").datagrid("options").method = "post";
	$("#dg").datagrid("load");
}

/**
 * 机构列表下拉选
 */
function searchBranch (){
	new publicAgencyService(function(data){
		$("#branchCode").val(data.branchCode);
		$("#branchNameOrCode").val("["+data.branchCode+"]"+data.branchName);
	},"","");
}

function clearBranchCode(){
	var branchNameOrCode = $("#branchNameOrCode").val();
	
	//如果修改名称
	if(!branchNameOrCode || 
			(branchNameOrCode && branchNameOrCode.indexOf("[")<0 && branchNameOrCode.indexOf("]")<0)){
		$("#branchCode").val('');
	}
}

function toAdd(){
	openDialog(contextPath+"/system/user/toAddUser","新增用户","add");
}

var  dalogTemp;
//打开Dialog
function openDialog(argUrl,argTitle,argType) {
    dalogTemp = $('<div/>').dialog({
        href: argUrl,
        width: 500,
        height: 480,
        title: argTitle,
        closable: true,
        resizable: true,
        onClose: function () {
            $(dalogTemp).panel('destroy');
        },
        modal: true,
        onLoad: function () {
//            if(argType=='add'){
//                initGoodsView(params,"add")
//            }else if(argType=="edit"){
//                initGoodsEditView(params);
//            }else if(argType=="copy"){
//                initGoodsView(params,"")
//            }

        }
    })
}