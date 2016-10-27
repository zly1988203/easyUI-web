$(function() {
	//初始化默认条件
    initConditionParams();
    initDatagridByFormNo();
	//选择报表类型
	changeType();
});

//初始化默认条件
function initConditionParams(){
    var startTime = dateUtil.getPreMonthDateStr();
    var endTime = dateUtil.getCurrentDateStr();
    //开始和结束时间
    $("#txtStartDate").val(startTime);
    $("#txtEndDate").val(endTime);
}

function changeType(){
	$(".radioItem").change(function(){
		flushFlg = true;
    	var a = $(this).val();
    	if (a==0) {
    		initDatagridByFormNo();
		} else if (a==1) {
			initDatagridBySupplier();
		} else if (a==2) {
			initDatagridByCategory();
		}else if(a==3){
			initDatagridBySku();
		}
    });
}



var gridHandel = new GridClass();
//初始化表格
function initDatagridByFormNo(){
	gridHandel.setGridName("gridOrders");
    $("#gridOrders").datagrid({
        method:'post',
        align:'center',
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        showFooter:true,
		height:'100%',
		width:'100%',
        columns:[[
            {field:'branchCode',title:'机构编号',width:'140px',align:'left'},
            {field:'branchName',title:'机构名称',width:'140px',align:'left'},
            {field:'supplierCode',title:'供应商编号',width:'140px',align:'left'},
            {field:'supplierName',title:'供应商名称',width:'140px',align:'left'},
            {field:'formNo',title:'采购单编号',width:'140px',align:'left'},
            {field:'arrivalRate',title:'到货率',width:'140px',align:'right',
				formatter : function(value, row, index) {
					if(value!=null){
						return '<b>'+parseFloat(value||0).toFixed(4)+'</b>';
					}
					return "";
				},
			},
			{field:'purchaseNum',title:'采购数量',width:'140px',align:'right',
				formatter : function(value, row, index) {
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			},
			{field:'purchaseAmount',title:'采购金额',width:'140px',align:'right',
				formatter : function(value, row, index) {
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			},
			{field:'receiptNum',title:'收货数量',width:'120px',align:'right',
				formatter : function(value, row, index) {
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			},
			{field:'receiptAmount',title:'收货金额',width:'140px',align:'right',
				formatter : function(value, row, index) {
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			},
			{field:'notQuantity',title:'未到货数量',width:'140px',align:'right',
				formatter : function(value, row, index) {
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			},
			{field:'notAmount',title:'未到货金额',width:'140px',align:'right',
				formatter : function(value, row, index) {
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			}
        ]],
		onLoadSuccess : function() {
			gridHandel.setDatagridHeader("center");
		}
    });
}

//初始化表格
function initDatagridBySupplier(){
	gridHandel.setGridName("gridOrders");
    $("#gridOrders").datagrid({
        method:'post',
        align:'center',
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        showFooter:true,
		height:'100%',
		width:'100%',
        columns:[[
            {field:'supplierCode',title:'供应商编号',width:'140px',align:'left'},
            {field:'supplierName',title:'供应商名称',width:'140px',align:'left'},
            {field:'arrivalRate',title:'到货率',width:'140px',align:'right',
				formatter : function(value, row, index) {
					if(value!=null){
						return '<b>'+parseFloat(value||0).toFixed(4)+'</b>';
					}
					return "";
				},
			},
			{field:'purchaseNum',title:'采购数量',width:'140px',align:'right',
				formatter : function(value, row, index) {
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			},
			{field:'purchaseAmount',title:'采购金额',width:'140px',align:'right',
				formatter : function(value, row, index) {
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			},
			{field:'receiptNum',title:'收货数量',width:'120px',align:'right',
				formatter : function(value, row, index) {
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			},
			{field:'receiptAmount',title:'收货金额',width:'140px',align:'right',
				formatter : function(value, row, index) {
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			},
			{field:'notQuantity',title:'未到货数量',width:'140px',align:'right',
				formatter : function(value, row, index) {
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			},
			{field:'notAmount',title:'未到货金额',width:'140px',align:'right',
				formatter : function(value, row, index) {
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			}
        ]],
		onLoadSuccess : function() {
			gridHandel.setDatagridHeader("center");
		}
    });
    query();
}

//初始化表格
function initDatagridByCategory(){
	gridHandel.setGridName("gridOrders");
    $("#gridOrders").datagrid({
        method:'post',
        align:'center',
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        showFooter:true,
		height:'100%',
		width:'100%',
        columns:[[
            {field:'categoryCode',title:'类别编号',width:'140px',align:'left'},
            {field:'categoryName',title:'类别名称',width:'140px',align:'left'},
            {field:'arrivalRate',title:'到货率',width:'140px',align:'right',
				formatter : function(value, row, index) {
					if(value!=null){
						return '<b>'+parseFloat(value||0).toFixed(4)+'</b>';
					}
					return "";
				},
			},
			{field:'purchaseNum',title:'采购数量',width:'140px',align:'right',
				formatter : function(value, row, index) {
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			},
			{field:'purchaseAmount',title:'采购金额',width:'140px',align:'right',
				formatter : function(value, row, index) {
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			},
			{field:'receiptNum',title:'收货数量',width:'120px',align:'right',
				formatter : function(value, row, index) {
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			},
			{field:'receiptAmount',title:'收货金额',width:'140px',align:'right',
				formatter : function(value, row, index) {
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			},
			{field:'notQuantity',title:'未到货数量',width:'140px',align:'right',
				formatter : function(value, row, index) {
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			},
			{field:'notAmount',title:'未到货金额',width:'140px',align:'right',
				formatter : function(value, row, index) {
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			}
        ]],
		onLoadSuccess : function() {
			gridHandel.setDatagridHeader("center");
		}
    });
    query();
}


//初始化表格
function initDatagridBySku(){
	gridHandel.setGridName("gridOrders");
    $("#gridOrders").datagrid({
        method:'post',
        align:'center',
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        showFooter:true,
		height:'100%',
		width:'100%',
        columns:[[
            {field:'supplierCode',title:'供应商编号',width:'140px',align:'left'},
            {field:'supplierName',title:'供应商名称',width:'140px',align:'left'},
            {field:'formNo',title:'单据编号',width:'140px',align:'left'},
            {field:'skuName',title:'商品名称',width:'140px',align:'left'},
            {field:'skuCode',title:'货号',width:'140px',align:'left'},
            {field:'barCode',title:'条码',width:'140px',align:'left'},
            {field:'categoryCode',title:'类别编号',width:'140px',align:'left'},
            {field:'categoryName',title:'类别名称',width:'140px',align:'left'},
            {field:'arrivalRate',title:'到货率',width:'140px',align:'right',
				formatter : function(value, row, index) {
					if(value!=null){
						return '<b>'+parseFloat(value||0).toFixed(4)+'</b>';
					}
					return "";
				},
			},
			{field:'purchaseNum',title:'采购数量',width:'140px',align:'right',
				formatter : function(value, row, index) {
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			},
			{field:'purchaseAmount',title:'采购金额',width:'140px',align:'right',
				formatter : function(value, row, index) {
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			},
			{field:'receiptNum',title:'收货数量',width:'120px',align:'right',
				formatter : function(value, row, index) {
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			},
			{field:'receiptAmount',title:'收货金额',width:'140px',align:'right',
				formatter : function(value, row, index) {
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			},
			{field:'notQuantity',title:'未到货数量',width:'140px',align:'right',
				formatter : function(value, row, index) {
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			},
			{field:'notAmount',title:'未到货金额',width:'140px',align:'right',
				formatter : function(value, row, index) {
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			}
        ]],
		onLoadSuccess : function() {
			gridHandel.setDatagridHeader("center");
		}
    });
    query();
}

function query(){
	$("#gridOrders").datagrid("options").queryParams = $("#queryForm").serializeObject();
	$("#gridOrders").datagrid("options").method = "post";
	$("#gridOrders").datagrid("options").url = contextPath+'/report/purchase/getList';
	$("#gridOrders").datagrid("load");
}

function selectSupplier(){
	new publicSupplierService(function(data){
		$("#supplierId").val(data.id);
		$("#supplierName").val("["+data.supplierCode+"]"+data.supplierName);
	});
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

//商品分类
function getGoodsType(){
	new publicCategoryService(function(data){
		$("#categoryId").val(data.goodsCategoryId);
		$("#categoryCode").val(data.categoryCode);
		$("#categoryName").val(data.categoryName);
	});
}

/**
 * 重置
 */
function resetForm(){
	 $("#txtStartDate").val('');
	 $("#txtEndDate").val('');
	 $('#branchCode').val('');
	 $('#branchNameOrCode').val('');
	 $('#supplierId').val('');
	 $('#supplierName').val('');
	 $('#categoryId').val('');
	 $('#categoryName').val('');
	 $('#categoryCode').val('');
	 $('#formNo').val('');
	 $('#arrivalRate').val('');
};

//清空机构编号
function cleanBranchCode(){
	var branchNameOrCode = $("#branchNameOrCode").val();
	if(!branchNameOrCode){
		$("#branchCode").val('');
	}
}

/**
 * 导出
 */
function exportExcel(){
	$("#queryForm").form({
		success : function(data){
			if(data.code > 0){
				$.messager.alert('提示',data.message);
			}
		}
	});
	
	var isValid = $("#queryForm").form('validate');
	if(!isValid){
		return;
	}
	
	var length = $("#gridOrders").datagrid('getData').total;
	if(length == 0){
		$.messager.alert('提示',"无数据可导");
		return;
	}
	if(length>10000){
		$.messager.alert('提示',"当次导出数据不可超过1万条，现已超过，请重新调整导出范围！");
		return;
	}
	$("#queryForm").attr("action",contextPath+"/report/purchase/exportList");
	$("#queryForm").submit(); 
}
