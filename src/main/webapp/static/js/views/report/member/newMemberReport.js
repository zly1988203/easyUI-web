$(function () {

    initConditionParams();

//机构选择初始化 收货机构 一般数据
    $('#targetBranch').branchSelect();
    //操作员组件初始化
    $('#operateorSelect').operatorSelect({
        onAfterRender:function(data){
            branchName = data.branchName;
            $("#createUserId").val(data.id);
            $("#createUserName").val(data.userName);
        }
    });

    $(".radioAudit").change(function () {
        auditStatus = $(this).val(); //选中的值
        initNewMemberGrid();
    })



})
var auditStatus = 1;

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
        columns:getColumnsByType,
        onBeforeLoad:function(data){
            gridHandel.setDatagridHeader("center");
        }
    })
}

function getColumnsByType() {
    var type = auditStatus;
    if(type==="0"){
        return [[
            {field: 'branchCode', title: '机构编码', width: '65px', align: 'left'},
            {field:'branchName',title:'机构名称',width:'140px',align:'left'},
            {field: 'newMemberCount', title: '新会员数', width: '150px', align: 'right'},
            {field: 'repeatCost', title: '新会员重构数', width: '200px', align: 'right'},
            {field: 'repeatCost', title: '会员重构率', width: '200px', align: 'right'},
        ]]
    }else if(type === "1"){
        return [[
            {field: 'branchCode', title: '机构编码', width: '65px', align: 'left'},
            {field:'branchName',title:'机构名称',width:'140px',align:'left'},
            {field: 'branchCode', title: '收银员编号', width: '65px', align: 'left'},
            {field:'branchName',title:'收银员名称',width:'140px',align:'left'},
            {field: 'newMemberCount', title: '新会员数', width: '150px', align: 'right'},
            {field: 'repeatCost', title: '新会员重构数', width: '200px', align: 'right'},
            {field: 'repeatCost', title: '会员重构率', width: '200px', align: 'right'},
        ]]
    }else {
        return [[
            {field: 'branchCode', title: '日期', width: '65px', align: 'left'},
            {field: 'branchCode', title: '机构编码', width: '65px', align: 'left'},
            {field:'branchName',title:'机构名称',width:'140px',align:'left'},
            {field: 'newMemberCount', title: '新会员数', width: '150px', align: 'right'},
            {field: 'repeatCost', title: '新会员重构数', width: '200px', align: 'right'},
            {field: 'repeatCost', title: '会员重构率', width: '200px', align: 'right'},
        ]]
    }
}
