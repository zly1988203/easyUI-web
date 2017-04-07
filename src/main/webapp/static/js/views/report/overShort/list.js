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
	$("#branchName").val(sessionBranchCodeName);
	$("#branchCompleCode").val(sessionBranchCompleCode);
	$("#branchId").val(sessionBranchId);
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
    })
}

function showCashier(){
    $("#userNameOrCode").removeAttr("disabled");
    $("#userIdSelect").show();
    $('#cashierIdSelect').prop('hidden',false);
}

function hideCashier(){
    $("#userId").val('');
    $("#userNameOrCode").val('');
    $("#oldUserName").val('');
    $("#userNameOrCode").prop("disabled","disabled");
    $('#cashierIdSelect').prop('hidden',true);
}

/**
 * 机构名称
 */
function selectBranches(){
    new publicAgencyService(function(data){
        $("#branchId").val(data.branchesId);
        $("#branchCompleCode").val(data.branchCompleCode);
        $("#branchName").val("["+data.branchCode+"]"+data.branchName);
        $("#oldBranchName").val("["+data.branchCode+"]"+data.branchName);
    },'','');
}

/**
 * 收银员下拉选
 */
function searchCashierId(){
    new publicOperatorService(function(data){
        $("#userId").val(data.id);
        $("#userNameOrCode").val("["+data.userCode+"]"+data.userName);
        $("#oldUserName").val("["+data.userCode+"]"+data.userName);
    });

}

function setgridColumns(){
    if(reportType === "1"){
        return [[
            {field: 'branchCode', title: '机构编码', width: 80, align: 'left',
                formatter : function(value, row,index) {
                    if(row.isFooter){
                        return '<div class="ub ub-pc">合计</div> '
                    }
                    return value;
                }
            },
            {field: 'branchName', title: '机构名称', width: 250, align: 'left'},
            {field: 'userCode', title: '收银员编号', width: 120, align: 'left'},
            {field: 'userName', title: '收银员', width: 150, align: 'left'},
            {field: 'saleTime', title: '销售日期', width:200, align: 'left'},
            {field: 'saleAmount', title: '销售总额', width: 200, align: 'right',
                formatter : function(value, row,index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'payInAmount', title: '入袋金额', width: 100, align: 'right',
                formatter : function(value, row,index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'difference', title: '长短款差额', width: 160, align: 'right',
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
                    if(row.isFooter){
                        return '<div class="ub ub-pc">合计</div> '
                    }
                    return value;
                }
            },
            {field: 'branchName', title: '机构名称', width: 250, align: 'left'},
            {field: 'saleTime', title: '销售日期', width: 200, align: 'left'},
            {field: 'saleAmount', title: '销售总额', width: 200, align: 'right',
                formatter : function(value, row,index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'payInAmount', title: '入袋金额', width: 100, align: 'right',
                formatter : function(value, row,index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'difference', title: '长短款差额', width: 200, align: 'right',
                formatter : function(value, row,index) {
                    if(row.isFooter){
                        if(value < 0){
                        	return '<b><span style="color: red;">'+parseFloat(value||0).toFixed(2)+'</span></b>';
                        }else{
                        	return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                        }
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
                    if(row.isFooter){
                        return '<div class="ub ub-pc">合计</div> '
                    }
                    return value;
                }
            },
            {field: 'branchName', title: '机构名称', width: 250, align: 'left'},
           {field: 'userCode', title: '收银员编号', width: 120, align: 'left'},
           {field: 'userName', title: '收银员', width: 150, align: 'left'},
            {field: 'saleTime', title: '销售日期', width: 200, align: 'left'},
            {field: 'payInAmount', title: '入袋金额', width: 100, align: 'right',
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
    dg = $('#'+gridName).datagrid({
        method: 'post',
        align: 'center',
        pageSize : 50,
        url:"",
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
        }

        })
    gridHandel.setLoadData([]);
    updateFooter();
}

//合计
function updateFooter(){
    var fields = {saleAmount:0,difference:0,payInAmount:0, };
    var argWhere = {name:'isGift',value:""}
    gridHandel.updateFooter(fields,argWhere);
}

function queryForm() {
    var oldBranchName = $("#oldBranchName").val();
    var branchName = $("#branchName").val();
    if(oldBranchName && oldBranchName != branchName){
        $("#branchId").val('');
        $("#branchCompleCode").val('');
    }
    var oldUserName = $("#oldUserName").val();
    var userNameOrCode = $("#userNameOrCode").val();
    if(oldUserName && oldUserName != userNameOrCode){
        $("#userId").val('');
    }

    var fromObjStr = $('#queryForm').serializeObject();

    $("#"+gridName).datagrid("options").method = "post";
    $("#"+gridName).datagrid('options').url = contextPath + '/report/overShort/getReportList';
    $("#"+gridName).datagrid('load', fromObjStr);
}

var dg;
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
    $("#queryForm").attr("action",contextPath+"/report/overShort/exportReportList");
    $("#queryForm").submit();
}
