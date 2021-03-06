var rotaType =  1;
$(function(){
	$("#oldBranchName").val(sessionBranchCodeName);
	$("#branchName").val(sessionBranchCodeName);
	$("#branchCompleCode").val(sessionBranchCompleCode);
	$("#branchId").val(sessionBranchId);
	
	$("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    
    initDatagridRequire();
    
    $(".radioItem").on("change",function(){
    	rotaType = $(this).val();
    	$("#rotationReport").datagrid('options').url = "";
    	initDatagridRequire();
    	$('#rotationReport').datagrid({data:[]}); 
    })
    
    $('#branchComponent').branchSelect({
		//ajax请求参数
		param:{
			formType:'BF'
		}
	});
});
var rotationTips;
function getFiledsList(){
	if(rotaType == 1){
		rotationTips = "库存周转率=期间销售金额/期间平均销售金额*100%</br>库存周转天数=期间天数/库存周转率";
		$('#divTips').html(rotationTips);
		return [ [ {
			field : 'branchCode',
			title : '机构编号',
			width : '100px',
			align : 'left'
		}, {
			field : 'branchName',
			title : '机构名称',
			width : '150px',
			align : 'left'
		},{
			field : 'skuCode',
			title : '货号',
			width : '100px',
			align : 'left'
		}, {
			field : 'skuName',
			title : '商品名称',
			width : '200px',
			align : 'left'
		}, {
			field : 'rotationDay',
			title : '期间天数',
			width : '100px',
			align : 'right'
		}, {
			field : 'saleNum',
			title : '销售数量',
			width : '100px',
			align : 'right',
			formatter : function(value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';;
			}
		}, {
			field : 'saleAmount',
			title : '期间销售金额',
			width : '120px',
			align : 'right',
			formatter : function(value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';;
			}
		},{
			field : 'originalSaleAmount',
			title : '期间原价销售金额',
			width : '120px',
			align : 'right',
			formatter : function(value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';;
			}
		}, {
			field : 'beginSaleAmount',
			title : '期初销售金额',
			width : '120px',
			align : 'right',
			formatter : function(value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';;
			}
		}, {
			field : 'endSaleAmount',
			title : '期末销售金额',
			width : '120px',
			align : 'right',
			formatter : function(value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';;
			}
		}, {
			field : 'avgSaleAmount',
			title : '期间平均销售金额',
			width : '120px',
			align : 'right',
			formatter : function(value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';;
			}
		}, {
			field : 'saleRotationRateNum',
			title : '库存周转率',
			width : '120px',
			align : 'right',
			formatter : function(value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'%</b>';;
			}
		}, {
			field : 'saleRotationDay',
			title : '库存周转天数',
			width : '100px',
			align : 'right',
			formatter : function(value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';;
			}
		} ] ]
	}else{
		rotationTips = "库存周转率=期间销售成本金额/期间平均库存金额*100%</br>库存周转天数=期间天数/库存周转率";
		$('#divTips').html(rotationTips);
		return [ [ {
			field : 'branchCode',
			title : '机构编号',
			width : '100px',
			align : 'left'
		}, {
			field : 'branchName',
			title : '机构名称',
			width : '150px',
			align : 'left'
		},{
			field : 'skuCode',
			title : '货号',
			width : '100px',
			align : 'left'
		}, {
			field : 'skuName',
			title : '商品名称',
			width : '200px',
			align : 'left'
		}, {
			field : 'rotationDay',
			title : '期间天数',
			width : '100px',
			align : 'right'
		}, {
			field : 'saleNum',
			title : '销售数量',
			width : '100px',
			align : 'right',
			formatter : function(value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';;
			}
		}, {
			field : 'saleAmount',
			title : '期间销售金额',
			width : '120px',
			align : 'right',
			formatter : function(value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';;
			}
		}, {
			field : 'costAmount',
			title : '期间销售成本金额',
			width : '120px',
			align : 'right',
			formatter : function(value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';;
			}
		}, {
			field : 'beginCostAmount',
			title : '期初库存金额',
			width : '120px',
			align : 'right',
			formatter : function(value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';;
			}
		}, {
			field : 'endCostAmount',
			title : '期末库存金额',
			width : '120px',
			align : 'right',
			formatter : function(value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';;
			}
		}, {
			field : 'avgCostAmount',
			title : '期间平均库存金额',
			width : '120px',
			align : 'right',
			formatter : function(value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';;
			}
		}, {
			field : 'costRotationRateNum',
			title : '库存周转率',
			width : '120px',
			align : 'right',
			formatter : function(value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'%</b>';;
			}
		}, {
			field : 'costRotationDay',
			title : '库存周转天数',
			width : '100px',
			align : 'right',
			formatter : function(value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';;
			}
		} ] ]
	}
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
	$("#startCount").val('');
	$("#endCount").val('');
	var branchName = $("#branchName").val();
	var skuCode = $("#skuCode").val();
	if(branchName=="" && skuCode ==""){
        $_jxc.alert("请选择机构或输入商品货号，条码");
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
	
	$("#startCount").attr("value",null);
	$("#endCount").attr("value",null);
	var fromObjStr = $('#queryForm').serializeObject();
	$("#rotationReport").datagrid("options").method = "post";
	$("#rotationReport").datagrid('options').url = contextPath + '/report/rotation/getRotaRateReportList';
	$("#rotationReport").datagrid('load', fromObjStr);
}

var gridHandel = new GridClass();
var gridName = "rotationReport";
//初始化表格
function initDatagridRequire() {
	gridHandel.setGridName("rotationReport");
	dg = $("#rotationReport").datagrid({
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
		columns : getFiledsList(),
		onLoadSuccess : function(data) {
			gridHandel.setDatagridHeader("center");
		}
	});
    if(hasCostPrice==false){
        priceGrantUtil.grantCostPrice(gridName,["costAmount","beginCostAmount","endCostAmount","avgCostAmount","costRotationRateNum"])
    }
}

var dg;
/**
 * 导出
 */
function exportData(){
	var length = $('#rotationReport').datagrid('getData').total;
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
 * 商品选择
 */
function selectGoods(searchKey) {
	var branchId=null;
	//判定供应商是否存在
    if($("#branchId").val()==""){
        $_jxc.alert("请先选择机构");
        return;
    }
    branchId=$("#branchId").val();
	gFunGoodsSelect(searchKey,branchId);
}
//商品选择 公共使用
function gFunGoodsSelect(searchKey,branchId){

    var param = {
        type:'',
        key:searchKey,
        isRadio:1,
        sourceBranchId:"",
        targetBranchId:"",
        branchId:branchId,
        supplierId:'',
        flag:'0',
    }
    new publicGoodsServiceTem(param,function(data){
    	if(data.length==0){
            return;
        }
    	$("#skuId").val(data[0].skuId);
    	$("#skuName").val(data[0].skuName);
        
    });
}


/**
 * 导出
 */
function exportExcel(){
	var length = $("#rotationReport").datagrid('getData').total;
	if(length == 0){
		$_jxc.alert("没有数据");
		return;
	}

	$("#queryForm").attr("action",contextPath+"/report/rotation/exportRotaRateReportList");
	$("#queryForm").submit();
}
/**
 * 打印
 */
function printReport(){
	$("#startCount").val('');
	$("#endCount").val('');
	var length = $("#rotationReport").datagrid('getData').total;
	if(length == 0){
		$_jxc.alert("没有数据");
		return;
	}
	var fromObjStr = $('#queryForm').serializeObject();
	
	var param=setParams("queryForm");
	console.log(param);
	parent.addTabPrint("库存周转率","打印",contextPath+"/report/rotation/printRotaRateReport?" + param);
}

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