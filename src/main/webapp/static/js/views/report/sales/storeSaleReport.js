/**
 * Created by zhaoly on 2017/9/13.
 */
/**
 * 门店销售汇总分析报表
 */
$(function() {
    initDatagridStoreSale();
    // 单据状态切换
    changeStatus();

    //机构组件初始化
    $('#branchSelect').branchSelect({
        loadFilter:function(data){
            return data;
        }
    });
});

// 单据状态切换
var reportType = "1";
function changeStatus() {
    $(".radioItem").change(function() {
        initDatagridStoreSale();
    });
}

var gridHandel = new GridClass();
var datagridID = "gridStoreSale";
var gridStoreSale = null;
//初始化表格
function initDatagridStoreSale(){
    reportType = $('input[type="radio"][name="reportType"]:checked').val();
    var defaultColumns;
    switch (reportType) {
        case '1':
            defaultColumns = eval("(" + JSON.parse($("#columnsArr").val()).columns1 + ")");
            break;
        case '2':
            defaultColumns = eval("(" + JSON.parse($("#columnsArr").val()).columns2 + ")");
            break;
        default:
            return;
    }

    if(gridStoreSale){
        $("#"+datagridID).datagrid('options').url = '';
    }
    gridHandel.setGridName(datagridID);
    gridStoreSale = $("#"+datagridID).datagrid({
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
            gridHandel.setDatagridHeader("center");
        }
    });
    $("#"+datagridID).datagrid('loadData',[]);
    $("#"+datagridID).datagrid('reloadFooter',[]);
}

// 查询
function queryForm() {
    var fromObjStr = $('#queryForm').serializeObject();
    //2.7精确查询
    fromObjStr.branchName = "";
    fromObjStr.createUserName = "";

    $("#"+datagridID).datagrid("options").method = "post";
    $("#"+datagridID).datagrid('options').url = contextPath + '/report/sales/storeSaleReport/list';
    $("#"+datagridID).datagrid('load', fromObjStr);
}

/**
 * 导出表单
 */
function exportLeadSearchList(){
    var length = $('#'+datagridID).datagrid('getData').rows.length;
    if(length == 0){
        $_jxc.alert("无数据可导");
        return;
    }
    $('#exportWin').window({
        top:($(window).height()-300) * 0.5,
        left:($(window).width()-500) * 0.5
    });
    $("#exportWin").show();
    $("#totalRows").html($('#'+datagridID).datagrid('getData').total);
    $("#exportWin").window("open");
}

//调用导出方法
function exportExcel(){
    $("#exportWin").hide();
    $("#exportWin").window("close");

    $("#queryForm").attr("action",contextPath+"/report/sales/storeSaleReport/exportList");
    $("#queryForm").submit();
}

/**
 * 重置
 */
var resetForm = function() {
    $("#queryForm").form('clear');
};