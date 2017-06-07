/**
 * Created by wxl on 2016/08/17.
 * 会员消费查询
 */
var pageSize = 50;
$(function() {
	//开始和结束时间
	toChangeDate(10);
	// 初始化列表
	initMemberOrderAllGrid();
	//选择报表类型
	changeType();
});

var flushFlg = false;
function changeType(){
	$(".radioItem").change(function(){
		flushFlg = true;
    	var a = $(this).val();
    	if (a=="memberOrderAll") {
			// 初始化列表汇总统计
			initMemberOrderAllGrid();
		} else if (a=="memberOrderList") {
			// 初始化列表消费明细
			initMemberOrderListGrid();
		}
    });
}

var gridHandel = new GridClass();
// 汇总统计
var dg;
function initMemberOrderAllGrid() {
	gridHandel.setGridName('memberOrderData');
	dg = $("#memberOrderData").datagrid({
        //title:'普通表单-用键盘操作',
        method: 'post',
        align: 'center',
        url:'',
        //url: "",
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect: false,  //单选  false多选
        rownumbers: true,    //序号
        pagination: true,    //分页
        //fitColumns:true,    //占满
        //showFooter:true,
        pageSize : pageSize,
        showFooter:true,
        height:'100%',
        columns: [[
            {field: 'phone', title: '会员手机号', width: 100, align: 'left',
				formatter:function(value,row,index){
					if(!value){
						return '<div class="ub ub-pc ufw-b">合计</div> '
					}
					return value;
				}
			},
            {field: 'orderNo', title: '订单编号', width: 160, align: 'left'},
			{field: 'saleType', title: '订单类型', width: 100, align: 'left'},
            {field: 'expCreateTime', title: '消费时间', width: 150, align: 'center'},
			{field: 'branchName', title: '消费机构', width: 100, align: 'left'},
            {field: 'amount', title: '订单金额', width: 80, align: 'right',
				formatter : function(value, row,index) {
    				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
            },
            {field: 'ticketNo', title: '小票号', width: 150, align: 'left'}
        ]],
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
//			updateFooter();
		}
    });
    if(flushFlg){
    	query();
    }
}

