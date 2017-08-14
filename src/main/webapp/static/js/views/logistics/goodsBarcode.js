/**
 * Created by wxl on 2016/08/17.
 * 物流系统商品条码导出
 */
var pageSize = 50;
$(function(){
    initDataGrid();
});
var gridHandel = new GridClass();
var dg;
function initDataGrid() {
	dg = $("#dataList").datagrid({
        method: 'post',
        align: 'center',
        singleSelect: false,  //单选  false多选
        rownumbers: true,    //序号
        pagination: true,    //分页
        showFooter:true,
        pageSize : pageSize,
        height:'100%',
        columns: [[
            {field:'skuCode',title:'商品代号',width:120,align:'left'},
            {field: 'barCode', title: '辅条码', width: 120, align: 'left',},
            {field: 'boxBarCode', title: '箱条码', width: 120, align: 'left'}
        ]]
    });
    gridHandel.setDatagridHeader("center");
    query();
}

/**
 * 导出
 */
function exportData(){
	var length = $('#dataList').datagrid('getData').rows.length;
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

	$("#queryForm").attr("action",contextPath+"/logisticsGoodsBarcode/exportList");
	$("#queryForm").submit();
}

//查询
function query(){
	$("#startCount").val('');
	$("#endCount").val('');
	var formData = $("#queryForm").serializeObject();
	$("#dataList").datagrid("options").queryParams = formData;
	$("#dataList").datagrid("options").method = "post";
	$("#dataList").datagrid("options").url = contextPath+"/logisticsGoodsBarcode/queryGoodsBarcodeList";
	$("#dataList").datagrid("load");
}

//重置
function resetForm(){
	 $("#skuCode").val('');
};