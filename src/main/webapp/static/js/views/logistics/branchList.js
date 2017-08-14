/**
 * Created by zhaoly on 2017/5/18.
 */

var gridName = "gridBranchList";
var gridHandel = new GridClass();
var gVarBranchId = "";
var gVarBranchCompleCode = "";
$(function(){
    initTreeArchives();
    initDatagridBranchList();
    
    $(document).on('click','.radioItem',function () {
        searchHandel();
    })
});

/**
 * 初始树
 */
function initTreeArchives(){
    var args = {};
    var httpUrl = contextPath+"/logisticsBranch/getBranchAreaToTree";
    $.get(httpUrl, args,function(data){
        var setting = {
            data: {
                key:{
                    name:'codeText',
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
        if(data == ""){
            return;
        }
        $.fn.zTree.init($("#treeBranchList"), setting, JSON.parse(data));
        var treeObj = $.fn.zTree.getZTreeObj("treeBranchList");
        var nodes = treeObj.getNodes();
        if (nodes.length>0) {
            treeObj.expandNode(nodes[0], true, false, true);
        }
    });
}

//选择树节点
function zTreeOnClick(event, treeId, treeNode) {
    gVarBranchId = treeNode.id;
    gVarBranchCompleCode = treeNode.code;
    $("#branchCompleCode").val(treeNode.code);
    queryBranch();
}
var dg;
function initDatagridBranchList() {
    gridHandel.setGridName(gridName);
    dg = $("#"+gridName).datagrid({
        method:'post',
        align:'center',
        url:contextPath+'/logisticsBranch/getBranchList',
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        pageSize:50,
        fit:true,
        columns:[[
            {field:'branchCode',title:'配送点代号',width:80,align:'left'},
            {field:'branchName',title:'配送点名称',width:200,align:'left'},
            {field:'address',title:'配送点地址',width:200,align:'left'},
            {field:'mobile',title:'联系电话',width:100,align:'left'},
            {field:'contacts',title:'联系人',width:100,align:'left'},
            {field:'area',title:'地区（城市名称）',width:110,align:'left'},
            {field:'branchTypeStr',title:'类型',width:80,align:'left'},
            {field:'parentBranchCode',title:'集团客户代号',width:100,align:'left'}
        ]],
        onLoadSuccess : function() {
            gridHandel.setDatagridHeader("center");
        }
    });
}

/**
 * 搜索
 */
function queryBranch(){
	//搜索需要将左侧查询条件清除
	$("#startCount").val('');
	$("#endCount").val('');
    var formData = $('#formList').serializeObject();
    $("#"+gridName).datagrid("options").queryParams = formData;
    $("#"+gridName).datagrid("options").method = "post";
    $("#"+gridName).datagrid("options").url =contextPath+'/logisticsBranch/getBranchList',
    $("#"+gridName).datagrid('load');
}

/**
 * 导出
 */
function exportData(){
	var length = $("#"+gridName).datagrid('getData').rows.length;
	if(length == 0){
		$_jxc.alert("无数据可导");
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

	$("#formList").attr("action",contextPath+"/logisticsBranch/exportHandel");
	$("#formList").submit();
}