/**
 * Created by zhaoly on 2017/5/18.
 */

var gridName = "gridBranchList";
var gridHandel = new GridClass();
var gVarBranchId = "";
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
    var httpUrl = contextPath+"/archive/branch/getBranchAreaToTree";
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
    $("#branchCompleCode").val(treeNode.code);
    queryBranch();
}
var dg;
function initDatagridBranchList() {
    gridHandel.setGridName(gridName);
    dg = $("#"+gridName).datagrid({
        method:'post',
        align:'center',
        url:contextPath+'/archive/branch/getBranchList',
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        pageSize:50,
        fit:true,
        columns:[[
            {field:'branchCode',title:'机构编码',width:80,align:'left',
                formatter: function(value,row,index){
                    return "<a href='#' onclick=\"editHandel('"+row.branchesId+"')\" class='ualine'>"+value+"</a>";

                }
            },
            {field:'branchName',title:'机构名称',width:180,align:'left'},
            {field:'branchTypeStr',title:'机构类型',width:80,align:'left'},
            {field:'parentBranchName',title:'所属机构',width:180,align:'left'},
            {field:'offlineStatusStr',title:'机构状态',width:80,align:'left'},
            {field:'areaSize',title:'店铺面积(m*2)',width:110,align:'left'},
            {field:'costAvgYear',title:'费用均摊年数',width:110,align:'right'},
            {field:'contacts',title:'联系人',width:120,align:'left'},
            {field:'mobile',title:'联系电话',width:120,align:'left'},
            {field:'createTimeStr',title:'建店时间',width:150,align:'left'}
        ]],
        onLoadSuccess : function() {
            gridHandel.setDatagridHeader("center");
        }
    });
}

/**
 * 修改
 */
function editHandel(branchId){
    openEditBranchDailog(branchId);
}

var dialogHeight = $(window).height()*(4/5);
var dialogWidth = $(window).width()*(5/9);
var dialogLeft = $(window).width()*(1/5);
var  editDialogTemp
function  openEditBranchDailog(branchId) {
    editDialogTemp = $('<div/>').dialog({
        href: contextPath+"/archive/branch/toEdit",
        queryParams:{
        	branchId : branchId
        },
        width: dialogWidth,
        height: dialogHeight,
        left:dialogLeft,
        title: "修改机构信息",
        closable: true,
        resizable: true,
        onClose: function () {
            $(editDialogTemp).panel('destroy');
            editDialogTemp = null;
        },
        modal: true,
        onLoad: function () {
            initBranchInfo();
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
function queryBranch(){
    var formData = $('#formList').serializeObject();
    $("#"+gridName).datagrid("options").queryParams = formData;
    $("#"+gridName).datagrid("options").method = "post";
    $("#"+gridName).datagrid("options").url =contextPath+'/archive/branch/getBranchList',
    $("#"+gridName).datagrid('load');
}

function editBranch() {
    var row = $("#"+gridName).datagrid("getSelected");
    if(!row || row == null){
        messager("请选择一条数据!");
        return;
    }
    openEditBranchDailog(row.branchesId);
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
	$("#formList").form({
		success : function(result){
			
		}
	});
	$("#formList").attr("action",contextPath+"/archive/branch/exportHandel");
	$("#formList").submit();
}