$(function () {
    initGridList();
    initConditionParams();
})
//初始化默认条件
function initConditionParams(){
    $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
}


var gridListId = "gridCostList";
var gridHandel = new GridClass();
function  initGridList() {
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
            {field:'formNo',title:'单号',width:'140px',align:'left',formatter:function(value,row,index){
                var strHtml = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'查看采购成本调价\',\''+contextPath+'/purchase/cost/form/edit?formId='+row.id+'\')">' + value + '</a>';
                return strHtml;
            }},
            {field:'status',title:'审核状态',width:'100px',align:'center',formatter:function(value,row,index){
                if(value == '0'){
                    return '待审核';
                }else if(value == '1'){
                    return '审核通过';
                }else if(value == '2'){
                    return '审核失败';
                }else{
                    return '未知类型：'+ value;
                }
            }},
            {field:'branchName',title:'收货机构',width:'140px',align:'left'},
            {field:'supplierName',title:'供应商名称',width:'140px',align:'left'},
            {field:'amount',title:'调价金额',width:'80px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },

            {field:'formNo',title:'引用单编号',width:'140px',align:'left',formatter:function(value,row,index){
                var strHtml = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'查看采购详细\',\''+contextPath+'/form/purchase/orderEdit?formId='+row.id+'\')">' + value + '</a>';
                return strHtml;
            }},
            {field:'validUserName',title:'制单人',width:'130px',align:'left'},
            {field:'createTime',title:'制单时间',width:'150px',align:'center',
                formatter: function (value, row, index) {
                    if (value) {
                        return new Date(value).format('yyyy-MM-dd hh:mm');
                    }
                    return "";
                }},

            {field:'validUserName',title:'审核人',width:'130px',align:'left'},
            {field:'createTime',title:'审核时间',width:'150px',align:'center',
                formatter: function (value, row, index) {
                    if (value) {
                        return new Date(value).format('yyyy-MM-dd hh:mm');
                    }
                    return "";
                }},
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
    $("#"+gridListId).datagrid("options").url = contextPath+'/form/purchase/listData';
    $("#"+gridListId).datagrid("load");
}

function add() {
    toAddTab("新增采购成本调价",contextPath + "/purchase/cost/form/add");
}

//删除
function orderDelete(){
    var rows =$("#gridOrders").datagrid("getChecked");
    if($("#gridOrders").datagrid("getChecked").length <= 0){
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
                $("#gridOrders").datagrid('reload');
            });
        }
    });
}

function printPreview() {
    var rows = $("#"+gridListId).datagrid('getSelections');
    if(rows.length == 1){
        toPrintPreview('PA','/form/purchase/','gridOrders');
    }else{
        $_jxc.alert('请选择一行数据.')
    }
}