/**
 * Created by wxl on 2016/08/17.
 */
var pageSize = 50;
$(function() {
	// 开始和结束时间
	$("#txtStartDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
	$("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
	// 初始化列表
	initCashDailyallGrid('data');
	
	//选择报表类型
	changeType();

});

var flushFlg = false;
function changeType(){
	$(".radioItem").change(function(){
		flushFlg = true;
    	var a = $(this).val();
    	if (a=="cashier") {
			// 初始化列表按收银员汇总
			initCashDailyallGrid('cashier');
			showCashier();
		} else if (a=="branch") {
			// 初始化列表按门店汇总
			initCashDailymdGrid('branch');
			hideCashier();
		} else if (a=="date") {
			// 初始化列表按日期汇总
			initCashDailydateGrid('data');
			hideCashier();
		}
    	
    });
}

function showCashier(){
	$("#cashierNameOrCode").removeAttr("disabled");
	$("#cashierIdSelect").show();
}

function hideCashier(){
	$("#cashierId").val('');
	$("#cashierNameOrCode").val('');
	$("#cashierNameOrCode").attr("disabled","disabled");
	$("#cashierNameOrCode").attr("disabled","disabled");
	$("#cashierIdSelect").hide();
}

var gridHandel = new GridClass();
// 按收银汇总
var dg;
function initCashDailyallGrid(queryType) {
	gridHandel.setGridName("cashDaily");
	dg = $("#cashDaily").datagrid({
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
            {field: 'branchCode', title: '店铺编号', width: 100, align: 'left',
            	formatter:function(value,row,index){
					if(!value || value == '合计'){
	                    return '<div class="ub ub-pc ufw-b">合计</div> '
					}
					return row.branchCode;
				},
            },
            {field: 'branchName', title: '店铺名称', width: 220, align: 'left',},
            {field: 'cashierCode', title: '收银员编号', width: 100, align: 'left'},
            {field: 'cashier', title: '收银员', width: 100, align: 'left'},
            {field: 'rmb', title: '现金', width: 120, align: 'right',
            	formatter : function(value, row,index) {
    			return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
    		   },
            },
            /*1.0.0 先不计算抹零
             * {field: 'zer', title: '抹零', width:120, align: 'right',
				formatter : function(value, row,index) {
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },*/
            {field: 'yhk', title: '银行卡', width:120, align: 'right',
				formatter : function(value, row,index) {
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field: 'zfb', title: '支付宝', width:120, align: 'right',
				formatter : function(value, row,index) {
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field: 'wzf', title: '微支付', width:120, align: 'right',
				formatter : function(value, row,index) {
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field: 'yqb', title: '云钱包', width:120, align: 'right',
				formatter : function(value, row,index) {
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field: 'djq', title: '代金券', width:120, align: 'right',
				formatter : function(value, row,index) {
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field: 'pdf', title: '平台垫付', width:120, align: 'right',
				formatter : function(value, row,index) {
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field: 'pbt', title: '平台补贴', width:120, align: 'right',
				formatter : function(value, row,index) {
					return  '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field: 'dxr', title: '店小二', width:120, align: 'right',
				formatter : function(value, row,index) {
					return getTwoDecimalB(parseFloat(value||0.00).toFixed(2));
                },
            },
            {field: 'total', title: '合计金额', width:120, align: 'right',
				formatter : function(value, row,index) {
					return getTwoDecimalB(parseFloat(value||0.00).toFixed(2));
                },
            }
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

//门店汇总
function initCashDailymdGrid(queryType) {
	gridHandel.setGridName("cashDaily");
	dg = $("#cashDaily").datagrid({
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
           {field: 'branchCode', title: '店铺编号', width:100, align: 'left', 
        	   formatter:function(value,row,index){
					if(!value || value == '合计'){
	                    return '<div class="ub ub-pc ufw-b">合计</div> '
					}
					return row.branchCode;
				},
           	},
            {field: 'branchName', title: '店铺名称', width:220, align: 'left',},
            {field: 'rmb', title: '现金', width:120, align: 'right',
            	formatter : function(value, row,index) {
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
			},
			/*1.0.0 先不计算抹零
             * {field: 'zer', title: '抹零', width:120, align: 'right',
				formatter : function(value, row,index) {
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },*/
            {field: 'yhk', title: '银行卡', width:120, align: 'right',
				formatter : function(value, row,index) {
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field: 'zfb', title: '支付宝', width:120, align: 'right',
				formatter : function(value, row,index) {
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field: 'wzf', title: '微支付', width:120, align: 'right',
				formatter : function(value, row,index) {
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field: 'yqb', title: '云钱包', width:120, align: 'right',
				formatter : function(value, row,index) {
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field: 'djq', title: '代金券', width:120, align: 'right',
				formatter : function(value, row,index) {
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field: 'pdf', title: '平台垫付', width:120, align: 'right',
				formatter : function(value, row,index) {
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field: 'pbt', title: '平台补贴', width:120, align: 'right',
				formatter : function(value, row,index) {
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field: 'dxr', title: '店小二', width:120, align: 'right',
				formatter : function(value, row,index) {
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field: 'total', title: '合计金额', width:120, align: 'right',
				formatter : function(value, row,index) {
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            }
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
//日期汇总
function initCashDailydateGrid(queryType) {
	gridHandel.setGridName("cashDaily");
	dg =  $("#cashDaily").datagrid({
        //title:'普通表单-用键盘操作',
        method: 'post',
        align: 'center',
        url:'',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect: false,  //单选  false多选
        rownumbers: true,    //序号
        pagination: true,    //分页
        pageSize : pageSize,
        //fitColumns:true,    //占满
        //showFooter:true,
        columns: [[
            {field: 'branchCode', title: '店铺编号', width: 100, align: 'left', 
                formatter:function(value,row,index){
					if(!value || value == '合计'){
	                    return '<div class="ub ub-pc ufw-b">合计</div> '
					}
					return row.branchCode;
				},
            },
            {field: 'branchName', title: '店铺名称', width: 220, align: 'left',},
            {field:'opDate',title:'操作日期',sortable:false,width:150,align: 'left'},
			{field: 'rmb', title: '现金', width:120, align: 'right',
            	formatter : function(value, row,index) {
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
			},
			/*1.0.0 先不计算抹零
             * {field: 'zer', title: '抹零', width:120, align: 'right',
				formatter : function(value, row,index) {
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },*/
            {field: 'yhk', title: '银行卡', width:120, align: 'right',
				formatter : function(value, row,index) {
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field: 'zfb', title: '支付宝', width:120, align: 'right',
				formatter : function(value, row,index) {
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field: 'wzf', title: '微支付', width:120, align: 'right',
				formatter : function(value, row,index) {
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field: 'yqb', title: '云钱包', width:120, align: 'right',
				formatter : function(value, row,index) {
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field: 'djq', title: '代金券', width:120, align: 'right',
				formatter : function(value, row,index) {
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field: 'pdf', title: '平台垫付', width:120, align: 'right',
				formatter : function(value, row,index) {
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field: 'pbt', title: '平台补贴', width:120, align: 'right',
				formatter : function(value, row,index) {
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field: 'dxr', title: '店小二', width:120, align: 'right',
				formatter : function(value, row,index) {
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field: 'total', title: '合计金额', width:120, align: 'right',
				formatter : function(value, row,index) {
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            }
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
function exportData(){
	var length = $('#cashDaily').datagrid('getData').rows.length;
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
	$("#queryForm").form({
		success : function(result){
			var dataObj=eval("("+result+")");
			successTip(dataObj.message);
		}
	});
	$("#queryForm").attr("action",contextPath+"/cashDaily/report/exportList");
	$("#queryForm").submit();
}

//查询
function query(){
	$("#cashDaily").datagrid("options").url =  "";
	$("#startCount").val('');
	$("#endCount").val('');
	var formData = $("#queryForm").serializeObject();
	var branchNameOrCode = $("#branchNameOrCode").val();
	if(branchNameOrCode && branchNameOrCode.indexOf("[")>=0 && branchNameOrCode.indexOf("]")>=0){
		formData.branchNameOrCode = null;
	}
	
	var cashierNameOrCode = $("#cashierNameOrCode").val();
	if(cashierNameOrCode && cashierNameOrCode.indexOf("[")>=0 && cashierNameOrCode.indexOf("]")>=0){
		formData.cashierNameOrCode = null;
	}
	$("#cashDaily").datagrid("options").queryParams = formData;
	$("#cashDaily").datagrid("options").method = "post";
	$("#cashDaily").datagrid("options").url =  contextPath+"/cashDaily/report/getList";
	$("#cashDaily").datagrid("load");
	
}
//合计
function updateFooter(){
    var fields = {rmb:0,zer:0,yhk:0,zfb:0,wzf:0,yqb:0,djq:0,pdf:0,pbt:0,dxr:0,total:0};
    var argWhere = {name:'isGift',value:''}
    gridHandel.updateFooter(fields,argWhere);
}

//打印
function printReport(){
	$("#startCount").val('');
	$("#endCount").val('');
	var queryType = $("input[name='queryType']").val();
	var startTime = $("#txtStartDate").val();
	var endTime = $("#txtEndDate").val();
	var branchNameOrCode= $("#branchNameOrCode").val();
	var cashierId=$("#cashierId").val();
	parent.addTabPrint("reportPrint"+branchNameOrCode,"打印",contextPath+"/cashDaily/report/printReport?" +
			"queryType="+queryType+"&startTime="+startTime+"&endTime="+endTime+
			"&branchNameOrCode="+branchNameOrCode+"&cashierId="+cashierId);
}
/**
 * 重置
 */
var resetForm = function(){
	$("#queryForm")[0].reset();
};
