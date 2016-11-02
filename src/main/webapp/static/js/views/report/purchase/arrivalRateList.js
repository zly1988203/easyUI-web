$(function() {
	//开始和结束时间
	$("#txtStartDate").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
	//初始化默认条件
    initDatagridByFormNo();
	//选择报表类型
	changeType();
	checktype();
	$(document).on('keyup','#arrivalRate',function(){
		var val=parseFloat($(this).val());
	    var str=$(this).val();
		if(val<0||val>1){
			   $(this).val("");	
		}
		else if(str.length>=6){
		    var subval=str.substring(0,6);
		    $(this).val(subval);	
		}
	})
});

var flushFlg = false;
function changeType(){
	$(".radioItem").change(function(){
		checktype()
		var val = $(this).val();
		if (val==0) {
			flushFlg=true;
			initDatagridByFormNo();
			
		} else if (val==1) {
			initDatagridBySupplier();
		} else if (val==2) {
			initDatagridByCategory();
		}else if(val==3){
			initDatagridBySku();
		}
	});
}

function checktype(){
	
 var len=$('.radioItem').length;
  console.log(len)
	for(var i=0;i<len;i++){
		var check=$('.radioItem').eq(i).prop('checked');
		var value=$('.radioItem').eq(i).val();
		if(check==true&&value=='0'){
			$('#categoryName').addClass('uinp-no-more');
			$('#categoryName').removeAttr('onclick');
			$('.uinp-categoryName').removeAttr('onclick');
			$('#supplierName').removeClass('uinp-no-more');
			$('#supplierName').attr('onclick','selectSupplier()');
			$('.uinp-supplierName').attr('onclick','selectSupplier()');
			$('#formNo').removeClass('uinp-no-more');
			$('#formNo').removeAttr("readonly");
		}
		else if(check==true&&value=='1'){
			$('#categoryName').addClass('uinp-no-more');
			$('#categoryName').removeAttr('onclick');
			$('.uinp-categoryName').removeAttr('onclick');
			$('#formNo').addClass('uinp-no-more');
			$('#formNo').attr("readonly","readonly"); 
			$('#supplierName').removeClass('uinp-no-more');
			$('#supplierName').attr('onclick','selectSupplier()');
			$('.uinp-supplierName').attr('onclick','selectSupplier()');	
		}
		else if(check==true&&value=='2'){
			$('#supplierName').addClass('uinp-no-more');
			$('#supplierName').removeAttr('onclick');
			$('.uinp-supplierName').removeAttr('onclick');
			$('#formNo').addClass('uinp-no-more');
			$('#formNo').attr("readonly","readonly"); 
			$('#categoryName').attr('onclick','getGoodsType()');
			$('.uinp-categoryName').attr('onclick','getGoodsType()');
			$('#categoryName').removeClass('uinp-no-more');
		}
		else if(check==true&&value=='3'){
			$('#categoryName').attr('onclick','getGoodsType()');
			$('.uinp-categoryName').attr('onclick','getGoodsType()');
			$('#categoryName').removeClass('uinp-no-more');
			$('#supplierName').removeClass('uinp-no-more');
			$('#supplierName').attr('onclick','selectSupplier()');
			$('.uinp-supplierName').attr('onclick','selectSupplier()');
			$('#formNo').removeClass('uinp-no-more');
			$('#formNo').removeAttr("readonly");
		}
   }	
}

var gridHandel = new GridClass();
//初始化表格
function initDatagridByFormNo(){
	gridHandel.setGridName("gridOrders");
    $("#gridOrders").datagrid({
        method:'post',
        align:'center',
        url:'',
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
            {field:'formNo',title:'单据编号',width:'140px',align:'left'},
            {field:'arrivalRate',title:'到货率',width:'140px',align:'right',
				formatter : function(value, row, index) {
					if(value!=null){
						return '<b>'+value+'</b>';
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
			{field:'receiptNum',title:'到货数量',width:'120px',align:'right',
				formatter : function(value, row, index) {
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			},
			{field:'receiptAmount',title:'到货金额',width:'140px',align:'right',
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
    if(flushFlg){
    	query();
    }
}

//初始化表格
function initDatagridBySupplier(){
	gridHandel.setGridName("gridOrders");
    $("#gridOrders").datagrid({
        method:'post',
        align:'center',
        url:'',
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
						return '<b>'+value+'</b>';
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
        url:'',
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
						return '<b>'+value+'</b>';
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
        url:'',
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
						return '<b>'+value+'</b>';
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
	var branchId = $("#branchNameOrCode").val();
	//判定发货分店是否存在
	if(branchId==""){
		messager("请先选择机构名称");
		return;
	}
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
	$("#queryForm").form('clear');
	//开始和结束时间
	$("#txtStartDate").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
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
