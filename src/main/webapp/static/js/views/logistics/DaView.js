/**
 * Created by zhanghuan on 2016/8/30.
 * 要货单-查看
 */
$(function(){
    initDatagridViewRequireOrder();
    if($("#close").val()){
    	$("#addButton").addClass("unhide");
    	$("#toBackByJSButton").attr("onclick","window.parent.closeTab()");
    }
});
$(document).on('click','input[name="numDeal"]',function(){
	return false;
});

var gridHandel = new GridClass();
function initDatagridViewRequireOrder(){
	var formId = $("#formId").val();
    $("#gridViewRequireOrder").datagrid({
    	method:'post',
    	url:contextPath+"/LogisticsDeliverForm/getDeliverFormListsById?deliverFormId="+formId,
        align:'center',
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
		showFooter:true,
		height:'100%',
        columns:[[
            {field:'formNo',title:'订单号',width:'150px',align:'left'},
            {field:'skuCode',title:'商品代号',width:'100px',align:'left'},
            {field:'barCode',title:'国际条码',width:'130px',align:'left'},
			{field:'targetBranchCode',title:'配送点代号',width:'80px',align:'left'},
			{field:'applyNum',title:'预订数量',width:'90px',align:'left'},
            {field:'giftNum',title:'赠品数量',width:'80px',align:'left'},
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
		onLoadSuccess : function() {
			gridHandel.setDatagridHeader("center");
			//updateFooter();
		},
    });
}
//合计
//function updateFooter(){
//	var fields = {largeNum:0,applyNum:0,amount:0,isGift:0, };
//	var argWhere = {name:'isGift',value:""}
//	gridHandel.updateFooter(fields,argWhere);
//}

function exportListData(){
	window.location.href=contextPath+'/LogisticsDeliverForm/exportList?deliverFormId='+$("#formId").val() + '&deliverType=DA';
}

//返回
function back(){
	location.href = contextPath+"/LogisticsDeliverForm/viewDa";
}