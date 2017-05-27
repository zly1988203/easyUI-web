/**
 * Created by zhaoly on 2017/5/19.
 */

$(function () {
    initTreeFinance();
    initGridFinanceList();
})

var gVarBranchId = "";
var gridName = "gridfinanceList";
var gridHandel = new GridClass();

function initTreeFinance() {
    var args = {};
    var httpUrl = contextPath+"/archive/financeCode/getFinanceCodeToTree";
    $.get(httpUrl, args,function(data){
        var setting = {
            data: {
                key:{
                    name:'text',
                },
                simpleData: {
                    enable: true,
                    idKey: "id",
                    pIdKey: "pid",
                    rootPId: 0
                }
            },
            callback: {
                onClick: zTreeOnClick
            }
        };
        $.fn.zTree.init($("#treefinances"), setting, JSON.parse(data));
        var treeObj = $.fn.zTree.getZTreeObj("treefinances");
        var nodes = treeObj.getNodes();
        if (nodes.length>0) {
            treeObj.expandNode(nodes[0], true, false, true);
        }
    });
}

//选择树节点
function zTreeOnClick(event, treeId, treeNode) {
    gVarTypeCode = treeNode.code;
    $("#typeCode").val(gVarTypeCode);
    queryFinanceCode();
}

var dg;
function initGridFinanceList() {
    gridHandel.setGridName(gridName);
    dg = $("#"+gridName).datagrid({
        method:'post',
        align:'center',
        url:contextPath+'/archive/financeCode/getDictList',
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        pageSize:50,
        fit:true,
        columns:[[
            {field:'check',checkbox:true},
            {field:'value',title:'编号',width:100,align:'left'},
            {field:'label',title:'名称',width:200,align:'left'},
            {field:'remark',title:'备注',width:200,align:'left'}
        ]]
    })
}
var editDialogTemp = null;
function addFinanceCode() {
    editDialogTemp = $('<div/>').dialog({
        href: contextPath+"/archive/financeCode/toAdd",
        width: 400,
        height: 400,
        title: "财务代码新增",
        closable: true,
        resizable: true,
        onClose: function () {
            $(editDialogTemp).panel('destroy');
            editDialogTemp = null;
        },
        modal: true,
        onLoad: function () {

        }
    })
}

function closeDialogHandel() {
    $(editDialogTemp).panel('destroy');
    editDialogTemp = null;
}

/**
 * 搜索
 */
function queryFinanceCode(){
	//搜索需要将左侧查询条件清除
	$("#startCount").val('');
	$("#endCount").val('');
    var formData = $('#formFinanceList').serializeObject();
//    var postParams = $.extend(formData,{typeCode:gVarTypeCode})
    $("#"+gridName).datagrid("options").queryParams = formData;
    $("#"+gridName).datagrid("options").method = "post";
    $("#"+gridName).datagrid("options").url = contextPath+'/archive/financeCode/getDictList',
    $("#"+gridName).datagrid('load');
}


function delFinanceCode() {
    var rows = $("#"+gridName).datagrid("getChecked");
    if(rows.length <= 0){
        messager('请勾选数据！');
        return;
    }

    var ids='';
    $.each(rows,function(i,v){
    	ids+=v.id+",";
    });

    $.messager.confirm('提示','是否要删除选中数据',function(data){
        if(data){
            gFunStartLoading();
            $.ajax({
                url:contextPath+"/archive/financeCode/deleteFinanceCode",
                type:"POST",
                data:{
                	ids:ids
                },
                success:function(result){
                    gFunEndLoading();
                    if(result['code'] == 0){
                        successTip("删除成功");
                    }else{
                        successTip(result['message']);
                    }
                    $("#"+gridName).datagrid('reload');
                },
                error:function(result){
                    gFunEndLoading();
                    successTip("请求发送失败或服务器处理失败");
                }
            });
        }
    });

}

/**
 * 导出
 */
function exportData(){
	var length = $("#"+gridName).datagrid('getData').rows.length;
	if(length == 0){
		successTip("无数据可导");
		return;
	}
	$('#exportWin').window({
		top:($(window).height()-300) * 0.5,   
	    left:($(window).width()-500) * 0.5
	});
	$("#exportWin").show();
	$("#totalRows").html(dg.datagrid('getData').total);
	$("#exportWin").window("open");
}
// 调用导出方法
function exportExcel(){
	$("#exportWin").hide();
	$("#exportWin").window("close");
	$("#formFinanceList").form({
		success : function(result){
			
		}
	});
	$("#formFinanceList").attr("action",contextPath+"/archive/financeCode/exportHandel");
	$("#formFinanceList").submit();
}