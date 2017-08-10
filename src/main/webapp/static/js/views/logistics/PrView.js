/**
 * Created by huangj02 on 2016/8/9.
 * 物流供应商退货明细导出
 */
$(function(){
    initDatagridEditOrder();
    
    var refFormNo = $("#refFormNo").html();
    if(refFormNo){
    	var type = refFormNo.substr(0,2);
    	if(type == 'PI'){
    		$("#refFormNoType").html("收货单");
    	}else if(type == 'DI'){
    		$("#refFormNoType").html("直调入库单");
    	}
    }else{
    	$("#refFormNoType").html("无");
    }
    if($("#close").val()){
    	$("#addButton").addClass("unhide");
    	$("#toBackByJSButton").attr("onclick","window.parent.closeTab()");
    }
});
var gridHandel = new GridClass();
function initDatagridEditOrder(){
	var formId = $("#formId").val();
	gridHandel.setGridName('gridEditOrder');
    $("#gridEditOrder").datagrid({
        //title:'普通表单-用键盘操作',
//        method:'get',
    	url:contextPath+"/LogisticsPurchaseForm/getPurchaseFormListsById?formId="+formId,
        align:'center',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        height:'100%',
        //pagination:true,    //分页
        //fitColumns:true,    //占满
        showFooter:true,
        columns:[[
            {field:'formNo',title:'订单号',width:'150px',align:'left'},
            {field:'skuCode',title:'商品代号',width:'100px',align:'left'},
            {field:'barCode',title:'国际条码',width:'130px',align:'left'},
            {field:'supplierCode',title:'供应商编号',width:'80px',align:'left'},
            {field:'realNum',title:'退货数量',width:'90px',align:'left'},
            {field:'price',title:'成本价',width:'80px',align:'right',
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
            updateFooter();
        }
    });
    if(hasPurchasePrice==false){
        priceGrantUtil.grantPurchasePrice("gridEditOrder",["price","amount","taxAmount"])
    }
}


//合计
function updateFooter(){
    var fields = {largeNum:0,realNum:0,amount:0,taxAmount:0,isGift:0, };
    var argWhere = {name:'isGift',value:""}
    gridHandel.updateFooter(fields,argWhere);
}

function exportListData(){
    var formId = $("#formId").val();
    window.location.href = contextPath + '/LogisticsPurchaseForm/exportList?formId='+formId + '&type=PR';
}

//返回列表页面
function back(){
	location.href = contextPath+"/LogisticsPurchaseForm/viewPr";
}


