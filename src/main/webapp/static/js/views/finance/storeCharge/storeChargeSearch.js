/**
 * Created by zhaoly on 2017/5/25.
 */

var storeStatus = "total";
$(function () {
    initGridChargeSearchList();
    $("#month").val(dateUtil.getPreMonthDate().format("yyyy-MM"));
    changeStoreStatus();
})

function changeStoreStatus() {
    $(".radioItem").change(function () {
        storeStatus = $(this).val();
        $("#"+gridName).datagrid("loadData",[]);
        $('#'+gridName).datagrid('reloadFooter',[]);
        $("#"+gridName).datagrid("options").url = "";
        initGridChargeSearchList();
    });
}

var gridName = "gridStoreChargeSearch";
var gridHandel = new GridClass();
var dg;
var url = contextPath+'/finance/storeChargeSearch/reportListPage';
function initGridChargeSearchList() {
    gridHandel.setGridName(gridName);
    dg=$("#"+gridName).datagrid({
        align:'center',
        rownumbers:true,    //序号
        pagination:true,    //分页
        pageSize:50,
        showFooter:true,
        height:'100%',
        width:'100%',
        singleSelect:true,
        columns:getGridcolumns()
    })
}

function getGridcolumns(){
    if(storeStatus == "total"){
        return [[
            {field:'branchCode',title:'机构编码',width:80,align:'left',
                formatter:function(value,row,index){
                    if(typeof(value) === "undefined" ){
                        return '<b>合计</b>';
                    }
                    return value;
                },
            },
            {field:'branchName',title:'机构名称',width:180,align:'left'},
            {field:'parentName',title:'所属分公司',width:180,align:'left'},
            {field:'month',title:'月份',width:110,align:'left',
                formatter : function(value, row, index) {
                    var month = value+"";
                    return month.substr(0,4)+"-"+month.substr(4,5);
                },
            },
            {field:'amount',title:'金额',width:110,align:'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
        ]]
    }else{
        return [[
            {field:'formNo',title:'单号',width:180,align:'left',
                formatter:function(value,row,index){
                    if(typeof(value) === "undefined" ){
                        return '<b>合计</b>';
                    }
                    return value;
                },
            },
            {field:'branchCode',title:'机构编码',width:80,align:'left'},
            {field:'branchName',title:'机构名称',width:180,align:'left'},
            {field:'parentName',title:'所属分公司',width:180,align:'left'},
            {field:'month',title:'月份',width:110,align:'left',
                formatter : function(value, row, index) {
                    var month = value+"";
                    return month.substr(0,4)+"-"+month.substr(4,5);
                },
            },
            {field:'costTypeName',title:'费用项目',width:180,align:'left'},
            {field:'amount',title:'金额',width:110,align:'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field:'remark',title:'备注',width:180,align:'left'},
        ]]
    }
}

/**
 * 机构名称
 */
function selectListBranches(){
	new publicAgencyService(function(data){
        $("#branchId").val(data.branchesId);
        $("#branchCompleCode").val(data.branchCompleCode);
        $("#branchName").val("["+data.branchCode+"]" + data.branchName);
    },'BF','');
}

function queryCharge() {
	$("#"+gridName).datagrid("options").queryParams = $("#queryForm").serializeObject();
    $("#"+gridName).datagrid("options").method = "POST";
    $("#"+gridName).datagrid("options").url = contextPath+'/finance/storeChargeSearch/reportListPage';
    $("#"+gridName).datagrid("load");
}

function exportData(){
    var length = dg.datagrid('getData').rows.length;
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
