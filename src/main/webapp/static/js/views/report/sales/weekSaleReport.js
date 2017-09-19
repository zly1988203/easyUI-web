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

    initWeek();

});

function initWeek() {
    //获取当前时间
    var currentDate = dateUtil.getCurrentDate();
    week = getWeekNumber(currentDate.getFullYear(),currentDate.getMonth()+1,currentDate.getDate());
    nowWeek = week;
    var arr = yugi(currentDate.getFullYear(), nowWeek);
    $("#startDate").val(arr[0]);
    $("#endDate").val(arr[6]);
}

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

    debugger;
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

function preWeek() {
    //获取当前时间
    if(week == 1){
        $_jxc.alert("当前为第一周");
        return;
    }
    week--;
    var currentDate = dateUtil.getCurrentDate();
    var arr = yugi(currentDate.getFullYear(), week);
    $("#startDate").val(arr[0]);
    $("#endDate").val(arr[6]);

}

function nextWeek() {
    if(week == nowWeek){
        $_jxc.alert("当前为最近一周");
        return;
    }

    week++;
    var currentDate = dateUtil.getCurrentDate();
    var arr = yugi(currentDate.getFullYear(), week);
    $("#startDate").val(arr[0]);
    $("#endDate").val(arr[6]);
}

var yugi = function(year, index) {
    var d = new Date(year, 0, 1);
    while (d.getDay() != 1) {
        d.setDate(d.getDate() + 1);
    }
    var to = new Date(year + 1, 0, 1);
    var i = 1;
    var arr = [];
    for (var from = d; from < to;) {
        if (i == index) {
            arr.push(from.getFullYear() + "-" + (from.getMonth() + 1) + "-" + from.getDate() );
            // arr.push(from.getFullYear() + "年" + (from.getMonth() + 1) + "月" + (from.getDate()+6) + "日");
        }
        var j = 6;
        while (j > 0) {
            from.setDate(from.getDate() + 1);
            if (i == index) {
                arr.push(from.getFullYear() + "-" + (from.getMonth() + 1) + "-" + from.getDate());
            }
            j--;
        }
        if (i == index) {
            return arr;
        }
        from.setDate(from.getDate() + 1);
        i++;
    }
}


function isLeapYear(year) {
    return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
}
 /**
 10  * 获取某一年份的某一月份的天数
 11  *
 12  * @param {Number} year
 13  * @param {Number} month
 14
  */
function getMonthDays(year, month) {
         return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (isLeapYear(year) ? 29 : 28);
}

function getWeekNumber(y, m, d) {
    var now = new Date(y, m - 1, d),
                 year = now.getFullYear(),
                 month = now.getMonth(),
                 days = now.getDate();
         //那一天是那一年中的第多少天
         for (var i = 0; i < month; i++) {
                 days += getMonthDays(year, i);
             }

         //那一年第一天是星期几
         var yearFirstDay = new Date(year, 0, 1).getDay() || 7;

         var week = null;
        if (yearFirstDay == 1) {
                 week = Math.ceil(days / yearFirstDay);
             } else {
                 days -= (7 - yearFirstDay + 1);
                 week = Math.ceil(days / 7) + 1;
             }

         return week;
     }
