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
	var updatePermission = $("#updatePermission").html().trim();
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
        columns:[[
            {field:'orderNo',title:'订单号',width:'160px',align:'left',
            	formatter:function(value,row,index){
                    var strHtml = "";

	                	 if(updatePermission && row.orderId != null){
                             strHtml = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'线上订单详情\',\''+ contextPath +'/report/onlineOrder/view?orderId='+ row.orderId+'\')">' + value + '</a>';
	                     }
	                     else {
                             strHtml =value ;
	                     }

	                return strHtml;
            	}
            },
            {field: 'saleTypeStr', title: '订单类型', width: '90px', align: 'center'},
            {field: 'orderStatusStr', title: '订单状态', width: '90px', align: 'center'},
            {field: 'userName', title: '收货人', width: '80px', align: 'left'},
            {field: 'phone', title: '联系电话', width: '100px', align: 'left'},
            {field: 'branchCode',title:'机构编码',width:80,align:'left'},
            {field: 'branchName',title:'机构名称',width:120,align:'left'},
            {field: 'totalAmount', title: '订单金额', width: '80px', align: 'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'discountAmount', title: '优惠金额', width: '80px', align: 'right',
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
            {field: 'pickUpTypeStr', title: '配送方式', width: '70px', align: 'center'},
            {field: 'payTypeStr', title: '支付方式', width: '70px', align: 'center'},
            {field: 'payWayStr', title: '付款方式', width: '70px', align: 'center'},
            {field: 'onlineCreateTimeStr', title: '下单时间', width: '140px', align: 'center'},
            {field: 'deliverTimeStr', title: '发货时间', width: '140px', align: 'center'},
            {field: 'returnedMoneyTimeStr', title: '回款时间', width: '140px', align: 'center'},
            {field: 'address',title:'收货地址',width:"180px",align:'left'},
            {field: 'onlineOrderNo',title:'线上订单编号',width:"160px",align:'left'},
            {field: 'ticketNo',title:'小票号',width:"160px",align:'left'},
            {field: 'remark',title:'用户留言',width:"180px",align:'left'},
        ]],
        onLoadSuccess:function(data){

        }
    })
}

/**
 * 机构名称
 */
function selectListBranches(){
    new publicAgencyService(function(data){
        $("#branchCompleCode").val(data.branchCompleCode);
        $("#branchName").val("["+data.branchCode+"]" + data.branchName);
    },'BF','');
}

function queryOnlineOrder() {
	$("#startCount").val('');
	$("#endCount").val('');
    $("#"+gridName).datagrid("options").queryParams = $("#queryForm").serializeObject();
    $("#"+gridName).datagrid("options").method = "post";
    $("#"+gridName).datagrid("options").url = contextPath+'/report/onlineOrder/getOnlineOrderList';
    $("#"+gridName).datagrid("load");
}

/**
 * 导出
 */
function exportData(){
    $("#startCount").val('');
    $("#endCount").val('');

    var length = $("#"+gridName).datagrid('getData').rows.length;
	if(length == 0){
		$_jxc.alert("无数据可导");
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

/**
 * 导出
 */
function exportExcel(){
    $("#exportWin").hide();
	$("#exportWin").window("close");
	$("#queryForm").form({
		success : function(result){
			
		}
	});
	$("#queryForm").attr("action", contextPath+"/report/onlineOrder/exportHandel");
	$("#queryForm").submit();
}

