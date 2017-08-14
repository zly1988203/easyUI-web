/**
 * Created by huangj02 on 2016/8/9.
 */
$(function(){
    initDatagridEditOrder();
})
//var gridHandel = new GridClass();
function initDatagridEditOrder(){
    //gridHandel.setGridName(gridName);
    var formId = $("#formId").val();
    $("#gridEditOrder").datagrid({
        method:'post',
        url:contextPath+"/LogisticsPurchaseForm/getPurchaseFormListsById?formId="+formId,
        align:'center',
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        showFooter:true,
        height:'100%',
        columns:[[
            {field:'formNo',title:'订单号',width:'150px',align:'left'},
            {field:'skuCode',title:'商品代号',width:'100px',align:'left'},
            {field:'barCode',title:'国际条码',width:'130px',align:'left'},
            {field:'supplierCode',title:'供应商编号',width:'80px',align:'left'},
            {field:'realNum',title:'预订数量',width:'90px',align:'left'},
            {field:'giftNum',title:'赠品数量',width:'80px',align:'left'},
            {field:'price',title:'采购价',width:'80px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return ;
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field:'remark',title:'明细备注',width:'200px',align:'left'}
        ]],
        onLoadSuccess : function() {
            gridHandel.setDatagridHeader("center");
            //updateFooter();
        }
    });
    if(hasCostPrice==false){
        priceGrantUtil.grantCostPrice(gridName,["price","amount","taxAmount"])
    }
}
//合计
//function updateFooter(){
//    var fields = {largeNum:0,realNum:0,amount:0,taxAmount:0,isGift:0, };
//    var argWhere = {name:'isGift',value:""}
//    gridHandel.updateFooter(fields,argWhere);
//}

function back(){
	location.href = contextPath+"/LogisticsPurchaseForm/viewPa";
}

function exportListData(){
	var formId = $("#formId").val();
	window.location.href = contextPath + '/LogisticsPurchaseForm/exportList?formId='+formId + '&type=PA';
}
