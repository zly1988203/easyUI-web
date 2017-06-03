/**
 * Created by zhaoly on 2017/5/26.
 */

var orderId;
$(function () {
	orderId = $("#orderId").val();
    initGridOrderDetail();
})

var gridName = "gridOnlineOrderDetail";
var gridHandel = new GridClass();

function initGridOrderDetail() {
    gridHandel.setGridName(gridName);
    $("#"+gridName).datagrid({
        url:contextPath+"/report/onlineOrder/getGoodsListByOrderId",
        queryParams:{
        	orderId : orderId
        },
        align:'center',
        rownumbers:true,    //序号
        pagination:true,    //分页
        pageSize:50,
        showFooter:true,
        showFooter:true,
        height:'100%',
        width:'100%',
        singleSelect:true,
        columns:[[
            {field:'skuCode',title:'货号',width: '70px',align:'left',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return ;
                    }else{
                    	return value;
                    }
                },
            },
            {field:'skuName',title:'商品名称',width:'200px',align:'left'},
            {field:'barCode',title:'条码',width:'150px',align:'left'},
            {field:'unit',title:'单位',width:'60px',align:'left'},
            {field:'spec',title:'规格',width:'90px',align:'left'},
            {field:'saleNum',title:'数量',width:'80px',align:'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field:'totalPrice',title:'原价',width:'80px',align:'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }

            },
            {field:'salePrice',title:'售价',width:'80px',align:'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field:'saleAmount',title:'金额',width:'80px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }

                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },

            {field:'outputTax',title:'税率',width:'80px',align:'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field:'taxAmount',title:'税额',width:'80px',align:'right',
                formatter:function(value,row){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            }
        ]]
    })
}

/**
 * 导出
 */
function exportList(){
	var length = $("#" + gridName).datagrid('getData').total;
	if(length == 0){
		$.messager.alert('提示',"列表数据为空");
		return;
	}
	
	if(length>10000){
		$.messager.alert("当次导出数据不可超过1万条，现已超过，请重新调整导出范围！");
		return;
	}
	location.href = contextPath +"/report/onlineOrder/exportGoodsList?orderId=" + orderId;
}

