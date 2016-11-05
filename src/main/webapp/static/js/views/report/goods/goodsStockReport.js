/**
 * Created by wxl on 2016/08/11.
 */
var pageSize = 50;
$(function(){
    //初始化列表
    initProductInquireGrid();
});

var gridHandel = new GridClass();
function initProductInquireGrid() {
    $("#productInquire").datagrid({
    	method: 'post',
    	align:'center',
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        showFooter:true,
        fitColumns:true,    //每列占满
        pageSize : pageSize,
        height:'100%',
        columns: [[
            {field: 'branchCode', title: '店铺编号', width: 100, align: 'left'},
            {field: 'branch', title: '店铺名称', width: 150, align: 'left'},
            {field: 'skuCode', title: '货号', width: 150, align: 'left'},
            {field: 'skuName', title: '商品名称', width: 180, align: 'left'},
            {field: 'barCode', title: '条码', width: 150, align: 'left'},
            {field: 'memoryCode', title: '助记码', width: 100, align: 'left'},
            {field: 'unit', title: '单位', width: 80, align: 'center'},
            {field: 'spec', title: '规格', width: 80, align: 'center'},
            {field: 'actual', title: '库存', width: 80, align: 'right',formatter : function(value){
    			return getTwoDecimalB(value);
    		}},
    		{field: 'numberCase', title: '箱数', width: 80, align: 'right',formatter : function(value){
    			return getTwoDecimalB(value);
    		}},
    	   {field: 'costPrice', title: '成本价', width: 80, align: 'right',formatter : function(value){
    		   return getTwoDecimalB(value);
     		}},
    		{field: 'costAmount', title: '库存金额', width: 100, align: 'right',formatter : function(value){
    			return getTwoDecimalB(value);
    		}},
    		{field: 'salePrice', title: '售价', width: 80, align: 'right',formatter : function(value){
    			return getTwoDecimalB(value);
      		}},
    		
            {field: 'saleAmount', title: '售价金额', width: 100, align: 'right',formatter : function(value){
            	return getTwoDecimalB(value);
    		}},
            {field: 'pricingType', title: '计价方式', width: 80, align: 'center',
            	formatter : function(pricingType){
        			if(pricingType){
        				return pricingType.value;
        			}
        			return null;
        		}
            },
            {field: 'status', title: '商品状态', width: 80, align: 'center',
            	formatter : function(status){
        			if(status){
        				return status.value;
        			}
        			return null;
        		}
            },
            {field: 'categoryCode', title: '类别编号', width: 100, align: 'left'},
            {field: 'category', title: '类别', width: 100, align: 'left'}
        ]],
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
		},
        toolBar : "#tg_tb",
		enableHeaderClickMenu: false,
	    enableHeaderContextMenu: false,
	    enableRowContextMenu: false
    });
}

/**
 * 机构列表下拉选
 */
function searchBranch (){
	new publicAgencyService(function(data){
		$("#branchCode").val(data.branchCode);
		$("#branchNameOrCode").val("["+data.branchCode+"]"+data.branchName);
	},"","");
}

/**
 * 类别选择
 */
function searchCategory(){
	new publicCategoryService(function(data){
		$("#categoryCode").val(data.categoryCode);
		$("#categoryNameCode").val("["+data.categoryCode+"]"+data.categoryName);
	});
}


/**
 * 导出
 */
function exportExcel(){
	var isValid = $("#queryForm").form('validate');
	if(!isValid){
		return;
	}
	
	var length = $("#productInquire").datagrid('getData').total;
	if(length == 0){
		$.messager.alert("提示","无数据可导");
		return;
	}
	if(length>10000){
		$.messager.alert('提示',"当次导出数据不可超过1万条，现已超过，请重新调整导出范围！");
		return;
	}
	
	$("#queryForm").attr("action",contextPath+"/stock/report/exportList");
	$("#queryForm").submit(); 
	
}

//查询
function query(){
	var formData = $("#queryForm").serializeObject();
	var branchNameOrCode = $("#branchNameOrCode").val();
	if(branchNameOrCode && branchNameOrCode.indexOf("[")>=0 && branchNameOrCode.indexOf("]")>=0){
		formData.branchNameOrCode = null;
	}
	var categoryNameOrCode = $("#categoryNameCode").val();
	if(categoryNameOrCode && categoryNameOrCode.indexOf("[")>=0 && categoryNameOrCode.indexOf("]")>=0){
		formData.categoryNameOrCode = null;
	}
	
	$("#productInquire").datagrid("options").queryParams = formData;
	$("#productInquire").datagrid("options").method = "post";
	$("#productInquire").datagrid("options").url = contextPath+'/stock/report/getList';
	$("#productInquire").datagrid("load");
}

//手动输入机构清空branchCode
function cleanBranchCode(){
	var branchNameOrCode = $("#branchNameOrCode").val();
	
	//如果修改名称
	if(!branchNameOrCode || (branchNameOrCode && branchNameOrCode.indexOf("[")<0 && branchNameOrCode.indexOf("]")<0)){
		$("#branchCode").val('');
	}
	
}

//手动输入机构清空categoryCode
function cleanCategoryCode(){
	var categoryNameOrCode = $("#categoryNameCode").val();
	
	//如果修改名称
	if(!categoryNameOrCode || (categoryNameOrCode && categoryNameOrCode.indexOf("[")<0 && categoryNameOrCode.indexOf("]")<0)){
		$("#categoryCode").val('');
	}
}

//重置
function reset(){
	$("#queryForm")[0].reset();
}
