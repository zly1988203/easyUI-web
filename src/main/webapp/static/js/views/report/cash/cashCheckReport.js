/**
 * Created by wxl on 2016/08/17.
 */
var pageSize = 50;
$(function(){
    //开始和结束时间
    $("#txtStartDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));

    //初始化列表
    initCashReconcileGrid();
});
var gridHandel = new GridClass();
function initCashReconcileGrid() {
	gridHandel.setGridName("cashReconcile");
    $("#cashReconcile").datagrid({
        //title:'普通表单-用键盘操作',
        method: 'post',
        align: 'center',
        pageSize : pageSize,
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect: false,  //单选  false多选
        rownumbers: true,    //序号
        pagination: true,    //分页
        //fitColumns:true,    //占满
        showFooter:true,
        height:'100%',
        columns: [[
            {field: 'branchCode', title: '店铺编号', width: 100, align: 'left', 
            	formatter : function(value, row,index) {
                    var str = value;
                    if(row.isFooter){
                        str ='<div class="ub ub-pc ufw-b">合计</div> '
                    }
                    return str;
                },
            },
            {field: 'branchName', title: '店铺名称', width: 220, align: 'left',},
            {field: 'cashierCode', title: '收银员编号', width: 150, align: 'left'},
            {field: 'cashier', title: '收银员', width: 180, align: 'left'},
            {field: 'payType', title: '收款方式', width: 100, align: 'left'},
            {field: 'amount', title: '金额', width: 120, align: 'right',
				formatter : function(value, row,index) {
                    return getTwoDecimalB(value);
                },
            },
            {field: 'saleAmount', title: '销售额', width: 120, align: 'right',
				formatter : function(value, row,index) {
                    return getTwoDecimalB(value);
                },
            },
            {field: 'returnAmount', title: '退款额', width: 120, align: 'right',
				formatter : function(value, row,index) {
                    return getTwoDecimalB(value);
                },
            }
        ]],
		onLoadSuccess:function(data){
			updateFooter();
			gridHandel.setDatagridHeader("center");
		}
    });
//    query();
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

/**
 * 收银员下拉选
 */
function searchCashierId(){
	new publicOperatorService(function(data){
		$("#cashierId").val(data.id);
		$("#cashierNameOrCode").val("["+data.userCode+"]"+data.userName);
	});

}

function clearBranchCode(){
	var branchNameOrCode = $("#branchNameOrCode").val();
	
	//如果修改名称
	if(!branchNameOrCode || 
			(branchNameOrCode && branchNameOrCode.indexOf("[")<0 && branchNameOrCode.indexOf("]")<0)){
		$("#branchCode").val('');
	}
}

function clearCashierId() {
	var cashierNameOrCode = $("#cashierNameOrCode").val();

	// 如果修改名称
	if (!cashierNameOrCode || 
			(cashierNameOrCode && cashierNameOrCode.indexOf("[") < 0 && cashierNameOrCode.indexOf("]") < 0)) {
		$("#cashierId").val('');
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
	
	var length = $("#cashReconcile").datagrid('getData').total;
	if(length == 0){
		$.messager.alert('提示',"无数据可导");
		return;
	}
	if(length>10000){
		$.messager.alert('提示',"当次导出数据不可超过1万条，现已超过，请重新调整导出范围！");
		return;
	}
	
	$("#queryForm").attr("action",contextPath+"/cashCheck/report/exportList");
	$("#queryForm").submit(); 
	
}

//查询
function query(){
	var formData = $("#queryForm").serializeObject();
	var branchNameOrCode = $("#branchNameOrCode").val();
	if(branchNameOrCode && branchNameOrCode.indexOf("[")>=0 && branchNameOrCode.indexOf("]")>=0){
		formData.branchNameOrCode = null;
	}
	
	var cashierNameOrCode = $("#cashierNameOrCode").val();
	if(cashierNameOrCode && cashierNameOrCode.indexOf("[")>=0 && cashierNameOrCode.indexOf("]")>=0){
		formData.cashierNameOrCode = null;
	}
	$("#cashReconcile").datagrid("options").queryParams = formData;
	$("#cashReconcile").datagrid("options").method = "post";
	$("#cashReconcile").datagrid("options").url = contextPath+"/cashCheck/report/getList";
	$("#cashReconcile").datagrid("load");
	
}
//合计
function updateFooter(){
    var fields = {amount:0,saleAmount:0,returnAmount:0};
    var argWhere = {name:'isGift',value:''}
    gridHandel.updateFooter(fields,argWhere);
}

//打印
function printReport(){
	//var queryType = $("input[name='queryType']").val();
	var startDate = $("#txtStartDate").val();
	var endDate = $("#txtEndDate").val();
	var branchId= $("#branchId").val();
	var cashierId=$("#cashierId").val();//收银员
	/*var businessType=$("#businessType").combobox("getValue");
	var orderNo=$("#orderNo").val();*/
	var payType=$("#payType").combobox("getValue");
	/*var orderType=$("#orderType").combobox("getValue");
	var statisType=$("#statisType").combobox("getValue");;
	*/
	parent.addTabPrint("reportPrint"+branchId,"打印",contextPath+"/cashCheck/report/printReport?" +"&startDate="+startDate
			+"&endDate="+endDate+"&branchId="+branchId+"&cashierId="+cashierId+"&payType="+payType);
}
/**
 * 重置
 */
var resetForm = function(){
	$("#queryForm")[0].reset();
};
