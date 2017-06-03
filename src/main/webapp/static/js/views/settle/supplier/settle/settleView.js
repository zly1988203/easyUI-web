/**
 * Created by 
 * 供应商对账单-已审核
 */

//列表数据查询url
var url = "";
var gridName = "supplierChkAccountView";


$(function(){
	var formId = $("#formId").val();
	url = contextPath+"/settle/supplierSettle/settleFormDetailList?id="+formId;
	initSupChkAcoView();
})


var gridHandel = new GridClass();
function initSupChkAcoView(){
    gridHandel.setGridName(gridName);
    $("#"+gridName).datagrid({
        method:'post',
    	url:url,
        align:'center',
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        showFooter:true,
        height:"100%",
        width:'100%',
        columns:[[
            {field:'targetFormNo',title:'单号',width: '150px',align:'left',
            	formatter:function(value,row,index){
            		var str = "";
            		if(row.isFooter){
                        str ='<div class="ub ub-pc">合计</div> '
                    }else{
                    	str = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'供应商对账单据详情\',\''+ contextPath +'/form/deliverForm/deliverEdit?deliverFormId='+ row.id +'\')">' + (value||"") + '</a>';
                    }
            		return str;
            	}
            },
            {field:'targetFormType',title:'单据类型',width:'120px',align:'left'},
            {field:'branchCode',title:'机构编号',width:'120px',align:'left'},
            {field:'branchName',title:'机构名称',width:'140px',align:'left'},
            {field:'supplierCode',title:'供应商编号',width:'120px',align:'left'},
            {field:'supplierName',title:'供应商名称',width:'140px',align:'left'},
            {field:'payableAmount',title:'应付金额',width:'100px',align:'right',
            	formatter:function(value,row,index){
            		if(!value)row.payableAmount = 0;
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
            	}
            },
            {field:'payedAmount',title:'已付金额',width:'100px',align:'right',
            	formatter:function(value,row,index){
            		if(!value)row.payedAmount = 0;
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
            	}
            },
            {field:'discountAmount',title:'优惠金额',width:'100px',align:'right',
            	formatter:function(value,row,index){
            		if(!value)row.discountAmount = 0;
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
            	}
            },
            {field:'unpayAmount',title:'未付金额',width:'100px',align:'right',
            	formatter:function(value,row,index){
            		if(!value)row.unpayAmount = 0;
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
            	}
            },
            {field:'actualAmount',title:'实付金额',width:'100px',align:'right',
            	formatter:function(value,row,index){
            		if(!value)row.actualAmount = 0;
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
            	}
            },
            {field:'remark',title:'备注',width:'180px'}
        ]],
        onLoadSuccess:function(data){
            gridHandel.setDatagridHeader("center");
            updateFooter();
        },
    });
}

//合计
function updateFooter(){
    var fields = {amount:0};
    var argWhere = {}
    gridHandel.updateFooter(fields,argWhere);
}

//返回列表页面
function back(){
	location.href = contextPath+"/settle/supplierSettle/getSettleList";
}

//新增供应商对账单
function addSupAcoSetForm(){
	toAddTab("新增供应商结算",contextPath + "/settle/supplierSettle/settleAdd");
}

//导出
function exportOrder(){
	var formId = $("#formId").val();
	window.location.href = contextPath + '/settle/supplierSettle/exportSheet?page=SupplierSettle&sheetNo='+formId;
}