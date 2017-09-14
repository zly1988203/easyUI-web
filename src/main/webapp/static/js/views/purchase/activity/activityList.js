$(function () {
    initConditionParams();

    //机构选择初始化 收货机构
    $('#targetBranch').branchSelect();

    //操作员组件初始化
    $('#operateorSelect').operatorSelect({
        onAfterRender:function(data){
            branchName = data.branchName;
            $("#createUserId").val(data.id);
            $("#createUserName").val(data.userName);
        }
    });


    //供应商组件初始化
    $('#supplierSelect').supplierSelect({
        loadFilter:function(data){
            data.supplierId = data.id;
            return data;
        }
    });
    initGridActivityList();

})

//初始化默认条件
function initConditionParams(){
    $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
}

var dg;
var gridListId = "gridActivityList";
var gridHandel = new GridClass();
function initGridActivityList() {
    gridHandel.setGridName(gridListId);
    dg = $("#" + gridListId).datagrid({
        method:'post',
        align:'center',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
        pageSize: 50,
        pageList: [20, 50, 100],//可以设置每页记录条数的列表
        showFooter:true,
        height:'100%',
        width:'100%',
        columns:[[
            {field: 'id', title: 'id', width: '85px', align: 'left', hidden: true},
            {field:'formNo',title:'单号',width:'140px',align:'left',
                formatter:function(value,row,index){
                    var strHtml = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'查看采购促销单\',\'' + contextPath + '/purchase/activity/edit/' + row.id + '\')">' + value + '</a>';
                return strHtml;
                }
            },
            {field:'branchName',title:'机构名称',width:'140px',align:'left'},
            {field:'status',title:'审核状态',width:'100px',align:'center',
                formatter:function(value,row,index){
                    if(value == '0'){
                        return '待审核';
                    }else if(value == '1'){
                        return '已审核';
                    }else if(value == '2'){
                        return '已终止';
                    }else{
                        return '未知类型：'+ value;
                    }
                }
            },
            {field:'supplierName',title:'供应商',width:'140px',align:'left'},
            {field: 'startTime', title: '开始时间', width: '150px', align: 'center'},
            {
                field: 'endTime', title: '结束时间', width: '150px', align: 'center'

            },
            {field:'createUserName',title:'制单人',width:'130px',align:'left'},
            {field: 'createTime', title: '制单时间', width: '150px', align: 'center'},

            {field:'validUserName',title:'审核人',width:'130px',align:'left'},
            {field: 'validTime', title: '审核时间', width: '150px', align: 'center'},
            {field:'remark',title:'备注',width:'200px',align:'left'}
        ]],
        onLoadSuccess : function() {
            gridHandel.setDatagridHeader("center");
        }
    })
}

function query(){
    $("#"+gridListId).datagrid("options").queryParams = $("#queryForm").serializeObject();
    $("#"+gridListId).datagrid("options").method = "post";
    $("#" + gridListId).datagrid("options").url = contextPath + '/purchase/activity/list';
    $("#"+gridListId).datagrid("load");
}

function add() {
    toAddTab("新增采购促销活动",contextPath + "/purchase/activity/add");
}


/**
 * 导出
 */
function exportData(){
    var length = $('#'+gridListId).datagrid('getData').rows.length;
    if(length == 0){
        $_jxc.alert("无数据可导");
        return;
    }
    $('#exportWin').window({
        top:($(window).height()-300) * 0.5,
        left:($(window).width()-500) * 0.5
    });
    $("#exportWin").show();
    $("#totalRows").html($('#'+gridListId).datagrid('getData').total);
    $("#exportWin").window("open");
}
// 调用导出方法
function exportExcel(){
    $("#exportWin").hide();
    $("#exportWin").window("close");
    $("#queryForm").form({
        success : function(result){

        }
    });
    $("#queryForm").attr("action", contextPath + "/purchase/activity/export/list");
    $("#queryForm").submit();
}


//删除
function del() {
    var rows = $("#gridActivityList").datagrid("getChecked");
    if ($("#gridActivityList").datagrid("getChecked").length <= 0) {
        $_jxc.alert('请选中一行进行删除！');
        return null;
    }
    var formIds = [];
    $.each(rows, function (i, v) {
        //formIds+=v.id+",";
        formIds.push(v.id);
    });

    $_jxc.confirm('是否要删除选中数据?', function (data) {
        if (data) {
            $_jxc.ajax({
                url: contextPath + "/purchase/activity/del",
                type: "POST",
                data: {
                    ids: formIds
                }
            }, function (result) {

                if (result['code'] == 0) {
                    $_jxc.alert("删除成功");
                } else {
                    $_jxc.alert(result['message']);
                }
                $("#gridOrders").datagrid('reload');
            });
        }
    });
}