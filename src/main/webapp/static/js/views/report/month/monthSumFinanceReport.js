$(function(){
	initDatagridYueJXC();
    //机构选择初始化
	$('#branchComponent').branchSelect({
		//ajax参数
		param:{
			scope:1
		},
		//数据过滤
		loadFilter:function(data){
			data.isContainChildren = data.allBranch;
			return data;
		}
	});
	
});

function updateWdatePicker(){
	   WdatePicker({
       	dateFmt:'yyyy-MM',
       	maxDate:'%y-%M',
         onpicked:function(dp){
             $("input:radio[name='dateradio']").attr("checked",false);
         }
    })
}

var datagridId = "yueJXCList"

var gridHandel = new GridClass();
var gridHandelDetail = new GridClass();

var gridYueJXCList;

//初始化表格
function initDatagridYueJXC(){
	var reportType = $('input[type="radio"][name="reportType"]:checked').val();
	var defaultColumns;

	switch (reportType) {
		case '1':
			defaultColumns = eval("(" + JSON.parse($("#columnsArr").val()).columns1 + ")");
			break;
		case '2':
			defaultColumns = eval("(" + JSON.parse($("#columnsArr").val()).columns2 + ")");
			break;
		case '3':
			defaultColumns = eval("(" + JSON.parse($("#columnsArr").val()).columns3 + ")");
			break;
		case '4':
			defaultColumns = eval("(" + JSON.parse($("#columnsArr").val()).columns4 + ")");
			break;
		default:
			return;
	}

	if(gridYueJXCList){
		$("#"+datagridId).datagrid('options').url = '';
	}
	gridYueJXCList = $("#"+datagridId).datagrid({
		method:'post',
		align:'center',
		singleSelect:false,  //单选  false多选
		rownumbers:true,    //序号
		pagination:true,    //分页
		showFooter:true,
		fitColumns:false,    //每列占满
		height:'100%',
		width:'100%',
		pageSize:50,
		columns:[defaultColumns], 
		onLoadSuccess:function(data){
			/* if($("#createBranchId").val()&&data.total<=0)
				$_jxc.alert("该机构可能未月结,请先月结!"); */
		}
	}).datagrid("columnMoving");
    $("#"+datagridId).datagrid('loadData',[]);
    $("#"+datagridId).datagrid('reloadFooter',[]);
}

//查询
function queryForm(){
	if($("#branchName").val()=="" && $("#skuCodeOrBarCode").val()=="" ){
        $_jxc.alert("请选择机构或输入条码");
        return;
    } 
	var fromObjStr = $('#queryForm').serializeObject();
	$("#"+datagridId).datagrid("options").method = "post";
	$("#"+datagridId).datagrid('options').url = contextPath + '/report/month/finance/list';
	$("#"+datagridId).datagrid('load', fromObjStr);
}


/**
 * 类别选择
 */
function searchCategory(){
	new publicCategoryService(function(data){
		$("#categoryCode").val(data.categoryCode);
		$("#categoryNameCode").val("["+data.categoryCode+"]"+data.categoryName);
	});
}

/**
 * 重置
 */
var resetForm = function() {
	 $("#queryForm").form('clear');
};

var dg;
/**
 * 导出
 */
function exportData(){
	dg = gridYueJXCList;
	var length = gridYueJXCList.datagrid('getData').total;
	if(length == 0){
		$_jxc.alert("无数据可导");
		return;
	}
	$('#exportWin').window({
		top:($(window).height()-300) * 0.5,   
	    left:($(window).width()-500) * 0.5
	});
	$("#exportWin").show();
	$("#totalRows").html(gridYueJXCList.datagrid('getData').total);
	$("#exportWin").window("open");
}

/**
 * 导出
 */
function exportExcel(){
	var length = gridYueJXCList.datagrid('getData').total;
	if(length == 0){
		$_jxc.alert("没有数据");
		return;
	}

	$("#queryForm").attr("action",contextPath+"/report/month/finance/export");
	
	$("#queryForm").submit();
}

var printReport = function(){
	var length = gridYueJXCList.datagrid('getData').total;
	if(length == 0){
		$_jxc.alert("没有数据");
		return;
	}
	var queryParams =  urlEncode($("#queryForm").serializeObject());
	parent.addTabPrint("reportPrint"+new Date().getTime(),"打印",contextPath+"/report/month/print?params="+queryParams);
}


var urlEncode = function(param, key, encode) {
	if (param == null)
		return '';
	var paramStr = '';
	var t = typeof (param);
	if (t == 'string' || t == 'number' || t == 'boolean') {
		paramStr += '&'
				+ key
				+ '='
				+ ((encode == null || encode) ? encodeURIComponent(param)
						: param);
	} else {
		for ( var i in param) {
			var k = key == null ? i
					: key
							+ (param instanceof Array ? '[' + i + ']'
									: '.' + i);
			paramStr += urlEncode(param[i], k, encode);
		}
	}
	return paramStr;
};