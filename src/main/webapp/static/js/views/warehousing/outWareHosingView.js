/**
 * Created by huangj02 on 2016/8/9.
 */
$(function(){
    initDataoutWareHosingView();
});

function initDataoutWareHosingView(){
	var formId = $("#formId").val();
	
    $("#outWareHosingView").datagrid({
    	url:contextPath+"/form/purchase/detailList?formId="+formId,
        align:'center',
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        showFooter:true,
        columns:[[
            {field:'encode',title:'自编码',width:100,align:'center'},
            {field:'batch',title:'批次',width:100,align:'center'},
            {field:'barCode',title:'品名',width:100,align:'center'},
            {field:'unit',title:'单位',width:100,align:'center'},
            {field:'spec',title:'规格',width:100,align:'center'},
            {field:'largeNum',title:'箱数',width:100,height:60,align:'center'},
            {field:'realNum',title:'数量',width:100,align:'center'},
            {field:'price',title:'单价',width:100,align:'center'},
            {field:'amount',title:'金额',width:100,align:'center'},
            {field:'salePrice',title:'销售价',width:100,align:'center'},
            {field:'salePrice1',title:'销售金额',width:100,align:'center'},
            {field:'goodsCreateDate',title:'生产日期',width:100,align:'center'},
            {field:'goodsExpiryDate',title:'有效期',width:100,align:'center'},
            {field:'tax',title:'税率',width:100,align:'center'},
            {field:'taxAmount',title:'税额',width:100,align:'center'},
            {field:'creatPlace',title:'产地',width:100,align:'center'},
            {field:'remark',title:'备注',width:100,align:'center'},
            {field:'thisStore',title:'当前库存',width:100,align:'center'},
            {field:'targetStore',title:'目标仓库',width:100,align:'center'}
        ]]
    });
}

function back(){
	location.href = contextPath+"/form/purchase/orderList";
}

function orderAdd(){
	location.href = contextPath + "/form/purchase/orderAdd";
}
    