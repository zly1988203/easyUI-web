$(function(){
	//开始和结束时间
    $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    initDatagridRequire();
});
var gridHandel = new GridClass();
//初始化表格
function initDatagridRequire(){
    $("#goodsOutInDetail").datagrid({
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
			{field:'branchCode',title:'店铺编号',width:'140px',align:'left'},
            {field:'branchName',title:'店铺名称',width:'140px',align:'left'},
            {field:'formNo',title: '单号', width: '100px', align: 'left'},
            {field:'skuCode',title: '货号', width: '100px', align: 'left'},
            {field:'barCode',title: '条码', width: '100px', align: 'left'},
			{field: 'skuName', title: '商品名称', width: '200px', align: 'left'},
			{field: 'spec', title: '规格', width: '200px', align: 'left'},
			{field: 'unit', title: '单位', width: '200px', align: 'left'},
			 {field: 'pricingType', title: '计价方式', width: '130px', align: 'left'},
			{field: 'categoryCode', title: '类别编码', width: '80px', align: 'right'},
			{field: 'categoryName', title: '类别名称', width: '80px', align: 'right'},
			{field: 'createTime', title: '日期时间', width: '200px', align: 'left'},
            {field: 'outNum', title: '出库数量', width: '200px', align: 'left'},
            {field: 'inNum', title: '入库数量', width: '200px', align: 'left'},
            {field: 'formType', title: '出入库类型', width: '130px', align: 'left'},
            {field: 'costPrice', title: '进价', width: '150px', align: 'center'},
            {field: 'costAmount', title: '进价金额', width: '130px', align: 'left'},
            {field: 'salePrice', title: '售价', width: '130px', align: 'left'},
            {field: 'saleAmount', title: '售价金额', width: '130px', align: 'left'},
            {field: 'supplierName', title: '供应商名称', width: '130px', align: 'left'}
        ]],
        
    });
   // queryForm();
}
//查询入库单
function queryForm(){
	var fromObjStr = $('#queryForm').serializeObject();
	$("#goodsOutInDetail").datagrid("options").method = "post";
	$("#goodsOutInDetail").datagrid('options').url = contextPath + '/goods/goodsDetail/getGoodsOutInDetailList';
	$("#goodsOutInDetail").datagrid('load', fromObjStr);
}

/**
 * 导出
 */
function exportExcel(){
	var length = $("#goodsOutInDetail").datagrid('getData').total;
	if(length == 0){
		$.messager.alert('提示',"没有数据");
		return;
	}
	if(length>10000){
		$.messager.alert("当次导出数据不可超过1万条，现已超过，请重新调整导出范围！");
		return;
	}
	var fromObjStr = $('#queryForm').serializeObject();
	console.log(fromObjStr);
	$("#queryForm").form({
		success : function(data){
			if(data==null){
				$.messager.alert('提示',"导出数据成功！");
			}else{
				$.messager.alert('提示',JSON.parse(data).message);
			}
		}
	});
	$("#queryForm").attr("action",contextPath+"/goods/goodsDetail/exportList?"+fromObjStr);
	$("#queryForm").submit();
}

/**
 * 机构名称
 */
function searchBranch(){
	new publicAgencyService(function(data){
		$("#branchId").val(data.branchesId);
		$("#branchName").val(data.branchName);
	},'BF','');
}
/**
 * 重置
 */
var resetForm = function() {
	 $("#queryForm").form('clear');
};