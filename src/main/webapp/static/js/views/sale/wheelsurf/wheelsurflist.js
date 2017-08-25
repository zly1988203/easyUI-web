/**
 * Created by zhaoly on 2017/8/18.
 */
$(function () {
    initgridPosActivity();
    // 开始和结束时间
    $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    $('#branchTemp').branchSelect();

    $(".radioItem").change(function () {
        queryPosActivity();
    })
})

var gridName = "gridPosActivity";
var gridPosActivityHandle = new GridClass();
function initgridPosActivity() {
    gridPosActivityHandle.setGridName(gridName);
    $("#"+gridName).datagrid({
        align:'center',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
        showFooter:true,
        height:'100%',
        width:'100%',
        pageSize:50,
        columns:[[
            {field:'id',title:'id',align:'left',hidden:true},
            {field:'formNo',title:'活动编号',width:'200px',align:'left',formatter:function(value,row,index){
                var strHtml = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'查看POS客屏活动\',\''+contextPath+'/pos/wheelsurf/form/edit/'+row.id+'\')">' + value + '</a>';
                return strHtml;
            }},
            {field:'wheelsurfName',title:'活动名称',width:'200px',align:'left'},
            {field:'formTypeStr',title:'活动类型',width:'100px',align:'right'},
            {field:'beginTimeStr',title:'开始时间',width:'150px',align:'left'},
            {field:'overTimeStr',title:'结束时间',width:'100px',align:'right'},
            {field:'validTimeStr',title:'奖品有效期',width:'150px',align:'left'},
            {field:'auditStatus',title:'活动状态',width:'200px',align:'left',formatter:function(value,row,index){
                    if(value == '0'){
                        return '未审核';
                    }else if(value == '1'){
                        return '已审核';
                    }else if(value == '2'){
                        return '已终止';
                    }else{
                        return '未知类型：'+ value;
                    }
                }},
            {field:'createUserName',title:'制单人',width:'150px',align:'left'},
            {field:'auditUerName',title:'审核人',width:'150px',align:'left'},
            {field:'createTimeStr',title:'制单时间',width:'150px',align:'left'},
        ]],
        onLoadSuccess:function(data){
            gridPosActivityHandle.setDatagridHeader("center");
        }
    })
    queryPosActivity();
}

function queryPosActivity() {
    var fromObjStr = $('#queryForm').serializeObject();
    $("#"+gridName).datagrid("options").method = "post";
    $("#"+gridName).datagrid('options').url = contextPath +'/pos/wheelsurf/form/list';
    $("#"+gridName).datagrid('load', fromObjStr);
}

function addPosActivity() {
    toAddTab("新增Pos客屏活动",contextPath + "/pos/wheelsurf/form/add");
}

function copyPosActivity() {
    var row =  $("#"+gridName).datagrid('getSelected');
    if(!row){
        $_jxc.alert("请选择一条数据");
        return;
    }
    toAddTab('复制POS客屏活动',contextPath+'/pos/wheelsurf/form/copy/'+row.id);
}

function delPosActivity() {
    var row =  $("#"+gridName).datagrid('getSelected');
    if(!row){
        $_jxc.alert("请选择一条数据");
        return;
    }

    $_jxc.confirm("是否删除选中数据",function (r) {
        if(!r)return;

        $_jxc.ajax({
            url:contextPath+'/pos/wheelsurf/form/del/'+row.id
        },function(result){
            if(result.code == 0){
                $_jxc.alert("删除POS客屏活动成功",function () {
                    queryPosActivity();
                })
            }else{
                $_jxc.alert(result['message']);
            }
        })
    })
}