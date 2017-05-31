/**
 * Created by zhaoly on 2017/5/26.
 */

var  costTitle = '开店成本(含折旧)';
$(function () {
    initGridDayAnalysis();
    $("#startTime").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
    $("#endTime").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    changeStatus();
})

//单据状态切换
function changeStatus(){
    $(".radioItem").change(function(){
        if($(this).val() === "0"){
            costTitle = '开店成本(含折旧)';
        }else{
            costTitle = '开店成本(不含折旧)';
        }
        initGridDayAnalysis();
        queryDayAnalysis();
    });
}

var gridName = "gridDayAnalysis";
var gridHandel = new GridClass();
var dg = null;
function initGridDayAnalysis() {
    gridHandel.setGridName(gridName);
    dg = $("#"+gridName).datagrid({
        align:'center',
        rownumbers:true,    //序号
        pagination:true,    //分页
        pageSize:50,
        showFooter:true,
        singleSelect:true,
        height:'100%',
        width:'100%',
        fitColumns:true,    //每列占满
        columns:[[
			{field:'dateStr',title:'日期',width:"100px",align:'left'},
			{field:'branchCode',title:'机构编码',width:"80px",align:'left'},
			{field:'branchName',title:'机构名称',width:"150px",align:'left'},
			{field:'parentName',title:'所属分公司',width:"150px",align:'left'},
			{field:'areaSize',title:'店铺面积(m*2)',width:"100px",align:'right'},
			{field:'costAvgYear',title:'费用均摊年数',width:"100px",align:'right'},
			{field:'dayFixedAvgAmount',title:costTitle,width:"150px",align:'right'},
			{field:'bepDay',title:'日盈亏平衡点',width:"100px",align:'right'},
			{field:'dayTotalAmount',title:'销售额',width:"120px",align:'right'},
			{field:'dayOrderNum',title:'客单数',width:"120px",align:'right'},
			{field:'dayAvgPrice',title:'客单价',width:"120px",align:'right'}
        ]]
    })

}

/**
 * 机构名称
 */
function selectListBranches(){
	new publicAgencyService(function(data){
        $("#branchId").val(data.branchesId);
        $("#branchCompleCode").val(data.branchCompleCode);
        $("#branchCodeName").val("["+data.branchCode+"]" + data.branchName);
    },'BF','');
}


function queryDayAnalysis() {
	//搜索需要将左侧查询条件清除
	$("#startCount").val('');
	$("#endCount").val('');
    $("#"+gridName).datagrid("options").queryParams = $("#queryForm").serializeObject();
    $("#"+gridName).datagrid("options").method = "post";
    $("#"+gridName).datagrid("options").url = contextPath+'/report/bepDayAnalysis/getList';
    $("#"+gridName).datagrid("load");
}

/**
 * 导出
 */
function exportData(){
	var length = $("#"+gridName).datagrid('getData').rows.length;
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
// 调用导出方法
function exportExcel(){
	$("#exportWin").hide();
	$("#exportWin").window("close");
	$("#queryForm").form({
		success : function(result){
			
		}
	});
	$("#queryForm").attr("action",contextPath+"/report/bepDayAnalysis/exportExcelList");
	$("#queryForm").submit();
}
