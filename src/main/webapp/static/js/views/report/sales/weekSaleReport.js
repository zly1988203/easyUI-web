/**
 * Created by zhaoly on 2017/9/13.
 */
/**
 * 周销售分析报表
 */
$(function() {
    initdefaultElement();
    initDatagridWeekSale();
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

function initdefaultElement() {
    // 开始和结束时间
    $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev", 30));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    $("#skuName").prop("disabled",true);
    $("#skuCode").prop("disabled",true);
    $("#categoryType").combobox({disabled:true});
}

// 单据状态切换
var reportType = "1";
function changeStatus() {
    $(".radioItem").change(function() {
        reportType = $('input[type="radio"][name="reportType"]:checked').val();
        if(reportType == "1"){
            $("#formNo").prop("disabled",false);

            $("#categoryType").combobox({disabled:true});

        }else if(reportType == "2"){
            $("#formNo").prop("disabled",true);
            $("#formNo").val("");
            $("#skuName").prop("disabled",false);
            $("#skuCode").prop("disabled",false);
            $("#categoryType").combobox({disabled:true});

        }
        else if(reportType == '3'){
            $("#formNo").prop("disabled",true);
            $("#formNo").val("");
            $("#skuName").prop("disabled",true);
            $("#skuName").val("");
            $("#skuCode").prop("disabled",true);
            $("#skuCode").val("");
            $("#categoryType").combobox({disabled:false});
        }
        initDatagridWeekSale();
    });
}

var gridHandel = new GridClass();
var datagridID = "weekSaleReport";
var gridWeekSale = null;
//初始化表格
function initDatagridWeekSale(){
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

    if(gridWeekSale){
        $("#"+datagridId).datagrid('options').url = '';
    }
    gridHandel.setGridName(datagridID);
    gridWeekSale = $("#"+datagridId).datagrid({
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
    $("#"+datagridId).datagrid('loadData',[]);
    $("#"+datagridId).datagrid('reloadFooter',[]);
}

function onChangeSelect() {
    reportType =  $("#categoryType").combobox("getValue");
    initDatagridWeekSale();
}

// 查询
function queryForm() {
    var fromObjStr = $('#queryForm').serializeObject();
    //2.7精确查询
    fromObjStr.branchName = "";
    fromObjStr.createUserName = "";

    $("#"+datagridID).datagrid("options").method = "post";
    $("#"+datagridID).datagrid('options').url = contextPath + '/stock/leadSearch/getList';
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

    $("#queryForm").attr("action",contextPath+"/stock/leadSearch/exportList");
    $("#queryForm").submit();
}

/**
 * 重置
 */
var resetForm = function() {
    $("#queryForm").form('clear');
};