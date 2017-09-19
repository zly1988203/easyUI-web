/**
 * Created by zhaoly on 2017/9/13.
 */
/**
 * 周销售分析报表
 */
var week = 1;
var nowWeek = 1;
$(function() {
    initdefaultElement();
    // initDatagridWeekSale();
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

    initDatagridWeekSale();

    setDate(new Date());
});

function initdefaultElement() {
    $("#categoryType").combobox({disabled:true});
}

// 单据状态切换
var reportType = "1";
function changeStatus() {
    $(".radioItem").change(function() {
        reportType = $('input[type="radio"][name="reportType"]:checked').val();
        if(reportType == "1"){

            $("#categoryType").combobox({disabled:true});

        }else if(reportType == "2"){
            $("#skuName").prop("disabled",false);
            $("#skuCode").prop("disabled",false);
            $("#categoryType").combobox({disabled:true});
        }
        else if(reportType == '3'){
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
        case '5':
            defaultColumns = eval("(" + JSON.parse($("#columnsArr").val()).columns5 + ")");
            break;
        case '6':
            defaultColumns = eval("(" + JSON.parse($("#columnsArr").val()).columns6 + ")");
            break;
        default:
            return;
    }

    if(gridWeekSale){
        $("#"+datagridID).datagrid('options').url = '';
    }
    gridHandel.setGridName(datagridID);
    gridWeekSale = $("#"+datagridID).datagrid({
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
    $("#"+datagridID).datagrid('options').url = contextPath + '/report/sales/weekSaleReport/list';
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

    $("#queryForm").attr("action",contextPath+"/report/sales/weekSaleReport/exportList");
    $("#queryForm").submit();
}

/**
 * 重置
 */
var resetForm = function() {
    $("#queryForm").form('clear');
};

var currentFirstDate;
function preWeek() {
    //获取当前时间
    setDate(addDate(currentFirstDate,-7));
}

function nextWeek() {
    setDate(addDate(currentFirstDate,7));
}

var formatDate = function(date){
    var year = date.getFullYear()+'-';
    var month = (date.getMonth()+1)+'-';
    var day = date.getDate()+'';
    return new Date(year+month+day).format('yyyy-MM-dd')
};
var addDate= function(date,n){
    date.setDate(date.getDate()+n);
    return date;
};
var setDate = function(date){
    var week = date.getDay()-1;
    date = addDate(date,week*-1);
    currentFirstDate = new Date(date);

    for(var i = 0;i<7;i++){
        if(i==0){
            $("#startDate").val(formatDate(i==0 ? date : addDate(date,1))) ;
        }
        if(i == 6){
            $("#endDate").val(formatDate(i==0 ? date : addDate(date,1)));
        }
        formatDate(i==0 ? date : addDate(date,1));
    }
};




