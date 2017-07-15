/**
 * Created by wxl on 2016/08/17.
 * 商品销售汇总分析
 */
$(function() {
	//选择报表类型
	initGoodsCategorty();
	
	//机构选择
	$('#branchSelects').branchSelect();
	
	$('input[name="reportType"]').on('change',function(){
		initGoodsCategorty();
	})
});


//构造grid columns
function getColumns(){
	//报表类型_repType 1(大类) 2(中类) 3(小类)
	var _repType = $('input[name="reportType"]:checked').val();
	var defaultCoumns = [
	   {field: 'branchCode', title: '机构编码', width:120, align: 'left'},
       {field: 'branchName', title: '机构名称', width:120, align: 'left'}
	];
	
	//大类
	if(_repType == 1){
		defaultCoumns = defaultCoumns.concat([
			{field: 'bigCateCode', title: '大类编号', width:120, align: 'left'},
			{field: 'bigCateName', title: '大类名称', width:120, align: 'left'}
		 ]);
	}else{
		defaultCoumns = defaultCoumns.concat([
  			{field: 'bigCateName', title: '大类', width:120, align: 'left'}
  		 ]);
	}
	
	//中类
	if(_repType == 2){
		defaultCoumns = defaultCoumns.concat([
			{field: 'centerCateCode', title: '中类编号', width:120, align: 'left'},
			{field: 'centerCateName', title: '中类名称', width:120, align: 'left'}
		]);
	}
	
	//小类
	if(_repType == 3){
		defaultCoumns = defaultCoumns.concat([
			{field: 'centerCateName', title: '中类', width:120, align: 'left'},
  			{field: 'smallCateCode', title: '小类编号', width:120, align: 'left'},
			{field: 'smallCateName', title: '小类名称', width:120, align: 'left'}
  		]);
	}
	
	defaultCoumns = defaultCoumns.concat([
		{field: 'saleNum', title: '销售数量', width:120, align: 'left'},
		{field: 'saleAmount', title: '销售金额', width:120, align: 'left'},
		{field: 'saleRate', title: '销售占比', width:120, align: 'left'},
		{field: 'margin', title: '毛利', width:65, align: 'left'},
		{field: 'rate', title: '毛利率', width:65, align: 'left'},
		{field: 'marginrate', title: '毛利占比', width:120, align: 'left'},
		{field: 'stockRate', title: '库存周转率', width:120, align: 'left'},        
		{field: 'stockDate', title: '库存周转天数', width:80, align: 'left'}
	]);
	
	return [defaultCoumns];
}

var gridHandel = new GridClass();
var gridName = "goodsCategoryReport";
var dg;
/**
 * 初始化表格按  商品
 * @param queryType
 */
function initGoodsCategorty() {
	gridHandel.setGridName(gridName);
	if(dg){
		$("#"+gridName).datagrid('options').url = '';
	}
    dg =  $("#"+gridName).datagrid({
        //title:'普通表单-用键盘操作',
        method: 'post',
        align: 'center',
        singleSelect: false,  //单选  false多选
        rownumbers: true,    //序号
        pagination: true,    //分页
        showFooter:true,
        pageSize : 50,
        pageList : [20,50,100],//可以设置每页记录条数的列表
        showFooter:true,
        height:'100%',
        columns: getColumns(),
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
			//updateFooter();
		}
    });
    
    $("#"+gridName).datagrid('loadData',[]);
    $("#"+gridName).datagrid('reloadFooter',[]);
}

/**
 * 查询
 */
function purchaseTotalCx(){
	var startDate = $("#txtStartDate").val();
	var endDate = $("#txtEndDate").val();
	var branchName = $("#branchName").val();
	if(!(startDate && endDate)){
		$_jxc.alert('日期不能为空');
		return ;
	}
	$("#startCount").attr("value",null);
	$("#endCount").attr("value",null);
	var formData = $("#queryForm").serializeObject();
	$("#"+gridName).datagrid("options").queryParams = formData;
	$("#"+gridName).datagrid("options").method = "post";
	$("#"+gridName).datagrid("options").url =  contextPath+"/report/sale/categorySaleReport/reportListPage";
	$("#"+gridName).datagrid("load");
}

/**
 * 导出
 */
function exportData(){
	var length = $('#'+gridName).datagrid('getData').total;
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
 * 导出
 */
function exportExcel(){
	var startDate = $("#txtStartDate").val();
	var endDate = $("#txtEndDate").val();
	var branchName = $("#branchName").val();
	var branchCompleCode = $("#branchCompleCode").val();
	var categoryType=$('input[name="searchType"]:checked ').val();
	if(!(startDate && endDate)){
		$_jxc.alert('日期不能为空');
		return ;
	}
	var length = $("#"+gridName).datagrid('getData').total;
	if(length == 0){
		$_jxc.alert("没有数据");
		return;
	}
	if(length>10000){
		$_jxc.alert("当次导出数据不可超过1万条，现已超过，请重新调整导出范围！");
		return;
	}
	$("#queryForm").attr("action",contextPath+'/report/sale/categorySaleReport/exportExcel');
	$("#queryForm").submit();	
}
/**
 * 机构列表下拉选
 */
function searchBranch (){
	new publicAgencyService(function(data){
		$("#branchId").val(data.branchesId);
		$("#branchCompleCode").val(data.branchCompleCode);
		$("#branchName").val("["+data.branchCode+"]"+data.branchName);
	},"","");
}

/**
 * 商品类别
 */
function searchCategory(){
	var categoryType=$('input[name="searchType"]:checked ').val();
	var param = {
		categoryType:categoryType
	}
	new publicCategoryService(function(data){
		console.info(data);
//		$("#categoryCode").val(data.categoryCode);
		$("#categoryCode").val(data.categoryName);
	},param);
}
/**
 * 重置
 */
var resetForm = function(){
	location.href=contextPath+"/report/purchase/total";
};