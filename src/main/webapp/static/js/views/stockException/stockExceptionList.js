$(function(){
    initDatagridRequire();
    if(getUrlQueryString('message')=='0'){
    	//$("#branchId").val(sessionBranchId);
    	//$("#branchName").val(sessionBranchName);
    	$("#startCount").attr("value",null);
    	$("#endCount").attr("value",null);
    	var fromObjStr = $('#queryForm').serializeObject();
    	$("#stockException").datagrid("options").method = "post";
    	$("#stockException").datagrid('options').url = contextPath + '/stock/exception/getStockExceptionList';
    	$("#stockException").datagrid('load', fromObjStr);
    }
});
/**
 * 机构名称
 */
function selectBranches() {
	new publicAgencyService(function(data) {
		$("#branchId").val(data.branchesId);
		$("#branchName").val(data.branchName);
	}, 'BF', '');
}
/**
 * 重置
 */
var resetForm = function() {
	 $("#queryForm").form('clear');
};

/**
 * 查询置
 */
function queryForm(){
//	if($("#branchName").val()==""){
//        $_jxc.alert("请选择机构");
//        return;
//    } 
//	if($("#branchName").val()=="" && $("#skuCode").val()=="" ){
//        $_jxc.alert("请选择机构或输入条码");
//        return;
//    } 
	$("#startCount").attr("value",null);
	$("#endCount").attr("value",null);
	var fromObjStr = $('#queryForm').serializeObject();
	$("#stockException").datagrid("options").method = "post";
	$("#stockException").datagrid('options').url = contextPath + '/stock/exception/getStockExceptionList';
	$("#stockException").datagrid('load', fromObjStr);
}

var gridHandel = new GridClass();
//初始化表格
function initDatagridRequire() {
	gridHandel.setGridName("stockException");
	dg = $("#stockException").datagrid({
		method : 'post',
		align : 'center',
		singleSelect : false, // 单选 false多选
		rownumbers : true, // 序号
		pagination : true, // 分页
		fitColumns : true, // 每列占满
		showFooter : true,
		height : '100%',
		pageSize : 50,
		width : '100%',
		columns : [ [ {
			field : 'branchCode',
			title : '机构编号',
			width : '100px',
			align : 'left'
		}, {
			field : 'branchName',
			title : '机构名称',
			width : '150px',
			align : 'left'
		}, {
			field : 'categoryCode',
			title : '类别编号',
			width : '100px',
			align : 'left'
		}, {
			field : 'categoryName',
			title : '类别名称',
			width : '165px',
			align : 'left'
		}, {
			field : 'skuCode',
			title : '货号',
			width : '100px',
			align : 'left'
		}, {
			field : 'skuName',
			title : '商品名称',
			width : '165px',
			align : 'left'
		}, {
			field : 'barCode',
			title : '条码',
			width : '100px',
			align : 'left'
		}, {
			field : 'skuSpec',
			title : '规格',
			width : '65px',
			align : 'left'
		}, {
			field : 'skuUnit',
			title : '单位',
			width : '65px',
			align : 'left'
		}, {
			field : 'actual',
			title : '库存数量',
			width : '100px',
			align : 'left',
			formatter : function(value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';;
			}
		}, {
			field : 'upperLimit',
			title : '库存上限',
			width : '100px',
			align : 'left',
			formatter : function(value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';;
			}
		}, {
			field : 'lowerLimit',
			title : '库存下限',
			width : '100px',
			align : 'left',
			formatter : function(value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';;
			}
		}, {
			field : 'referenceNum',
			title : '参考进货数量',
			width : '100px',
			align : 'left',
			formatter : function(value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';;
			}
		} ] ],
		onLoadSuccess : function(data) {
			gridHandel.setDatagridHeader("center");
		}
	});
}

var dg;
/**
 * 导出
 */
function exportData(){
	var length = $('#stockException').datagrid('getData').total;
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

/**
 * 导出
 */
function exportExcel(){
	var length = $("#stockException").datagrid('getData').total;
	if(length == 0){
		$_jxc.alert("没有数据");
		return;
	}
	var fromObjStr = $('#queryForm').serializeObject();
	
	$("#queryForm").form({
		success : function(data){
			if(data==null){
				$_jxc.alert("导出数据成功！");
			}else{
				$_jxc.alert(JSON.parse(data).message);
			}
		}
	});
	$("#queryForm").attr("action",contextPath+"/stock/exception/exportStockExceptionList?"+fromObjStr);
	$("#queryForm").submit();
}