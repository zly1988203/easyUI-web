$(function () {

    initConditionParams();
    initNewMemberGrid();

//机构选择初始化 收货机构 一般数据
    $('#targetBranch').branchSelect();
    //操作员组件初始化
    $('#cashierSelect').operatorSelect({
        onAfterRender:function(data){
            branchName = data.branchName;
            $("#cashierId").val(data.id);
            $("#cashierName").val(data.userName);
        }
    });

    $(".radioAudit").change(function () {
        auditStatus = $(this).val(); //选中的值
        initNewMemberGrid();
    })



})
var auditStatus = "0";

//初始化默认条件 此条件放在表格初始化之前
function initConditionParams(){
    // 开始和结束时间
    $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
}

var gridName = "newMemberList";
var newMembGridHandle = new GridClass();
function initNewMemberGrid() {
    newMembGridHandle.setGridName(gridName);
    $("#"+gridName).datagrid({
        method:'post',
        align:'center',
        url:'',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
        showFooter:true,
        pageSize : 50,
        pageList : [20, 50, 100],
        height:'100%',
        width:'100%',
        columns:getColumnsByType(),
        onBeforeLoad:function(data){
            gridHandel.setDatagridHeader("center");
        }
    })
}

function getColumnsByType() {
    var type = auditStatus;
    if(type==="0"){
        return [[
            {field: 'branchCode', title: '机构编码', width: '70px', align: 'left'},
            {field: 'branchName',title:'机构名称',width:'150px',align:'left'},
            {field: 'newMemberNum', title: '新会员数', width: '150px', align: 'right'},
            {field: 'repeatMemberNum', title: '新会员重构数', width: '200px', align: 'right'},
            {field: 'repeatMemberRate', title: '会员重构率', width: '200px', align: 'right'},
        ]]
    }else if(type === "1"){
        return [[
            {field: 'branchCode', title: '机构编码', width: '70px', align: 'left'},
            {field: 'branchName',title:'机构名称',width:'150px',align:'left'},
            {field: 'cashierCode', title: '收银员编号', width: '120px', align: 'left'},
            {field: 'cashierName',title:'收银员名称',width:'150px',align:'left'},
            {field: 'newMemberNum', title: '新会员数', width: '150px', align: 'right'},
            {field: 'repeatMemberNum', title: '新会员重构数', width: '200px', align: 'right'},
            {field: 'repeatMemberRate', title: '会员重构率', width: '200px', align: 'right'},
        ]]
    }else {
        return [[
            {field: 'rptDateStr', title: '日期', width: '100px', align: 'left'},
            {field: 'branchCode', title: '机构编码', width: '70px', align: 'left'},
            {field: 'branchName',title:'机构名称',width:'140px',align:'left'},
            {field: 'newMemberNum', title: '新会员数', width: '150px', align: 'right'},
            {field: 'repeatMemberNum', title: '新会员重构数', width: '200px', align: 'right'},
            {field: 'repeatMemberRate', title: '会员重构率', width: '200px', align: 'right'},
        ]]
    }
}

//查询
function queryForm(){
    var fromObjStr = $("#queryForm").serializeObject();
    $("#"+gridName).datagrid("options").queryParams = fromObjStr;
    $("#"+gridName).datagrid("options").method = "POST";
    $("#"+gridName).datagrid('options').url = contextPath + '/newMember/report/reportList';
    $("#"+gridName).datagrid('load');

}

/**
 * 导出
 */
function exportData(){
    var length = $('#'+gridName).datagrid('getData').rows.length;
    if(length == 0){
        $_jxc.alert("无数据可导");
        return;
    }

    var param = {
        datagridId:gridName,
        formObj:$("#queryForm").serializeObject(),
        url:contextPath + "/newMember/report/exportList"
    }
    publicExprotService(param);

}