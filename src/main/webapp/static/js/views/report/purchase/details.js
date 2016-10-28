/**
 * Created by wxl on 2016/08/17.
 */
$(function() {
	// 开始和结束时间
	$("#txtStartDate").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
	$("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
	initPurReportDetailGrid();
});
var gridHandel = new GridClass();
/**
 * 单据类型
 * @param newV
 * @param oldV
 */
function onChangeFormType(newV,oldV){
	$("#formType").combobox("setValue",newV);
}

var gridHandel = new GridClass();
/**
 * 初始化表格
 * @param queryType
 */
function initPurReportDetailGrid(queryType) {
	gridHandel.setGridName("purReportDetail");
    $("#purReportDetail").datagrid({
        //title:'普通表单-用键盘操作',
        method: 'post',
        align: 'center',
        //url: "",
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect: false,  //单选  false多选
        rownumbers: true,    //序号
        pagination: true,    //分页
        //fitColumns:true,    //占满
        showFooter:true,
        pageSize : 20,
        showFooter:true,
        height:'100%',
        columns: [[
            {field: 'branchCode', title: '机构编码', width: 100, align: 'left',
            	formatter : function(value, row,index) {
                    var str = value;
                    if(row.isFooter){
                        str ='<div class="ub ub-pc ufw-b">合计</div> '
                    }
                    return str;
                },
            },
            {field: 'branchName', title: '机构名称', width: 200, align: 'left',},
            {field: 'supplierCode', title: '供应商编号', width: 100, align: 'left'},
            {field: 'supplierName', title: '供应商名称', width: 100, align: 'left'},
            {field: 'formNo', title: '单据编号', width: 120, align: 'right',
            	formatter:function(value,row,index){
            		if(row.formId){
            			return "<a style='text-decoration: underline;' href='"+ contextPath +"/form/purchase/orderEdit?formId="+ row.formId +"'>" + value + "</a>"
            		}else{
            			return "";
            		}
                }
            },
            {field: 'skuName', title: '商品名称', width:120, align: 'right'},
            {field: 'skuCode', title: '货号', width:120, align: 'right'},
            {field: 'barCode', title: '条码', width:120, align: 'right'},
            {field: 'categoryCode', title: '类别编号', width:120, align: 'right'},
            {field: 'categoryName', title: '类别名称', width:120, align: 'right'},
            {field: 'brandName', title: '品牌', width:120, align: 'right'},
            {field: 'spec', title: '规格', width:120, align: 'right'},
            {field: 'unit', title: '单位', width:120, align: 'right'},
            {field: 'price', title: '单价', width:120, align: 'right',
            	formatter : function(value, row, index) {
            		if(row.isFooter){
                        return "";
                    }
					var str=0.00;
					if(value){
						str= parseFloat(value).toFixed(2);
					}
    				return str;
    			}
            },
            {field: 'realNum', title: '数量', width:120, align: 'right',
            	formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'amount', title: '金额', width:120, align: 'right',
            	formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'tax', title: '税率', width:120, align: 'right',
            	formatter : function(value, row, index) {
            		if(row.isFooter){
                        return "";
                    }
					var str=0.00;
					if(value){
						str= parseFloat(value).toFixed(2);
					}
    				return str;
    			}
            },
            {field: 'taxAmount', title: '税额', width:120, align: 'right',
            	formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'validTime', title: '审核日期', width:120, align: 'right',
            	formatter : function(value, rowData, rowIndex) {
            		return formatDate(value,'yyyy-MM-dd hh:mm');
            	}},
            {field: 'goodsCreateDate', title: '生产日期', width:120, align: 'right',
            	formatter : function(value, rowData, rowIndex) {
            		return formatDate(value,'yyyy-MM-dd hh:mm');
            	}}
        ]],
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
			updateFooter();
		}
    });
}
//合计
function updateFooter(){
    var fields = {realNum:0,amount:0,taxAmount:0 };
    var argWhere = {name:'formNo',value:''}
    gridHandel.updateFooter(fields,argWhere);
}
/**
 * 查询
 */
function purchaseDetailCx(){
	var formData = $("#queryForm").serializeObject();
	$("#purReportDetail").datagrid("options").queryParams = formData;
	$("#purReportDetail").datagrid("options").method = "post";
	$("#purReportDetail").datagrid("options").url =  contextPath+"/report/purchase/getPurReportDetail";
	$("#purReportDetail").datagrid("load");
}
/**
 * 导出
 */
function exportDetails(){
	var length = $("#purReportDetail").datagrid('getData').total;
	if(length == 0){
		$.messager.alert('提示',"没有数据");
		return;
	}
	if(length>10000){
		$.messager.alert("当次导出数据不可超过1万条，现已超过，请重新调整导出范围！");
		return;
	}
	$("#queryForm").attr("action",contextPath+'/report/purchase/exportDetails');
	$("#queryForm").submit();	
}
/**
 * 机构列表下拉选
 */
function searchBranch (){
	new publicAgencyService(function(data){
		$("#branchId").val(data.branchesId);
		$("#branchName").val("["+data.branchCode+"]"+data.branchName);
	},"","");
}
/**
 * 供应商公共组件
 */
function searchSupplier(){
	new publicSupplierService(function(data){
		$("#supplierId").val(data.id);
		$("#supplierName").val(data.supplierName);
	},"purchase");
}
/**
 * 商品类别
 */
function searchCategory(){
	new publicCategoryService(function(data){
		$("#categoryId").val(data.goodsCategoryId);
		$("#categoryName").val(data.categoryName);

	});
}
/**
 * 重置
 */
var resetForm = function(){
	$("#queryForm").form('clear');
	$("#txtStartDate").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
	$("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
	$("#branchId").val(sessionBranchId);
	$("#branchName").val(sessionBranchName);
	onChangeFormType("");
	
};