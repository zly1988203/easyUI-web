/*******
 *
 * 现金长短款报表
 *
 * *******/

var gridName = "gridOverShortReport";

$(function () {
    initData();
    radioChange();
    initGridOverShortReport();
})

//初始化数据
function initData(){
    //开始和结束时间
    $("#txtStartDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
}

//不同类型报表
var reportType = "1";
function radioChange(){
    $(".radioItem").on("change",function(){
        reportType = $(this).val();
        if($(this).val()==="2"){
            hideCashier();
        }else{
            showCashier();
        }
        initGridOverShortReport();
        queryForm();
    })
}

function showCashier(){
    $("#cashierNameOrCode").removeAttr("disabled");
    $("#cashierIdSelect").show();
}

function hideCashier(){
    $("#cashierId").val('');
    $("#cashierNameOrCode").val('');
    $("#oldcashierName").val('');
    $("#cashierNameOrCode").prop("disabled","disabled");
    $("#cashierIdSelect").hide();
}

/**
 * 机构名称
 */
function selectBranches(){
    new publicAgencyService(function(data){
        $("#branchId").val(data.branchesId);
        $("#branchCompleCode").val(data.branchCompleCode);
        $("#branchName").val(data.branchName);
        $("#oldBranchName").val(data.branchName);
    },'BF','');
}

/**
 * 收银员下拉选
 */
function searchCashierId(){
    new publicOperatorService(function(data){
        $("#cashierId").val(data.id);
        $("#cashierNameOrCode").val("["+data.userCode+"]"+data.userName);
        $("#oldcashierName").val("["+data.userCode+"]"+data.userName);
    });

}

function setgridColumns(){
    if(reportType === "1"){
        return [[
            {field: 'branchCode', title: '机构编码', width: 80, align: 'left',
                formatter : function(value, row,index) {
                    var str = "";
                    if(row.isFooter){
                        str ='<div class="ub ub-pc">合计</div> '
                    }
                    return str;
                }
            },
            {field: 'branchName', title: '机构名称', width: 250, align: 'left'},
            {field: 'cashierCode', title: '收银员编号', width: 120, align: 'left'},
            {field: 'cashier', title: '收银员', width: 150, align: 'left'},
            {field: 'saleDate', title: '销售日期', width:200, align: 'left'},
            {field: 'saleDate', title: '销售总额(含抹零)', width: 200, align: 'right',
                formatter : function(value, row,index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'saleDate', title: '销售总额(不含抹零)', width: 200, align: 'right',
                formatter : function(value, row,index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'saleDate', title: '入袋金额', width: 100, align: 'right',
                formatter : function(value, row,index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'saleDate', title: '长短款差额', width: 160, align: 'right',
                formatter : function(value, row,index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    if(value < 0){
                        return '<b><span style="color: red;">'+parseFloat(value||0).toFixed(2)+'</span></b>';
                    }else{
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }

                }
            },
        ]]

    }else if(reportType === "2"){
       return [[
            {field: 'branchCode', title: '机构编码', width: 80, align: 'left',
                formatter : function(value, row,index) {
                    var str = "";
                    if(row.isFooter){
                        str ='<div class="ub ub-pc">合计</div> '
                    }
                    return str;
                }
            },
            {field: 'branchName', title: '机构名称', width: 250, align: 'left'},
            {field: 'saleDate', title: '销售日期', width: 200, align: 'left'},
            {field: 'saleDate', title: '销售总额(含抹零)', width: 200, align: 'right',
                formatter : function(value, row,index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'saleDate', title: '销售总额(不含抹零)', width: 200, align: 'right',
                formatter : function(value, row,index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'saleDate', title: '入袋金额', width: 100, align: 'right',
                formatter : function(value, row,index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'saleDate', title: '长短款差额', width: 200, align: 'right',
                formatter : function(value, row,index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    if(value < 0){
                        return '<b><span style="color: red;">'+parseFloat(value||0).toFixed(2)+'</span></b>';
                    }else{
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }

                }
            },
        ]]
    }else {
       return [[
            {field: 'branchCode', title: '机构编码', width: 80, align: 'left',
                formatter : function(value, row,index) {
                    var str = "";
                    if(row.isFooter){
                        str ='<div class="ub ub-pc">合计</div> '
                    }
                    return str;
                }
            },
            {field: 'branchName', title: '机构名称', width: 250, align: 'left'},
           {field: 'cashierCode', title: '收银员编号', width: 120, align: 'left'},
           {field: 'cashier', title: '收银员', width: 150, align: 'left'},
            {field: 'saleDate', title: '销售日期', width: 200, align: 'left'},
            {field: 'saleDate', title: '入袋金额', width: 100, align: 'right',
                formatter : function(value, row,index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },

        ]]
    }
}

var gridHandel = new GridClass();
function initGridOverShortReport() {
    gridHandel.setGridName(gridName);
    $('#'+gridName).datagrid({
        method: 'post',
        align: 'center',
        pageSize : 50,
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect: false,  //单选  false多选
        rownumbers: true,    //序号
        pagination: true,    //分页
        //fitColumns:true,    //占满
        showFooter:true,
        height:'100%',
        width:'100%',
        columns:setgridColumns(),
        onLoadSuccess:function (data) {
            gridHandel.setDatagridHeader("center");
            updateFooter();
        }

        })

}

// 合计
function updateFooter(){
    var fields = {snapshootStockNum:0,stocktakingNum:0,profitLossNum:0,
        snapshootCostPrice:0,costAmount:0,
        stocktakingCostAmount:0,profitLossCostAmount:0,profitLossSaleAmount:0,isGift:0, };
    var argWhere = {name:'isGift',value:0}
    gridHandel.updateFooter(fields,argWhere);
}


function queryForm() {
    var oldBranchName = $("#oldBranchName").val();
    var branchName = $("#branchName").val();
    if(oldBranchName && oldBranchName != branchName){
        $("#branchId").val('');
        $("#branchCompleCode").val('');
    }
    var oldcashierName = $("#oldcashierName").val();
    var cashierNameOrCode = $("#cashierNameOrCode").val();
    if(oldcashierName && oldcashierName != cashierNameOrCode){
        $("#cashierId").val('');
    }

    var fromObjStr = $('#queryForm').serializeObject();

    $("#"+gridName).datagrid("options").method = "post";
    $("#"+gridName).datagrid('options').url = contextPath + '';
    $("#"+gridName).datagrid('load', fromObjStr);
}

/**
 * 导出
 */
function exportData(){
    var length = $('#'+gridName).datagrid('getData').rows.length;
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

function exportExcel(){
    $("#exportWin").hide();
    $("#exportWin").window("close");
    $("#queryForm").form({
        success : function(result){
            var dataObj=eval("("+result+")");
            successTip(dataObj.message);
        }
    });
    $("#queryForm").attr("action",contextPath+"/cashDaily/report/exportList");
    $("#queryForm").submit();
}
