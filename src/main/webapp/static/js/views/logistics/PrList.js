/**
 * Created by huangj02 on 2016/8/9.
 * 物流供应商退货单导出
 */
$(function(){
	//初始化默认条件
    initConditionParams();
    initDatagridOrders();
    //单据状态切换
    changeStatus();
});

//单据状态切换
function changeStatus(){
	$(".radioItem").change(function(){
		query();
    });
}

//初始化默认条件
function initConditionParams(){
	$("#txtStartDate").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
	$("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
}

var gridHandel = new GridClass();
//初始化表格
var dg;
function initDatagridOrders(){
    dg = $("#gridOrders").datagrid({
        //title:'普通表单-用键盘操作',
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
            {field:'check',checkbox:true},
            {field:'formNo',title:'单据编号',width:'140px',align:'left',formatter:function(value,row,index){
            	var strHtml = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'物流供应商退货明细\',\''+contextPath+'/LogisticsPurchaseForm/purchaseList?formId='+row.id+'\')">' + value + '</a>';
            	return strHtml;
            }},
            {field:'statusPrint',title:'审核状态',width:'100px',align:'center'},
            {field: 'downloadNum', title: '导出次数', width: '60px', align: 'center'},
            {field:'branchName',title:'退货机构',width:'140px',align:'left'},
            {field:'supplierCode',title:'供应商编号',width:'200px',align:'left'},
            {field:'supplierName',title:'供应商名称',width:'140px',align:'left'},
            {field:'amount',title:'总金额',width:'120px',align:'right',
                formatter : function(value, row, index) {
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field:'refFormNo',title:'引用单号',width:'200px',align:'left'},
            {field:'updateUserName',title:'操作员',width:'130px',align:'left'},
            {field:'validTime',title:'审核时间',width:'150px',align:'center', formatter: function (value, row, index) {
                if (value) {
                	return new Date(value).format('yyyy-MM-dd hh:mm');
                }
                return "";
            }},
            {field:'validUserName',title:'审核人',width:'130px',align:'left'},
            {field:'remark',title:'备注',width:'200px',align:'left'}
        ]],
	onLoadSuccess : function() {
		gridHandel.setDatagridHeader("center");
	}
    });
    query();
    if(hasPurchasePrice==false){
        priceGrantUtil.grantPurchasePrice("gridOrders",["amount"])
    }
}


function query(){
//	$("#gridOrders").datagrid("options").queryParams = $("#queryForm").serializeObject();
//	$("#gridOrders").datagrid("options").method = "post";
//	$("#gridOrders").datagrid("options").url = contextPath+'/LogisticsPurchaseForm/listData';
//	$("#gridOrders").datagrid("load");
    $("#startCount").val('');
    $("#endCount").val('');
    var fromObjStr = $('#queryForm').serializeObject();
    $("#gridOrders").datagrid("options").method = "post";
    $("#gridOrders").datagrid('options').url = contextPath+'/LogisticsPurchaseForm/listData';
    $("#gridOrders").datagrid('load', fromObjStr);
}

function selectSupplier(){
	new publicSupplierService(function(data){
//		$("#supplierId").val(data.id);
		$("#supplierName").val("["+data.supplierCode+"]"+data.supplierName);
	});
}
function selectOperator(){
	new publicOperatorService(function(data){
//		$("#operateUserId").val(data.id);
		$("#operateUserName").val(data.userName);
//		$("#operateUserName").val("["+data.userCode+"]"+data.userName);
	});
}
function selectBranch(){
	new publicBranchService(function(data){
//		$("#branchId").val(data.branchesId);
		$("#branchName").val("["+data.branchCode+"]"+data.branchName);
	},0);
}
/**
 * 重置
 */
function resetForm(){
	 $("#queryForm").form('clear');
};

/**
 * 导出
 */
function exportForms(){
    var length = $('#gridOrders').datagrid('getData').rows.length;
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

function exportExcel(){
    $("#exportWin").hide();
    $("#exportWin").window("close");
    var formData = $("#queryForm").serializeObject();
    formData.startTime = formData.startTime + " 00:00";
    formData.endTime = formData.endTime + " 00:00";
    $("#queryForm").attr("action",contextPath+'/LogisticsPurchaseForm/listDataExport')
    $("#queryForm").submit();
}

function exportDataList(){
    var rows = $("#gridOrders").datagrid('getSelections');
    if (rows.length == 0) {
        $_jxc.alert("请选择要导出的数据!");
        return;
    }
    var idsTemp = [];
    for(var i=0; i<rows.length; i++){
        idsTemp.push(rows[i].id);
    }
    var ids = idsTemp.join(',');
    window.location.href = contextPath + '/LogisticsPurchaseForm/exportList?formId='+ids + '&type=PR';
}