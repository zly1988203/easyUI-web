/**
 * Created by zhaoly on 2017/5/26.
 */
$(function () {
    initGridOnlineOrder();
    $("#txtStartDate").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
})

var gridName = "gridOnlineOrder";
var gridHandel = new GridClass();

function initGridOnlineOrder() {
    gridHandel.setGridName(gridName);
    dg=$("#"+gridName).datagrid({
        align:'center',
        rownumbers:true,    //序号
        pagination:false,    //分页
        showFooter:true,
        height:'100%',
        width:'100%',
        singleSelect:true,
        columns:[[
            {field:'formNo',title:'订单号',width:'140px',align:'left',formatter:function(value,row,index){
                if(updatePermission){
                    var strHtml = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'直送要货单明细\',\''+ contextPath +'/form/deliverForm/deliverEdit?deliverFormId='+ row.deliverFormId +'&deliverType=DY\')">' + value + '</a>';
                    return strHtml;
                }else{
                    return value;
                }
            }},
            {field: 'dealStatus', title: '订单状态', width: '60px', align: 'center'},
            {field: 'salesman', title: '收货人', width: '130px', align: 'left'},
            {field: 'salesman', title: '联系电话', width: '130px', align: 'left'},
            {field:'branchCode',title:'机构编码',width:80,align:'left'},
            {field:'branchName',title:'机构名称',width:180,align:'left'},
            {field: 'amount', title: '订单金额', width: '80px', align: 'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'amount', title: '优惠金额', width: '80px', align: 'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'amount', title: '实收金额', width: '80px', align: 'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'dealStatus', title: '配送方式', width: '60px', align: 'center'},
            {field: 'dealStatus', title: '支付方式', width: '60px', align: 'center'},
            {field: 'dealStatus', title: '付款方式', width: '60px', align: 'center'},
            {field: 'updateTime', title: '下单时间', width: '120px', align: 'center',
                formatter: function (value, row, index) {
                    if (value) {
                        return new Date(value).format('yyyy-MM-dd hh:mm');
                    }
                    return "";
                }
            },
            {field: 'updateTime', title: '发货时间', width: '120px', align: 'center',
                formatter: function (value, row, index) {
                    if (value) {
                        return new Date(value).format('yyyy-MM-dd hh:mm');
                    }
                    return "";
                }
            },

            {field: 'updateTime', title: '回款时间', width: '120px', align: 'center',
                formatter: function (value, row, index) {
                    if (value) {
                        return new Date(value).format('yyyy-MM-dd hh:mm');
                    }
                    return "";
                }
            },

            {field:'branchName',title:'收货地址',width:"180px",align:'left'},
            {field:'branchName',title:'线上订单编号',width:"80px",align:'left'},
            {field:'branchName',title:'用户留言',width:"180px",align:'left'},
        ]]
    })
}


