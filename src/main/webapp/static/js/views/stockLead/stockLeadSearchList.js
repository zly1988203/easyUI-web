/**
 * 领用查询
 */
$(function() {
	// 开始和结束时间
	$("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev", 30));
	$("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
	initDatagridRequire();
	// 单据状态切换
	changeStatus();
	
	//机构组件初始化
	$('#branchSelect').branchSelect({
		loadFilter:function(data){
			return data;
		}
	});
	
	//操作员组件初始化
	$('#categorySelect').categorySelect({
		loadFilter:function(data){
			return data;
		},
		//选择完成之后
		onAfterRender:function(data){
            $("#categoryCode").val(data.categoryCode);
		}
	});
});

// 单据状态切换
function changeStatus() {
	$(".radioItem").change(function() {
		var accountType = $('input[type="radio"][name="type"]:checked').val();
		if(accountType == '3'){
			$('#categoryType').attr("disabled", false);
		}else{
			$('#categoryType').attr("disabled", true);
		}
	});
}

var dg;
var gridHandel = new GridClass();
// 初始化表格
function initDatagridRequire() {
	dg=$("#leadSearchList").datagrid({
        align:'center',
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,         //占满
        showFooter:true,
		height:'100%',
		width:'100%',
		pageSize:50,
//		pageList:[[10,20,30,40,50]]
        columns:getColumns(),
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
		}
    });
	queryForm();
}

function getColumns(){
	var accountType = $('input[type="radio"][name="type"]:checked').val();
	var categoryType = $('#categoryType').val();
	var defaultColumns = [];
	
	if(accountType == '1'){		
		defaultColumns =defaultColumns.concat([
		            {field: 'branchName', title: '机构名称', width: '120px', align: 'left'},
					{field: 'formNo',title:'单号',width:'150px',align:'left'},
					{field: 'validTime', title: '领用时间', width: '120px', align: 'left',
						formatter: function (value, row, index) {
							if(!value){
								return '';
							}
							return new Date(value).format('yyyy-MM-dd hh:mm:ss');
						}	
					}
					])
	}
	
	if(accountType == '1' || accountType == '2'){
		defaultColumns =defaultColumns.concat([
		            {field: 'skuCode',title:'货号',width:'150px',align:'left'},
		            {field: 'skuName',title:'商品名称',width:'150px',align:'left'},
		            {field: 'barCode',title:'条码',width:'150px',align:'left'},
		            {field: 'unit',title:'单位',width:'80px',align:'left'},
		            {field: 'spec',title:'规格',width:'80px',align:'left'},
		            ])
	}
	
	defaultColumns =defaultColumns.concat([{field: 'firstCategory',title:'一级类别',width:'150px',align:'left'}]);
	
	if(accountType == '1' || accountType == '2' || (accountType == '3' && categoryType == '2')){		
		defaultColumns =defaultColumns.concat([{field: 'secondCategory',title:'二级类别',width:'150px',align:'left'}]);
	}
	
	defaultColumns =defaultColumns.concat([{field: 'realNum', title: '领用数量', width: '80px', align: 'right',
		formatter: function (value, row, index) {
			return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
		}
	}]);
	
	if(accountType == '1' || accountType == '2'){
		defaultColumns =defaultColumns.concat([{field: 'price', title: '成本价', width: '80px', align: 'right',
			formatter: function (value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
			}
		}]);
	}
	
	defaultColumns =defaultColumns.concat([{field: 'amount', title: '领用金额', width: '80px', align: 'right',
		formatter: function (value, row, index) {
			return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
		}
	}]);
	
	if(accountType == '1' || accountType == '2'){
		defaultColumns =defaultColumns.concat([{field: 'salePrice', title: '零售价', width: '80px', align: 'right',
			formatter: function (value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
			}
		}]);
	}
	
	defaultColumns =defaultColumns.concat([{field: 'saleAmount', title: '零售金额', width: '80px', align: 'right',
		formatter: function (value, row, index) {
			return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
		}
	}]);
	
	console.log(defaultColumns,defaultColumns.length);
	return [defaultColumns];
}

// 查询
function queryForm() {
	var fromObjStr = $('#queryForm').serializeObject();
	//2.7精确查询
	fromObjStr.branchName = "";
	fromObjStr.createUserName = "";
	
	$("#leadSearchList").datagrid("options").method = "post";
	$("#leadSearchList").datagrid('options').url = contextPath + '/stock/leadSearch/getList';
	$("#leadSearchList").datagrid('load', fromObjStr);
}

/**
 * 导出表单
 */
function exportLeadSearchList(){
	var length = $('#leadSearchList').datagrid('getData').rows.length;
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

//调用导出方法
function exportExcel(){
	$("#exportWin").hide();
	$("#exportWin").window("close");

	$("#queryForm").attr("action",contextPath+"/stock/leadSearch/exportList");
	$("#queryForm").submit(); 
}
