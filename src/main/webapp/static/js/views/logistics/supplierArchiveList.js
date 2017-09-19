/**
 * Created by huangj02 on 2016/10/12.
 */

var gridHandel = new GridClass();

$(function(){
    initTreeArchives();
    initDatagridsupplierList();
});
/**
 * 初始树
 */
function initTreeArchives(){
    var args = {};
    var httpUrl = contextPath+"/logisticsSupplier/getBranchSupplierAreaToTree";
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
        $.fn.zTree.init($("#treeArchives"), setting, JSON.parse(data));
        var treeObj = $.fn.zTree.getZTreeObj("treeArchives");
        var nodes = treeObj.getNodes();
        if (nodes.length>0) {
            treeObj.expandNode(nodes[0], true, false, true);
        }
    });
}

var dg;
//初始化表格
function initDatagridsupplierList(){
	dg = $("#gridSupplierArchiveList").datagrid({
        method:'post',
        align:'center',
        url:contextPath+'/logisticsSupplier/getSupplierList',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        pageSize:50,
        //fitColumns:true,    //每列占满
        fit:true,            //占满
        showFooter:true,
        columns:[[
            {field:'supplierCode',title:'供应商编码',width:80,align:'left'},
        	{field:'supplierName',title:'供应商名称',width:180,align:'left'},
            {field:'address',title:'供应商地址',width:180,align:'left'},
            {field:'contcat',title:'联系人',width:120,align:'left'},
            {field:'phone',title:'电话号码',width:120,align:'left'},
            {field:'mobile',title:'手机号码',width:120,align:'left'},
            {field:'area',title:'地区名称',width:120,align:'left'}
        ]],
        onLoadSuccess : function() {
            gridHandel.setDatagridHeader("center");
        }
    });
}


//交互方法========================================================================

var  addDalogTemp;
var  editDalogTemp;

var gVarBranchId = "";
var gVarSupplierAreaId = "";

//选择树节点
function zTreeOnClick(event, treeId, treeNode) {
    if(treeNode.type=="branch"){//选择机构
        gVarBranchId = treeNode.id;
        gVarSupplierAreaId = "";
    }else if(treeNode.type=="area"){//选择区域
        gVarBranchId = treeNode.pid
        gVarSupplierAreaId = treeNode.id;
    }
    searchLeftHandel();
    $("#selectBranchId").val(gVarBranchId);
}

/**
 * 导出
 */
function exportData(){
	var length = $('#gridSupplierArchiveList').datagrid('getData').rows.length;
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

	$("#formList").attr("action",contextPath+"/logisticsSupplier/exportHandel");
	$("#formList").submit();
}

/**
 * 搜索
 */
function searchHandel(){
	//搜索需要将左侧查询条件清除
	$("#startCount").val('');
	$("#endCount").val('');
	$("#selectBranchId").val('');
    var formData = $('#formList').serializeObject();
    $("#gridSupplierArchiveList").datagrid("options").queryParams = formData;
    $("#gridSupplierArchiveList").datagrid("options").method = "post";
    $("#gridSupplierArchiveList").datagrid("options").url =contextPath+'/logisticsSupplier/getSupplierList',
    $("#gridSupplierArchiveList").datagrid('load');
}
/**
 * 左侧搜索
 */
function searchLeftHandel(){
	var formData = $('#formList').serializeObject();
	var postParams = $.extend(formData,{branchId:gVarBranchId,supplierAreaId:gVarSupplierAreaId})
	$("#gridSupplierArchiveList").datagrid("options").queryParams = postParams;
	$("#gridSupplierArchiveList").datagrid("options").method = "post";
	$("#gridSupplierArchiveList").datagrid("options").url =contextPath+'/logisticsSupplier/getSupplierList',
	$("#gridSupplierArchiveList").datagrid('load');
}
function reloadListHandel(){
    $("#gridSupplierArchiveList").datagrid('reload');
}
function closeDialogHandel(){
    if(addDalogTemp){
        $(addDalogTemp).panel('destroy');
        addDalogTemp = null;
    }
    if(editDalogTemp){
        $(editDalogTemp).panel('destroy');
        editDalogTemp = null;
    }
}
/**
 * 供应商区域选择事件
 */
function bindSupplierAreaSelect(){
	$("#supplierAreaId").change(function(){
		var supplierAreaCode = $(this).children('option:selected').attr("code");
		$("#supplierAreaCode").val(supplierAreaCode);
	});
}

/**
 * 初始化下拉框的默认值
 */
function selectParamInit(){
	// 税票类型下拉框
	var stampsType = $("#stampsTypeVal").val();
	if(stampsType){
		$("#stampsType").val(stampsType);
	}
	
	// 送货时间下拉框
	var deliverTime = $("#deliverTimeVal").val();
	if(deliverTime){
		$("#deliverTime").val(deliverTime);
	}
	// 冻结账款下拉框
	var freezeAccount = $("#freezeAccountVal").val();
	if(freezeAccount){
		$("#freezeAccount").val(freezeAccount);
	}
	
	// 冻结业务下拉框
	var freezeBusiness = $("#freezeBusinessVal").val();
	if(freezeBusiness){
		$("#stampfreezeBusinesssType").val(freezeBusiness);
	}

    var saleWay = 	$('#saleWay').combobox("getValue");
    if(saleWay != "C"){
        $("#minAmountDiv").addClass("unhide");
    }else{
        $("#minAmountDiv").removeClass("unhide");
    }
	
}