$(function () {
    initGridList();
    initConditionParams();
})
//初始化默认条件
function initConditionParams(){
    $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
}


var gridListId = "gridReportList";
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

            {field:'branchName',title:'机构名称',width:'140px',align:'left'},
            {field:'skuCode',title:'货号',width:'70px',align:'left',editor:'textbox'},
            {field:'skuName',title:'商品名称',width:'200px',align:'left'},
            {field:'barCode',title:'条码',width:'130px',align:'left'},
            {field:'realNum',title:'采购数量',width:'80px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field:'amount',title:'采购金额',width:'80px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field:'amount',title:'调整后金额',width:'80px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field:'amount',title:'调整金额',width:'80px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field:'price',title:'原成本价',width:'80px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return ;
                    }
                    return '<b>'+parseFloat(value||0).toFixed(4)+'</b>';
                },
            },
            {field:'price',title:'新成本价',width:'80px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return ;
                    }
                    return '<b>'+parseFloat(value||0).toFixed(4)+'</b>';
                },
            },

            {field:'realNum',title:'调价时库存',width:'80px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field:'supplierName',title:'供应商名称',width:'140px',align:'left'},
            {field:'formNo',title:'调价单编号',width:'140px',align:'left',formatter:function(value,row,index){
                var strHtml = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'查看采购详细\',\''+contextPath+'/form/purchase/orderEdit?formId='+row.id+'\')">' + value + '</a>';
                return strHtml;
            }},
            {field:'formNo',title:'引用单编号',width:'140px',align:'left',formatter:function(value,row,index){
                var strHtml = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'查看采购详细\',\''+contextPath+'/form/purchase/orderEdit?formId='+row.id+'\')">' + value + '</a>';
                return strHtml;
            }},

            {field:'unit',title:'单位',width:'60px',align:'left'},
            {field:'spec',title:'规格',width:'60px',align:'left'},
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
    $("#formList").attr("action",contextPath+"/logisticsSupplier/exportHandel");
    $("#formList").submit();
}