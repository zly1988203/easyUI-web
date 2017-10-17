
var gridName = 'saleReturnAddForm';
$(function(){
	initDatagridStoreYHOrder();
})

var gridHandel = new GridClass();
function initDatagridStoreYHOrder(){
    gridHandel.setGridName(gridName);
    var formId = $("#formId").val();
	var url = contextPath+"/LogisticsDeliverForm/getDeliverFormListsById?deliverFormId="+formId;
    $("#"+gridName).datagrid({
        method:'post',
    	url:url,
        align:'center',
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        showFooter:true,
        height:'100%',
        width:'100%',
        columns:[[
            {field:'formNo',title:'订单号',width:'150px',align:'left'},
            {field:'rowNo',title:'序号',width:'80px',align:'center'},
            {field:'skuCode',title:'商品代号',width:'100px',align:'left'},
            {field:'barCode',title:'国际条码',width:'130px',align:'left'},
            {field:'sourceBranchCode',title:'配送点代号',width:'80px',align:'left'},
            {field:'dealNum',title:'退货数量',width:'90px',align:'right'},
            {field:'price',title:'商品零售价',width:'80px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return ;
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field:'remark',title:'明细备注',width:'200px',align:'left'}
        ]],

        onLoadSuccess:function(data){
            gridHandel.setDatagridHeader("center");
            //updateFooter();
        },
    });
    if(hasDistributionPrice==false){
        priceGrantUtil.grantDistributionPrice(gridName,["price","amount","taxAmount"])
    }
}

function exportListData(){
    window.location.href=contextPath+'/LogisticsDeliverForm/exportList?deliverFormId='+$("#formId").val() + '&deliverType=DR';
}
