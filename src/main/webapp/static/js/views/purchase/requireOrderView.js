/**
 * Created by zhanghuan on 2016/8/30.
 * 要货单-查看
 */
$(function(){
    initDatagridViewRequireOrder();
});

function initDatagridViewRequireOrder(){
	var formId = $("#formId").val();
	
    $("#gridViewRequireOrder").datagrid({
    	url:contextPath+"/form/purchase/detailList?formId="+formId,
        align:'center',
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        columns:[[
            {field:'skuCode',title:'货号',align:'center'},
            {field:'zbm',title:'自编码',width:100,align:'center'},
            {field:'pm',title:'品名',width:100,align:'center'},
            {field:'unit',title:'单位',width:100,align:'center'},
            {field:'spec',title:'规格',width:100,align:'center'},
            {field:'largeNum',title:'箱数',width:100,align:'center'},
            {field:'realNum',title:'数量',width:100,align:'center'},
            {field:'price',title:'单价',width:100,align:'center'},
            {field:'amount',title:'金额',width:100,align:'center'},
            {field:'tax',title:'税率',width:100,align:'center'},
            {field:'taxAmount',title:'税额',width:100,align:'center'},
            {field:'remark',title:'备注',width:100,align:'center'},
            {field:'dqkc',title:'当前库存',width:100,align:'center'},
            {field:'mbkc',title:'目标库存',width:100,align:'center'}
        ]]
    });
}

//返回
function back(){
	location.href = contextPath+"/form/purchase/orderList";
}

//新增
function orderAdd(){
	location.href = contextPath + "/form/purchase/orderAdd";
}
    