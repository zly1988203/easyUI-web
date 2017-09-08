$(function () {
    initConditionParams();

    //机构选择初始化 收货机构
    $('#targetBranch').branchSelect();

    //操作员组件初始化
    $('#operateorSelect').operatorSelect({
        onAfterRender:function(data){
            branchName = data.branchName;
            $("#createUserId").val(data.id);
            $("#createUserName").val(data.name);
        }
    });


    //供应商组件初始化
    $('#supplierSelect').supplierSelect({
        loadFilter:function(data){
            data.supplierId = data.id;
            return data;
        }
    })
    initGridActivityList();

})

//初始化默认条件
function initConditionParams(){
    $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
}

var gridListId = "gridActivityList";
var gridHandel = new GridClass();
function initGridActivityList() {
    gridHandel.setGridName(gridListId);
    $("#"+gridListId).datagrid({
        method:'post',
        align:'center',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
        showFooter:true,
        height:'100%',
        width:'100%',
        columns:[[
            {field:'formNo',title:'单号',width:'140px',align:'left',
                formatter:function(value,row,index){
                var strHtml = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'查看采购成本调价\',\''+contextPath+'/purchase/cost/form/edit?formId='+row.id+'\')">' + value + '</a>';
                return strHtml;
                }
            },
            {field:'branchName',title:'机构名称',width:'140px',align:'left'},
            {field:'status',title:'审核状态',width:'100px',align:'center',
                formatter:function(value,row,index){
                    if(value == '0'){
                        return '待审核';
                    }else if(value == '1'){
                        return '审核通过';
                    }else if(value == '2'){
                        return '审核失败';
                    }else{
                        return '未知类型：'+ value;
                    }
                }
            },
            {field:'supplierName',title:'供应商',width:'140px',align:'left'},

            {field:'createTime',title:'开始时间',width:'150px',align:'center',
                formatter: function (value, row, index) {
                    if (value) {
                        return new Date(value).format('yyyy-MM-dd hh:mm');
                    }
                    return "";
                }
            },
            {field:'createTime',title:'结束时间',width:'150px',align:'center',
                formatter: function (value, row, index) {
                    if (value) {
                        return new Date(value).format('yyyy-MM-dd hh:mm');
                    }
                    return "";
                }
            },
            {field:'createUserName',title:'制单人',width:'130px',align:'left'},
            {field:'createTime',title:'制单时间',width:'150px',align:'center',
                formatter: function (value, row, index) {
                    if (value) {
                        return new Date(value).format('yyyy-MM-dd hh:mm');
                    }
                    return "";
                }
            },

            {field:'validUserName',title:'审核人',width:'130px',align:'left'},
            {field:'validTime',title:'审核时间',width:'150px',align:'center',
                formatter: function (value, row, index) {
                    if (value) {
                        return new Date(value).format('yyyy-MM-dd hh:mm');
                    }
                    return "";
                }
            },
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
    $("#"+gridListId).datagrid("options").url = contextPath+'/purchase/cost/form/list';
    $("#"+gridListId).datagrid("load");
}

function add() {
    toAddTab("新增采购促销活动",contextPath + "/purchase/activity/add");
}

//删除
function actDelete(){
    var rows =$("#"+gridListId).datagrid("getChecked");
    if($("#"+gridListId).datagrid("getChecked").length <= 0){
        $_jxc.alert('请选中一行进行删除！');
        return null;
    }
    var formIds='';
    $.each(rows,function(i,v){
        formIds+=v.id+",";
    });

    $_jxc.confirm('是否要删除选中数据?',function(data){
        if(data){
            $_jxc.ajax({
                url:contextPath+"/form/purchase/delete",
                type:"POST",
                data:{
                    formIds:formIds
                }
            },function(result){

                if(result['code'] == 0){
                    $_jxc.alert("删除成功");
                }else{
                    $_jxc.alert(result['message']);
                }
                $("#"+gridListId).datagrid('reload');
            });
        }
    });
}

function actCopy() {
    
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
    $("#formList").form({
        success : function(result){

        }
    });
    $("#formList").attr("action",contextPath+"/report/purchase/cost/form/export/list");
    $("#formList").submit();
}
