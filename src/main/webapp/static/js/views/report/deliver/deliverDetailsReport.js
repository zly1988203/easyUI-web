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
                   
                   {field: 'formNo', title: '单据编号', width: 200, align: 'left',},   
                   {field: 'branchCode', title: '发货机构编码', width: 100, align: 'left',},
                   {field: 'branchName', title: '发货机构名称', width: 200, align: 'left',},
                   {field: 'branchCode', title: '要货机构编码', width: 100, align: 'left',},
                   {field: 'branchName', title: '要货机构名称', width: 200, align: 'left',},
                   {field: 'formNo', title: '引用单号', width: 200, align: 'left',},  
                   {field: 'skuCode', title: '货号', width:120, align: 'right'},
                   {field: 'skuName', title: '商品名称', width:120, align: 'right'},
                   {field: 'barCode', title: '条码', width:120, align: 'right'},
                   {field: 'categoryCode', title: '类别编号', width:120, align: 'right'},
                   {field: 'categoryName', title: '类别名称', width:120, align: 'right'},
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
                   {field: 'realNum', title: '箱数', width:120, align: 'right',
                   	formatter:function(value,row,index){
                           if(row.isFooter){
                               return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                           }
                           return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
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
                   {field: 'unit', title: '制单人', width:120, align: 'right'},
        ]],
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
			updateFooter();
		}
    });
}
//合计
function updateFooter(){
    var fields = {realNum:0,amount:0,taxAmount:0, };
    var argWhere = {name:'isGift',value:0}
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
function exportData(){
	var length = $("#purReportDetail").datagrid('getData').total;
	if(length == 0){
		$.messager.alert('提示',"没有数据");
		return;
	}
	if(length>10000){
		$.messager.alert("当次导出数据不可超过1万条，现已超过，请重新调整导出范围！");
		return;
	}
	$("#queryForm").attr("action",contextPath+'/report/purchase/exportData');
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
	});
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
};