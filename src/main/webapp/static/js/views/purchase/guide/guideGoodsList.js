var gridHandel = new GridClass();

$(function(){
	initPurchaseGuideGoodsListDg();
});


var dg;
//初始化表格
function initPurchaseGuideGoodsListDg(){
	
	debugger;
	var formData = $("#formData").val();
	formData = $.parseJSON(formData);
	
	
	
	dg = $("#dgGuideGoodsList").datagrid({
        method:'post',
        align:'center',
        url:contextPath+'/form/purchaseGuide/getGoodsList',
        queryParams:formData,
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        //pagination:true,    //分页
        //pageSize:10,
        //fitColumns:true,    //每列占满
        fit:true,            //占满
        showFooter:true,
        columns:[[
        	{field:'supplierName',title:'供应商',width:180,align:'left'},
            {field:'branchName',title:'收货机构',width:80,align:'left'},
            {field:'skuCode',title:'货号',width:120,align:'left'},
            {field:'skuName',title:'商品名称',width:100,align:'center'},
            {field:'barCode',title:'条码',width:120,align:'left'},
            {field:'skuUnit',title:'单位',width:120,align:'left'},
            {field:'skuSpec',title:'规格',width:120,align:'left'},
            {field:'purchaseSpec',title:'采购规格',width:120,align:'left'},
            {field:'purchasePrice',title:'进价',width:120,align:'left'},
            {field:'actualStock',title:'库存',width:120,align:'left'},
            {field:'totalAmount',title:'金额',width:120,align:'left'}
        ]],
        onLoadSuccess : function() {
            gridHandel.setDatagridHeader("center");
        }
    });
}