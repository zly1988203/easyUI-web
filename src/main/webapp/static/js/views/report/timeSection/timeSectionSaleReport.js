var rotaType =  1;
$(function(){
	$("#oldBranchName").val(sessionBranchName);
	$("#branchName").val(sessionBranchName);
	$("#branchCompleCode").val(sessionBranchCompleCode);
	$("#branchId").val(sessionBranchId);
	$("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",0));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    initDatagridRequire();
    
    $(".radioItem").on("change",function(){
    	rotaType = $(this).val();
    	$("#sectionSellReport").datagrid('options').url = "";
    	initDatagridRequire();
    	$('#sectionSellReport').datagrid({data:[]}); 
    	$('#sectionSellReport').datagrid('reloadFooter',[]);
    })
});

/**
 * 机构名称
 */
function selectBranches() {
	new publicAgencyService(function(data) {
		$("#branchId").val(data.branchesId);
		$("#branchCompleCode").val(data.branchCompleCode);
		$("#branchName").val(data.branchName);
		$("#oldBranchName").val(data.branchName);
	}, 'BF', '');
}

/**
 * 查询置
 */
function queryForm(){
	if($("#branchName").val()==""){
        $_jxc.alert("请选择机构");
        return;
    } 
	if($("#startTime").val()==""){
		$_jxc.alert("请选择开始时间");
		return;
	} 
	if($("#endTime").val()==""){
		$_jxc.alert("请选择结束时间");
		return;
	} 
	var oldBranchName = $("#oldBranchName").val();
	var branchName = $("#branchName").val();
	if(oldBranchName && oldBranchName != branchName){
		$("#branchCompleCode").val('');
	}
	
	$("#startCount").attr("value",null);
	$("#endCount").attr("value",null);
	var fromObjStr = $('#queryForm').serializeObject();
	console.log(fromObjStr);
	$("#sectionSellReport").datagrid("options").method = "post";
	$("#sectionSellReport").datagrid('options').url = contextPath + '/report/sectionSell/getTimeSectionSellReportList';
	$("#sectionSellReport").datagrid('load', fromObjStr);
}

var gridHandel = new GridClass();
//初始化表格
function initDatagridRequire() {
	gridHandel.setGridName("sectionSellReport");
	dg = $("#sectionSellReport").datagrid({
		method : 'post',
		align : 'center',
		singleSelect : false, //单选  false多选
		rownumbers : true, //序号
		pagination : true, //分页
		fitColumns : true, //每列占满
		showFooter : true,
		height : '100%',
		pageSize : 50,
		width : '100%',
		columns : [ [ {
			field : 'timeSection',
			title : '时段',
			width : '120px',
			align : 'left'
		}, {
			field : 'branchName',
			title : '机构名称',
			width : '200px',
			align : 'left'
		},{
			field : 'saleNum',
			title : '销售数量',
			width : '120px',
			align : 'right',
			formatter : function(value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';;
			}
		}, {
			field : 'saleAmount',
			title : '总销金额',
			width : '120px',
			align : 'right',
			formatter : function(value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';;
			}
		}, {
			field : 'orderNum',
			title : '客单数',
			width : '120px',
			align : 'right',
			formatter : function(value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';;
			}
		}, {
			field : 'orderAmount',
			title : '客单价',
			width : '120px',
			align : 'right',
			formatter : function(value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';;
			}
		}, 
		{
			field : 'offlOrderNum',
			title : '线下客单数',
			width : '120px',
			align : 'right',
			formatter : function(value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';;
			}
		}, {
			field : 'offlorderAmount',
			title : '线下客单价',
			width : '120px',
			align : 'right',
			formatter : function(value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';;
			}
		},
		{
			field : 'onlOrderNum',
			title : '线上客单数',
			width : '120px',
			align : 'right',
			formatter : function(value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';;
			}
		}, {
			field : 'onlorderAmount',
			title : '线上客单价',
			width : '120px',
			align : 'right',
			formatter : function(value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';;
			}
		},
		{
			field : 'offlSaleAmount',
			title : '线下销额',
			width : '120px',
			align : 'right',
			formatter : function(value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';;
			}
		}, {
			field : 'offlSaleNum',
			title : '线下销量',
			width : '120px',
			align : 'right',
			formatter : function(value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';;
			}
		},
		{
			field : 'onlSaleAmount',
			title : '线上销额',
			width : '120px',
			align : 'right',
			formatter : function(value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';;
			}
		}, {
			field : 'onlSaleNum',
			title : '线上销量',
			width : '120px',
			align : 'right',
			formatter : function(value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';;
			}
		},
		] ],
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
	var length = $('#sectionSellReport').datagrid('getData').total;
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

/**
 * 导出
 */
function exportExcel(){
	var length = $("#sectionSellReport").datagrid('getData').total;
	if(length == 0){
		$.messager.alert('提示',"没有数据");
		return;
	}
	var fromObjStr = $('#queryForm').serializeObject();
	console.log(fromObjStr);
	$("#queryForm").form({
		success : function(data){
			if(data==null){
				$.messager.alert('提示',"导出数据成功！");
			}else{
				$.messager.alert('提示',JSON.parse(data).message);
			}
		}
	});
	$("#queryForm").attr("action",contextPath+"/report/sectionSell/exportTimeSectionSellReportList?"+fromObjStr);
	$("#queryForm").submit();
}
/**
 * 打印
 */
/*
function printReport(){
	var length = $("#sectionSellReport").datagrid('getData').total;
	if(length == 0){
		$.messager.alert('提示',"没有数据");
		return;
	}
	var fromObjStr = $('#queryForm').serializeObject();
	console.log(fromObjStr);
	var param=setParams("queryForm");
	console.log(param);
	parent.addTabPrint("库存周转率","打印",contextPath+"/report/rotation/printRotaRateReport?" + param);
}
*/
function setParams(formId){  
	var param="";
	var arr = $('#' + formId).serializeArray();
	if(arr != null){
		for(var i=0;i<arr.length;i++){
			var _val = encodeURIComponent(arr[i].value);
			if(_val){
				param = param + arr[i].name + "="+_val+"&";
			}
		}
	}
	if(param){
		param = param.substring(0,param.length-1);
	}
	return param;
}