//消费明细
function initMemberOrderListGrid() {
	gridHandel.setGridName('memberOrderData');
	dg = $("#memberOrderData").datagrid({
        //title:'普通表单-用键盘操作',
        method: 'post',
        align: 'center',
        url:'',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect: false,  //单选  false多选
        rownumbers: true,    //序号
        pagination: true,    //分页
        //fitColumns:true,    //占满
        pageSize : pageSize,
        showFooter:true,
        columns: [[
			{field: 'phone', title: '会员手机号', width: 100, align: 'left',
				formatter:function(value,row,index){
					if(!value){
						return '<div class="ub ub-pc ufw-b">合计</div> '
					}
					return value;
				}
			},
			{field: 'orderNo', title: '订单编号', width: 160, align: 'left'},
			{field: 'branchName', title: '消费机构', width: 100, align: 'left'},
			{field: 'expCreateTime', title: '消费时间', width: 150, align: 'center'},
			{field: 'skuCode', title: '货号', width: 100, align: 'left'},
			{field: 'skuName', title: '商品名称', width: 150, align: 'left'},
			{field: 'barCode', title: '条码', width: 100, align: 'left'},
			{field: 'spec', title: '规格', width: 100, align: 'left'},
			{field: 'unit', title: '单位', width: 50, align: 'left'},
			{field: 'saleNum', title: '数量', width: 80, align: 'right',
				formatter : function(value, row,index) {
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'salePrice', title: '销售价', width: 80, align: 'right',
				formatter : function(value, row,index) {
					if (!value) {
						return '';
					}
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'originalPrice', title: '原价', width: 80, align: 'right',
				formatter : function(value, row,index) {
					if (!value) {
						return '';
					}
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'saleAmount', title: '金额', width: 80, align: 'right',
				formatter : function(value, row,index) {
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'ticketNo', title: '小票号', width: 150, align: 'left'}
		]],
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
//			updateFooter();
		}
	});
	if(flushFlg){
		query();
	}
}

//查询
function query(){
	$("#memberOrderData").datagrid("options").url =  "";
	$("#startCount").val('');
	$("#endCount").val('');
	var formData = $("#queryForm").serializeObject();
	var branchNameOrCode = $("#branchNameOrCode").val();
	if(branchNameOrCode && branchNameOrCode.indexOf("[")>=0 && branchNameOrCode.indexOf("]")>=0){
		//formData.branchNameOrCode = null;
		formData.branchNameOrCode = formData.branchNameOrCode.substring(formData.branchNameOrCode.lastIndexOf(']')+1)
	}
	$("#memberOrderData").datagrid("options").queryParams = formData;
	$("#memberOrderData").datagrid("options").method = "post";

	var radioValue = $('input:radio:checked').val();
	if (radioValue == 'memberOrderAll') {
		$("#memberOrderData").datagrid("options").url =  contextPath+"/memberOrder/report/memberOrderAll";
	} else if (radioValue == 'memberOrderList') {
		$("#memberOrderData").datagrid("options").url =  contextPath+"/memberOrder/report/memberOrderList";
	}

	$("#memberOrderData").datagrid("load");
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
function exportData(){
	var length = $('#memberOrderData').datagrid('getData').rows.length;
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

function exportExcel(){
	$("#exportWin").hide();
	$("#exportWin").window("close");
	$("#queryForm").form({
		success : function(result){
			var dataObj=eval("("+result+")");
			$_jxc.alert(dataObj.message);
		}
	});
	var formData = $("#queryForm").serializeObject();
	formData.branchNameOrCode = formData.branchNameOrCode.substring(formData.branchNameOrCode.lastIndexOf(']')+1)
	$("#branchNameOrCode").val(formData.branchNameOrCode);
	var radioValue = $('input:radio:checked').val();
	if (radioValue == 'memberOrderAll') {
		$("#queryForm").attr("action",contextPath+"/memberOrder/report/memberOrderAllExportList");
	} else if (radioValue == 'memberOrderList') {
		$("#queryForm").attr("action",contextPath+"/memberOrder/report/memberOrderListExportList");
	}
	$("#queryForm").submit();
}

//合计
function updateFooter(){
    var fields = {rmb:0,zer:0,yhk:0,zfb:0,wzf:0,yqb:0,djq:0,pdf:0,pbt:0,dxr:0,total:0};
    var argWhere = {name:'isGift',value:''}
    gridHandel.updateFooter(fields,argWhere);
}

//打印
function printReport(){
	var length = $('#memberOrderData').datagrid('getData').rows.length;
	if(length == 0){
		$_jxc.alert("无数据可打印");
		return;
	}
	$("#startCount").val('');
	$("#endCount").val('');
	var queryType=$('input:radio[name="queryType"]:checked').val();

	var formData = $("#queryForm").serializeObject();
	formData.branchNameOrCode = formData.branchNameOrCode.substring(formData.branchNameOrCode.lastIndexOf(']')+1)

	var startTime = $("#txtStartDate").val();
	var endTime = $("#txtEndDate").val();
	var branchNameOrCode= formData.branchNameOrCode;
	var buyerUserName= $("#buyerUserName").val();
	var branchId= $("#branchId").val();
	var radioValue = $('input:radio:checked').val();
	var urlTemp = "";
	if (radioValue == 'memberOrderAll') {
		urlTemp = "/memberOrder/report/memberOrderAllPrint?";
	} else if (radioValue == 'memberOrderList') {
		urlTemp = "/memberOrder/report/memberOrderListPrint?";
	}
	parent.addTabPrint("reportPrint"+branchNameOrCode,"打印",contextPath + urlTemp + "branchId=" + branchId +
			"&startTime=" + startTime + "&endTime=" + endTime + "&branchNameOrCode="+branchNameOrCode +
			"&buyerUserName=" + buyerUserName
	);
}
/**
 * 重置
 */
var resetForm = function(){
	$("#queryForm")[0].reset();
};














