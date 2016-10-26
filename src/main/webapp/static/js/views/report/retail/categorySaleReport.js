$(function(){
	//开始和结束时间
    $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    initDatagridRequire();
});
var gridHandel = new GridClass();
//初始化表格
function initDatagridRequire(){
    $("#storeSale").datagrid({
        method:'post',
        align:'center',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
        showFooter:true,
		height:'100%',
		width:'100%',
        columns:[[
			{field:'check',checkbox:true},
            {field:'branchName',title:'机构名称',width:'200px',align:'left'},
            {field:'skuCode',title: '所在城市', width: '200px', align: 'left'},
			{field:'categoryCode', title: '类别编号', width: '200px', align: 'left'},
            {field:'categoryName', title: '类别名称', width: '80px', align: 'right'},
            {field:'saleAmount', title: '销售金额', width: '130px', align: 'left'},
            {field:'saleNum', title: '销售占比', width: '130px', align: 'left'},
      ]],
        
    });
    queryForm();
}
//查询入库单
function queryForm(){
	var fromObjStr = $('#queryForm').serializeObject();
	$("#storeSale").datagrid("options").method = "post";
	$("#storeSale").datagrid('options').url = contextPath + '/categorySale/report/getCategorySaleList';
	$("#storeSale").datagrid('load', fromObjStr);
}

/**
 * 机构名称
 */
function selectBranches(){
	new publicAgencyService(function(data){
		$("#branchId").val(data.branchesId);
		$("#branchName").val(data.branchName);
	},'DO','');
}

/**
 * 重置
 */
var resetForm = function() {
	 $("#queryForm").form('clear');
};